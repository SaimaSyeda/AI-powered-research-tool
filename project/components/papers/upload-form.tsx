'use client';

import { useState, useRef, useEffect } from 'react';
import { FileText, Upload, FileUp, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadFormProps {
  onProcessingUpdate?: (stage: string | null) => void;
  onResultsReceived?: (data: any) => void;
}

export default function UploadForm({ onProcessingUpdate, onResultsReceived }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [processingStage, setProcessingStage] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update parent component when processing stage changes
  useEffect(() => {
    if (onProcessingUpdate) {
      onProcessingUpdate(processingStage);
    }
  }, [processingStage, onProcessingUpdate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const fileExtension = droppedFile.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension === 'pdf' || fileExtension === 'docx' || fileExtension === 'doc') {
        setFile(droppedFile);
        setError(null);
      } else {
        setError('Please upload a PDF or Word document (.pdf, .docx, .doc)');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setProcessing(true);
    setError(null);
    setResults(null); 
    
    // Show processing stages with timing for better UX
    const processStage = async (stage: string, duration: number) => {
      setProcessingStage(stage);
      return new Promise(resolve => setTimeout(resolve, duration));
    };

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Visual feedback for extraction process
      await processStage('extracting', 1500);
      
      // Start the actual API call
      const fetchPromise = fetch('/api/analyze-paper', {
        method: 'POST',
        body: formData,
      });
      
      // Show analyzing stage
      await processStage('analyzing', 2000);
      
      // Show structuring stage - overlapping with actual processing
      await processStage('structuring', 1500);
      
      // Wait for API response
      const response = await fetchPromise;
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed.');
      }

      // Show complete stage
      await processStage('complete', 1000);
      setResults(data);

      // Pass results to parent
      if (onResultsReceived) {
        onResultsReceived(data);
      }
    } catch (error: any) {
      console.error('Error analyzing paper:', error);
      setError(error.message);
    } finally {
      setProcessing(false);
      setProcessingStage(null);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResults(null);
    setError(null);
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
          <div 
            className={`
              border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer
              ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-700'}
              ${file ? 'bg-gray-50 dark:bg-gray-800/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <AnimatePresence mode="wait">
              {file ? (
                <motion.div 
                  key="file-selected"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="bg-primary/10 p-4 rounded-full">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                  >
                    Change File
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  key="upload-prompt"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center text-center space-y-4"
                >
                  <motion.div 
                    animate={{ y: [0, -8, 0] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-primary/10 p-4 rounded-full"
                  >
                    <FileUp className="h-8 w-8 text-primary" />
                  </motion.div>
                  <div>
                    <p className="font-medium text-lg">Drop your research paper here</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Support for PDF, DOCX, and DOC files
                    </p>
                  </div>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
              accept=".pdf,.docx,.doc"
            />
          </div>
          
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
            disabled={!file || processing} 
            className="w-full h-12 text-lg relative overflow-hidden group transition-all"
          >
            {processing ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                {processingStage === 'extracting' && 'Extracting Content...'}
                {processingStage === 'analyzing' && 'Analyzing Paper...'}
                {processingStage === 'structuring' && 'Structuring Results...'}
                {processingStage === 'complete' && 'Finalizing...'}
                {!processingStage && 'Processing...'}
              </span>
            ) : (
              <>
                <span>Analyze Paper</span>
                <motion.span 
                  className="absolute inset-0 bg-white/20 translate-x-[-100%]"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "linear",
                    repeatDelay: 0.5
                  }}
                />
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}