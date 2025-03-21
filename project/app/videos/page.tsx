'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Youtube } from 'lucide-react';

export default function VideosPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">YouTube Video Analysis</h1>
      
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <Youtube className="h-10 w-10 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Enter YouTube URL</h2>
          <p className="text-muted-foreground text-center mb-4">
            Paste the video URL you want to analyze
          </p>
          <div className="flex w-full max-w-lg gap-2">
            <Input placeholder="https://youtube.com/watch?v=..." />
            <Button>
              Analyze
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Video Processing Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Transcript Extraction</h3>
            <p className="text-sm text-muted-foreground">
              Get complete, searchable transcripts with speaker detection
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Key Point Timeline</h3>
            <p className="text-sm text-muted-foreground">
              Navigate to important moments with AI-identified timestamps
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Content Summary</h3>
            <p className="text-sm text-muted-foreground">
              Get quick overviews and main takeaways from videos
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}