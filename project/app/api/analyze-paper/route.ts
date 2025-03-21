import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Extract text based on file type
    let text: string;
    if (file.name.endsWith('.pdf')) {
      const pdfData = await pdfParse(buffer);
      text = pdfData.text;
    } else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-002" });

    // Process with Gemini API with structured sections
    const prompt = `Analyze this research paper and provide a comprehensive analysis with the following clearly marked sections using markdown headers:

    # Summary
    A concise summary (3-5 sentences) covering the main purpose, methods, and key findings of the paper.

    # Key Findings
    The most important discoveries or contributions of the paper (bullet points).

    # Methodology
    A brief overview of the methods, study design, or approach used by the researchers.

    # Conclusions
    The main conclusions and implications of the research.

    # Citations and References
    List of the most important citations and references mentioned in the paper.

    Make each section clearly formatted with proper markdown. Ensure content is substantive and focuses on the most significant aspects of the paper.
    
    Paper content: ${text.slice(0, 30000)}`; // Limit token size

    const result = await model.generateContent([{ text: prompt }]); 
    const response = await result.response;
    const analysis = response.text();

    // Parse sections (this will be enhanced by the frontend component)
    const sections = {
      summary: '',
      findings: '',
      methodology: '',
      conclusions: '',
      citations: ''
    };

    return NextResponse.json({
      analysis,
      wordCount: text.split(/\s+/).length,
      charCount: text.length,
      sections
    });

  } catch (error: unknown) {
    console.error('Error processing paper:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}