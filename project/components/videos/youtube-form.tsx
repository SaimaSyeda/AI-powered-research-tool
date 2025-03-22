'use client';

import { useState, useRef } from 'react';
import { Youtube, Loader2, Link, PlayCircle, FastForward, AlignJustify, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription } from '../ui/alert';

interface YoutubeFormProps {
  onProcessingUpdate?: (stage: string | null) => void;
  onResultsReceived?: (data: any) => void;
}

export default function YoutubeForm({ onProcessingUpdate, onResultsReceived }: YoutubeFormProps) {
  const [url, setUrl] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [processingStage, setProcessingStage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isValidUrl, setIsValidUrl] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateYoutubeUrl = (url: string) => {
    const regExp = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return regExp.test(url);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    
    if (inputUrl && !validateYoutubeUrl(inputUrl)) {
      setIsValidUrl(false);
    } else {
      setIsValidUrl(true);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) return;
    
    if (!validateYoutubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setProcessing(true);
    setError(null);
    
    // Show processing stages with timing for better UX
    const processStage = async (stage: string, duration: number) => {
      setProcessingStage(stage);
      if (onProcessingUpdate) {
        onProcessingUpdate(stage);
      }
      return new Promise(resolve => setTimeout(resolve, duration));
    };
    
    try {
      // Visual feedback for extraction process
      await processStage('fetching', 1200);
      
      // Start the actual API call
      const fetchPromise = fetch('/api/analyze-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      // Show analyzing stage
      await processStage('transcribing', 1500);
      
      // Show processing stage
      await processStage('analyzing', 2000);
      
      // Wait for API response
      const response = await fetchPromise;
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze video');
      }
      
      // Show complete stage
      await processStage('complete', 1000);
      
      // Pass results to parent
      if (onResultsReceived) {
        onResultsReceived(data);
      }
    } catch (error: any) {
      console.error('Error analyzing video:', error);
      setError(error.message || 'An error occurred while analyzing the video');
    } finally {
      setProcessing(false);
      setProcessingStage(null);
      if (onProcessingUpdate) {
        onProcessingUpdate(null);
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-white dark:bg-gray-950 rounded-xl shadow-lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            className={`
              border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer
              ${!isValidUrl ? 'border-red-400 dark:border-red-600' : url ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50'}
            `}
            onClick={focusInput}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <AnimatePresence mode="wait">
              {url ? (
                <motion.div 
                  key="url-input-filled"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Youtube className="h-8 w-8 text-primary" />
                  </div>
                  <div className="w-full max-w-lg">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-3 rounded-l-lg overflow-hidden overflow-ellipsis">
                        <p className="font-medium text-sm truncate">{url}</p>
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        className="rounded-l-none h-12"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUrl('');
                          focusInput();
                        }}
                      >
                        Change
                      </Button>
                    </div>
                    <input
                      ref={inputRef}
                      type="text"
                      value={url}
                      onChange={handleUrlChange}
                      className="sr-only"
                      aria-hidden="true"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="url-input-empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center text-center space-y-4"
                >
                  <motion.div 
                    className="bg-primary/10 p-4 rounded-full"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }} 
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3,
                      repeatDelay: 1
                    }}
                  >
                    <PlayCircle className="h-8 w-8 text-primary" />
                  </motion.div>
                  <div>
                    <p className="font-medium text-lg">Enter a YouTube video URL</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      We'll analyze and extract key insights from the video
                    </p>
                  </div>
                  <div className="flex w-full max-w-lg">
                    <div className="flex-1">
                      <input
                        ref={inputRef}
                        type="text"
                        value={url}
                        onChange={handleUrlChange}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={focusInput}
                      className="rounded-l-none"
                      disabled={!url || !isValidUrl}
                    >
                      <Link className="h-4 w-4 mr-2" />
                      Validate
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-400 p-4 rounded-lg flex items-start"
              >
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button 
            type="submit" 
            disabled={!url || processing || !isValidUrl} 
            className="w-full h-12 text-lg relative overflow-hidden group transition-all"
          >
            {processing ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                {processingStage === 'fetching' && 'Fetching Video Data...'}
                {processingStage === 'transcribing' && 'Extracting Transcript...'}
                {processingStage === 'analyzing' && 'Analyzing Content...'}
                {processingStage === 'complete' && 'Finalizing...'}
                {!processingStage && 'Processing...'}
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
                  animate={{ 
                    x: ['-100%', '100%'],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut",
                  }}
                />
                <span className="mr-2">Analyze Video</span>
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    repeatDelay: 0.5
                  }}
                >
                  <FastForward className="h-5 w-5" />
                </motion.span>
              </span>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}