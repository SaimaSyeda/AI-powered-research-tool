'use client';

import { useState } from 'react';
import UploadForm from '@/components/papers/upload-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Brain, ChartBar, CheckCircle, Sparkles } from 'lucide-react';
import ResultsDisplay from '@/components/papers/results-display';


export default function PapersPage() {
  const [processingStage, setProcessingStage] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null); // Add this state

  // Listen for processing events from the UploadForm
  const handleProcessingUpdate = (stage: string | null) => {
    setProcessingStage(stage);
  };

  // Add this function to handle results
  const handleResults = (data: any) => {
    setResults(data);
  };

  // Analysis workflow stages with icons and descriptions
  const workflowStages = [
    {
      id: 'extracting',
      icon: FileText,
      title: 'Extracting Content',
      description: 'Converting document to text and preparing for analysis',
    },
    {
      id: 'analyzing',
      icon: Brain,
      title: 'AI Analysis',
      description: 'Advanced AI models examine the research methodology and findings',
    },
    {
      id: 'structuring',
      icon: ChartBar,
      title: 'Structuring Insights',
      description: 'Organizing results into clear, actionable sections',
    },
    {
      id: 'complete',
      icon: CheckCircle,
      title: 'Analysis Complete',
      description: 'Your research paper analysis is ready to explore',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section - Background blobs removed */}
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
                className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Sparkles className="h-10 w-10 text-primary" />
              </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Research Paper Analyzer
            </h1>
            
            <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              Transform complex research papers into clear, structured insights with our advanced AI analysis tool
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            {/* Features */}
            <div className="flex flex-col gap-4 md:w-1/3">
              {[
                { icon: FileText, text: "Supports PDF & Word documents" },
                { icon: Brain, text: "AI-powered comprehensive analysis" },
                { icon: ChartBar, text: "Structured insights & key findings" }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                >
                  <div className="bg-primary/10 p-2 rounded-md">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">{feature.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Main content */}
            <div className="w-full md:w-2/3 grid md:grid-cols-2 gap-6 items-start">
              {/* Upload Section */}
              <div className="w-full">
                <UploadForm onProcessingUpdate={handleProcessingUpdate}
                            onResultsReceived={handleResults} />
              </div>

              {/* Workflow Animation */}
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-6 text-center">Analysis Workflow</h3>
                
                <div className="space-y-6 relative">
                  {/* Vertical line connecting stages */}
                  <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200 dark:bg-gray-700" />
                  
                  {workflowStages.map((stage, index) => {
                    const isActive = processingStage === stage.id || 
                                    (processingStage === 'processing' && index === 1);
                    return (
                      <motion.div
                        key={stage.id}
                        className={`flex items-start gap-4 relative ${
                          isActive ? 'opacity-100' : 'opacity-60'
                        }`}
                        animate={{ x: isActive ? [0, 5, 0] : 0 }}
                        transition={{ 
                          duration: 0.5, 
                          repeat: isActive ? Infinity : 0,
                          repeatType: 'reverse',
                        }}
                      >
                        <motion.div 
                          className={`relative z-10 p-2 rounded-full ${
                            isActive 
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'
                          }`}
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
                        </motion.div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{stage.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{stage.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Animation for when nothing is processing */}
                {!processingStage && (
                  <motion.div 
                    className="mt-8 p-4 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-center"
                    animate={{ 
                      backgroundColor: ['rgba(79, 70, 229, 0.03)', 'rgba(79, 70, 229, 0.07)', 'rgba(79, 70, 229, 0.03)'] 
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Upload a research paper to see the analysis in action
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results section - add this */}
      <AnimatePresence>
        {results && (
          <ResultsDisplay results={results} />
        )}
      </AnimatePresence>

      {/* Additional information section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our AI-powered platform streamlines the research paper review process, helping you extract key insights in minutes instead of hours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Upload Your Paper",
                description: "Simply drag and drop your PDF or Word document into the upload area",
                icon: FileText,
                color: "from-blue-400 to-blue-600"
              },
              {
                title: "AI Analysis",
                description: "Our advanced AI models analyze the content, methodology, and findings",
                icon: Brain,
                color: "from-purple-400 to-purple-600"
              },
              {
                title: "Structured Results",
                description: "Receive a comprehensive breakdown organized into clear, actionable sections",
                icon: ChartBar,
                color: "from-green-400 to-green-600"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`bg-gradient-to-r ${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}