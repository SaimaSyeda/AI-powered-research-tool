'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ExternalLink, Download, Copy, Check, Clock, Video, FileText, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface TimestampData {
  time: number;
  duration: number;
  text: string;
}

interface VideoResultsProps {
  results: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    videoId: string;
    thumbnail: string;
    analysis: string;
    timestamps?: TimestampData[];
  } | null;
}

export default function VideoResults({ results }: VideoResultsProps) {
  const [copied, setCopied] = useState(false);
  const [expandedTimestamps, setExpandedTimestamps] = useState(true);

  if (!results) return null;

  // Format seconds to MM:SS format
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(results.analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([results.analysis], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${results.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-analysis.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const renderAnalysis = (content: string) => {
    // Simple markdown-like renderer
    const formatted = content
      .replace(/#{3,6}\s+(.*)/g, '<h4 class="font-semibold text-lg mb-2 mt-4">$1</h4>')
      .replace(/#{1,2}\s+(.*)/g, '<h3 class="font-bold text-xl mb-3 mt-5">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/- (.*)/g, '<li class="ml-4">$1</li>')
      .replace(/\n\n/g, '<br/><br/>');
    
    return formatted;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full mt-16 container max-w-6xl mx-auto px-4"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-4"
        >
          <Video className="h-8 w-8 text-primary" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Video Analysis</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our AI has analyzed this video and extracted key insights and important timestamps
        </p>
      </div>

      <Card className="w-full shadow-xl border-t-4 border-t-primary overflow-hidden bg-white dark:bg-gray-900">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold">{results.title}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-3">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium flex items-center"
                >
                  {results.channelTitle}
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium flex items-center"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(results.publishedAt).toLocaleDateString()}
                </motion.div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleCopy} 
                className="transition-all hover:bg-primary hover:text-white group"
              >
                {copied ? (
                  <Check className="h-4 w-4 mr-2 text-green-500 group-hover:text-white" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                {copied ? 'Copied!' : 'Copy Analysis'}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleDownload} 
                className="transition-all hover:bg-primary hover:text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="default" size="sm" asChild>
                <a href={`https://www.youtube.com/watch?v=${results.videoId}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Watch on YouTube
                </a>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/3 p-6 bg-gray-50 dark:bg-gray-800"
            >
              <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={results.thumbnail} 
                    alt={results.title} 
                    className="w-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="h-16 w-16 text-white" />
                  </div>
                </motion.div>
              </div>
              
              {/* Timestamps section - only show if available */}
              {results.timestamps && results.timestamps.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-6"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      Key Timestamps
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedTimestamps(!expandedTimestamps)}
                      className="h-8 w-8 p-0 rounded-full"
                    >
                      {expandedTimestamps ? (
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="sr-only">Collapse</span>
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                            <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ rotate: 180 }}
                          animate={{ rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="sr-only">Expand</span>
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                            <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </motion.div>
                      )}
                    </Button>
                  </div>
                  
                  <AnimatePresence>
                    {expandedTimestamps && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                          {results.timestamps.map((item, index) => (
                            <motion.a 
                              key={index}
                              href={`https://www.youtube.com/watch?v=${results.videoId}&t=${Math.floor(item.time)}s`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start p-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md hover:bg-primary/5 transition-all duration-200"
                              whileHover={{ x: 3 }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                              <div className="flex-shrink-0 bg-primary/10 text-primary rounded-md px-2 py-1 font-mono font-medium">
                                {formatTime(item.time)}
                              </div>
                              <span className="ml-3 text-sm">{item.text}</span>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-2/3 p-8"
            >
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-xl font-bold">Video Analysis</h3>
              </div>
              
              <div className="prose max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: renderAnalysis(results.analysis) }} />
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}