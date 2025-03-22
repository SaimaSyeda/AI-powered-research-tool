'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, PlayCircle, FileText, Clock, BookOpen, LucideIcon, CheckCircle, Film, PenTool, Cpu } from 'lucide-react';
import YoutubeForm from '@/components/videos/youtube-form';
import VideoResults from '@/components/videos/video-results';

// Define stage type and workflow stages
type ProcessingStage = string | null;

export default function VideosPage() {
  const [processingStage, setProcessingStage] = useState<ProcessingStage>(null);
  const [results, setResults] = useState<any>(null);

  // Handle processing updates from the YoutubeForm
  const handleProcessingUpdate = (stage: ProcessingStage) => {
    setProcessingStage(stage);
  };

  // Handle results from the YoutubeForm
  const handleResults = (data: any) => {
    setResults(data);
  };

  // Video analysis workflow stages
  const workflowStages = [
    {
      id: 'fetching',
      icon: Youtube,
      title: 'Fetching Video',
      description: 'Retrieving video metadata and preparing for analysis',
    },
    {
      id: 'transcribing',
      icon: PenTool,
      title: 'Transcribing',
      description: 'Converting speech to text with timestamps and speaker detection',
    },
    {
      id: 'analyzing',
      icon: Cpu,
      title: 'AI Analysis',
      description: 'Applying advanced NLP to identify key points and topics',
    },
    {
      id: 'complete',
      icon: CheckCircle,
      title: 'Analysis Complete',
      description: 'Your video insights are ready to explore',
    },
  ];

  // Feature cards with hover effects
  interface FeatureCard {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
  }

  const features: FeatureCard[] = [
    {
      icon: FileText,
      title: 'Full Transcript',
      description: 'Get searchable transcripts with speaker identification and accurate timestamps',
      color: 'from-purple-500 to-purple-700',
    },
    {
      icon: Clock,
      title: 'Timeline Markers',
      description: 'Jump to key moments with AI-identified section markers and important timestamps',
      color: 'from-purple-600 to-purple-800',
    },
    {
      icon: BookOpen,
      title: 'Smart Summaries',
      description: 'Quickly grasp main topics and takeaways without watching the entire video',
      color: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-5">
              <motion.div
                className="relative inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Film className="h-10 w-10 text-primary" />
                <motion.div 
                  className="absolute -inset-1 rounded-xl border-2 border-primary/20"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2, repeatDelay: 0.5 }}
                />
              </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-700">
              YouTube Video Analyzer
            </h1>
            
            <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              Transform YouTube videos into structured insights with advanced AI analysis
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            {/* Circular Feature Cards - Different from papers page */}
            <div className="md:w-1/3 grid grid-cols-1 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                    <div className={`relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${feature.color}`}>
                      <feature.icon className="h-6 w-6 text-white" />
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-white dark:bg-gray-900 mix-blend-overlay"
                        animate={{ 
                          opacity: [0, 0.3, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: idx * 0.5
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                  <motion.div 
                    className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Main content */}
            <div className="w-full md:w-2/3 grid md:grid-cols-2 gap-6 items-start">
              {/* YouTube Form */}
              <div className="w-full">
                <YoutubeForm 
                  onProcessingUpdate={handleProcessingUpdate}
                  onResultsReceived={handleResults} 
                />
              </div>

              {/* Circular Workflow Animation */}
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-6 text-center">Analysis Workflow</h3>
                
                <div className="relative flex flex-col items-center">
                  {/* Circular progress indicator */}
                  <div className="relative w-48 h-48 mb-6">
                    {/* Base circle */}
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700" />

                    {/* Neon Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-primary/50"
                      style={{
                        boxShadow: '0 0 20px rgba(79, 70, 229, 0.6), 0 0 40px rgba(79, 70, 229, 0.4), 0 0 60px rgba(79, 70, 229, 0.2)',
                      }}
                      animate={{
                        opacity: [0.8, 1, 0.8],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Active stage marker */}
                    <motion.div 
                      className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 rounded-full bg-primary flex items-center justify-center text-white shadow-lg"
                      animate={{ 
                        scale: processingStage ? [1, 1.2, 1] : 1
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: processingStage ? Infinity : 0
                      }}
                    >
                      <PlayCircle className="h-5 w-5" />
                    </motion.div>
                    
                    {/* Stage indicators */}
                    {workflowStages.map((stage, idx) => {
                      const angle = (idx * (2 * Math.PI / workflowStages.length)) - Math.PI/2;
                      const x = Math.cos(angle) * 70;
                      const y = Math.sin(angle) * 70;
                      const isActive = processingStage === stage.id;
                      
                      return (
                        <motion.div
                          key={stage.id}
                          className={`absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 rounded-full ${
                            isActive 
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'
                          } flex items-center justify-center`}
                          style={{ 
                            transform: `translate(${x}px, ${y}px)`,
                            zIndex: isActive ? 10 : 1 
                          }}
                          animate={{ 
                            scale: isActive ? [1, 1.1, 1] : 1,
                            boxShadow: isActive 
                              ? ['0 0 0 rgba(79, 70, 229, 0)', '0 0 20px rgba(79, 70, 229, 0.5)', '0 0 0 rgba(79, 70, 229, 0)'] 
                              : '0 0 0 rgba(79, 70, 229, 0)' 
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: isActive ? Infinity : 0  
                          }}
                        >
                          <stage.icon className="h-5 w-5" />
                          
                          {/* Connecting line */}
                          <motion.div 
                            className={`absolute top-1/2 left-1/2 h-0.5 origin-left ${
                              isActive ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                            style={{ 
                              width: '70px',
                              rotate: `${angle * (180/Math.PI)}deg`,
                              transformOrigin: '0 0',
                            }}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* Current stage description */}
                  <AnimatePresence mode="wait">
                    {processingStage ? (
                      workflowStages.map(stage => 
                        stage.id === processingStage && (
                          <motion.div 
                            key={stage.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center"
                          >
                            <h4 className="font-medium text-lg text-gray-900 dark:text-white">{stage.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{stage.description}</p>
                          </motion.div>
                        )
                      )
                    ) : (
                      <motion.div 
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-center"
                      >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Enter a YouTube URL to see the analysis in action
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results section - Moved here from YoutubeForm */}
      <AnimatePresence>
        {results && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <VideoResults results={results} />
          </motion.section>
        )}
      </AnimatePresence>

      {/* How it works section - with a unique twist from papers page */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our AI-powered platform extracts valuable insights from YouTube videos, saving you time and helping you get more from video content
            </p>
          </div>

          {/* Horizontal timeline - different from papers page vertical cards */}
          <div className="relative mt-20 pt-10">
            {/* Connecting line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 rounded-full" />
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Input YouTube URL",
                  description: "Simply paste the URL of any YouTube video you want to analyze",
                  icon: Youtube,
                  step: 1
                },
                {
                  title: "AI Processing",
                  description: "Our advanced AI extracts audio, generates transcripts, and analyzes content",
                  icon: Cpu,
                  step: 2
                },
                {
                  title: "Review Insights",
                  description: "Navigate through structured results with timestamps, summaries, and key points",
                  icon: BookOpen,
                  step: 3
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Step number */}
                  <motion.div 
                    className="absolute -top-16 left-1/2 -ml-6 w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-primary flex items-center justify-center text-xl font-bold text-primary shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.step}
                  </motion.div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md h-full hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-700 to-purple-500 flex items-center justify-center mb-4 mx-auto">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}