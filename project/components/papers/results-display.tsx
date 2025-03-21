'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Download, Copy, Check, ChevronDown, ChevronUp, FileText, Brain, ChartBar, BookOpen, BookMarked } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisResults {
  analysis: string;
  wordCount?: number;
  charCount?: number;
  sections?: {
    summary: string;
    findings: string;
    methodology: string;
    conclusions: string;
    citations: string;
  };
}

interface ResultsDisplayProps {
  results: AnalysisResults | null;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'findings' | 'methodology' | 'conclusions' | 'citations'>('summary');
  const [copied, setCopied] = useState(false);
  const [sections, setSections] = useState<Record<string, string>>({});

  useEffect(() => {
    if (results && results.analysis) {
      // Parse markdown sections
      const parseSections = () => {
        const sectionMap: Record<string, string> = {};
        
        // Try to extract sections based on markdown headers
        const summaryMatch = results.analysis.match(/#+\s*Summary([\s\S]*?)(?=#+\s*|$)/i);
        const findingsMatch = results.analysis.match(/#+\s*(?:Key\s*)?Findings([\s\S]*?)(?=#+\s*|$)/i);
        const methodologyMatch = results.analysis.match(/#+\s*Methodology([\s\S]*?)(?=#+\s*|$)/i);
        const conclusionsMatch = results.analysis.match(/#+\s*(?:Main\s*)?Conclusions([\s\S]*?)(?=#+\s*|$)/i);
        const citationsMatch = results.analysis.match(/#+\s*(?:Important\s*)?Citations(?:\s*and\s*References)?([\s\S]*?)(?=#+\s*|$)/i);
        
        sectionMap.summary = summaryMatch ? summaryMatch[1].trim() : '';
        sectionMap.findings = findingsMatch ? findingsMatch[1].trim() : '';
        sectionMap.methodology = methodologyMatch ? methodologyMatch[1].trim() : '';
        sectionMap.conclusions = conclusionsMatch ? conclusionsMatch[1].trim() : '';
        sectionMap.citations = citationsMatch ? citationsMatch[1].trim() : '';
        
        // If parsing failed, use the entire content as summary
        if (!sectionMap.summary && !sectionMap.findings && !sectionMap.methodology) {
          sectionMap.summary = results.analysis;
        }
        
        return sectionMap;
      };
      
      setSections(parseSections());
    }
  }, [results]);

  if (!results) return null;

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
    a.download = 'analysis-results.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const tabItems = [
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'findings', label: 'Key Findings', icon: Brain },
    { id: 'methodology', label: 'Methodology', icon: ChartBar },
    { id: 'conclusions', label: 'Conclusions', icon: BookOpen },
    { id: 'citations', label: 'Citations', icon: BookMarked }
  ] as const;

  // Function to get the icon component for the current active tab
  const getActiveTabIcon = () => {
    const activeTabItem = tabItems.find(tab => tab.id === activeTab);
    return activeTabItem ? activeTabItem.icon : FileText;
  };
  
  // Get the current active icon component
  const ActiveIcon = getActiveTabIcon();

  const renderMarkdown = (content: string) => {
    // Simple markdown renderer for demonstration
    // In a real app, you'd use a proper markdown renderer
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
          <FileText className="h-8 w-8 text-primary" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Analysis Results</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our AI has analyzed your research paper and structured the key insights for easy review
        </p>
      </div>

      <Card className="w-full shadow-xl border-t-4 border-t-primary overflow-hidden bg-white dark:bg-gray-900">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Paper Analysis</CardTitle>
              <div className="flex flex-wrap gap-2 mt-3">
                {results.wordCount && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium"
                  >
                    {results.wordCount.toLocaleString()} words
                  </motion.div>
                )}
                {results.charCount && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium"
                  >
                    {results.charCount.toLocaleString()} characters
                  </motion.div>
                )}
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
                {copied ? 'Copied!' : 'Copy'}
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
            </div>
          </div>
        </CardHeader>
        
        <div className="bg-gray-100 dark:bg-gray-800 overflow-x-auto">
          <div className="flex space-x-1 px-4 py-1 container max-w-6xl mx-auto">
            {tabItems.map((tab) => (
              <motion.button
                key={tab.id}
                className={`px-4 py-3 rounded-t-lg transition-all flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-white dark:bg-gray-900 text-primary font-medium shadow-sm' 
                    : 'hover:bg-white/50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
        
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="prose max-w-none dark:prose-invert"
            >
              {sections[activeTab] ? (
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: renderMarkdown(sections[activeTab]) 
                  }} 
                  className="p-8 bg-white dark:bg-gray-900 rounded-lg"
                />
              ) : (
                <div className="p-16 text-gray-500 italic text-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-4"
                  >
                    <ActiveIcon className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                  </motion.div>
                  <p>No {activeTab} content was identified in this paper</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

    </motion.div>
  );
}