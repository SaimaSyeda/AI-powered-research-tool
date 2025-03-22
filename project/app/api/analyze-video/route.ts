import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';
import { YoutubeTranscript } from 'youtube-transcript';

function getVideoIdFromUrl(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export async function POST(request: Request) {
  try {
    const { url }: { url: string } = await request.json();
    const videoId = getVideoIdFromUrl(url);
    
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    // Fetch video transcript using youtube-transcript library
    // This uses web scraping behind the scenes, so no API key is needed
    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
    
    if (!transcriptItems || transcriptItems.length === 0) {
      return NextResponse.json({ error: 'No transcript available for this video' }, { status: 404 });
    }
    
    // Convert transcript items to plain text
    const transcript = transcriptItems
      .map(item => item.text)
      .join(' ');
    
    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-002" });
    
    // Process with Gemini API
    const prompt = `Analyze this YouTube video transcript and provide:
      1. A concise summary (3-5 sentences)
      2. Key points with timestamps (estimate timestamps if needed)
      3. Main topics covered
      4. Important quotes or statements
      
      Format the output clearly with markdown headers.
      
      Video ID: ${videoId}
      Transcript: ${transcript}`;
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }]}]
    });
    
    const analysis = result.response.text();
    
    // Fetch video details
    const videoDetailsResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos`,
      {
        params: {
          part: 'snippet,contentDetails',
          id: videoId,
          key: process.env.YOUTUBE_API_KEY
        }
      }
    );
    
    const videoDetails = videoDetailsResponse.data.items[0].snippet;
    
    // Include timestamps from the transcript in the response
    const timestamps = transcriptItems.map(item => ({
      time: item.offset / 1000, // Convert to seconds
      duration: item.duration,
      text: item.text
    }));
    
    return NextResponse.json({
      analysis,
      videoId,
      title: videoDetails.title,
      channelTitle: videoDetails.channelTitle,
      publishedAt: videoDetails.publishedAt,
      thumbnail: videoDetails.thumbnails.high.url,
      timestamps: timestamps // Include timestamp information
    });
  } catch (error: any) {
    console.error('Error processing video:', error);
    
    // Provide more detailed error information
    const errorMessage = error.response 
      ? `API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
      : error.message;
    
    return NextResponse.json({ 
      error: errorMessage,
      details: error.stack
    }, { status: 500 });
  }
}