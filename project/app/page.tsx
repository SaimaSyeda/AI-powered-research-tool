/*'use client';

import { Button } from '@/components/ui/button';
import { FileText, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <section className="container flex-1">
        <div className="grid lg:grid-cols-2 gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Process Academic Papers <br className="hidden sm:inline" />
              with AI Precision
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Upload your research papers for instant summaries, key point extraction, 
              and citation generation. Powered by advanced AI to help you research smarter.
            </p>
            <Link href="/papers">
              <Button size="lg" className="mt-4">
                <FileText className="mr-2 h-5 w-5" />
                Analyze Papers
              </Button>
            </Link>
          </div>
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Extract Insights from <br className="hidden sm:inline" />
              YouTube Videos
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Turn YouTube videos into searchable content with AI-powered transcript extraction,
              key point identification, and smart timestamp linking.
            </p>
            <Link href="/videos">
              <Button size="lg" variant="secondary" className="mt-4">
                <Youtube className="mr-2 h-5 w-5" />
                Process Videos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/40">
        <div className="container py-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            How ResearchAI Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload or Link</h3>
              <p className="text-muted-foreground">
                Submit your research paper or YouTube video URL for processing
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Processing</h3>
              <p className="text-muted-foreground">
                Our AI analyzes the content and extracts key information
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-muted-foreground">
                Receive organized insights, summaries, and interactive content
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}*/

'use client';

import { Button } from '@/components/ui/button';
import { FileText, Youtube, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

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
                className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Sparkles className="h-10 w-10 text-primary" />
              </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Research Smarter, Not Harder
            </h1>
            
            <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              Harness the power of AI to process academic papers and YouTube videos for deeper insights
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Paper Analysis Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
            >
              <motion.div
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="bg-primary/10 p-4 rounded-xl flex items-center justify-center w-14 h-14 mb-6"
              >
                <FileText className="h-7 w-7 text-primary" />
              </motion.div>
              
              <h2 className="text-2xl font-bold mb-4">Academic Paper Analysis</h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Upload your research papers for instant summaries, key point extraction, 
                and citation generation. Powered by advanced AI to help you research smarter.
              </p>
              
              <div className="mt-auto">
                <Link href="/papers">
                  <Button size="lg" className="group font-medium bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                    <FileText className="mr-2 h-5 w-5" />
                    Analyze Papers
                    <motion.span 
                      initial={{ opacity: 0, x: -5 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-2 opacity-0 group-hover:opacity-100"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Video Processing Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
            >
              <motion.div
                whileHover={{ rotate: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-primary/10 p-4 rounded-xl flex items-center justify-center w-14 h-14 mb-6"
              >
                <Youtube className="h-7 w-7 text-primary" />
              </motion.div>
              
              <h2 className="text-2xl font-bold mb-4">YouTube Video Insights</h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Turn YouTube videos into searchable content with AI-powered transcript extraction,
                key point identification, and smart timestamp linking.
              </p>
              
              <div className="mt-auto">
                <Link href="/videos">
                  <Button size="lg" variant="secondary" className="group font-medium">
                    <Youtube className="mr-2 h-5 w-5" />
                    Process Videos
                    <motion.span 
                      initial={{ opacity: 0, x: -5 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-2 opacity-0 group-hover:opacity-100"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-4"
            >
              How It <span className="text-primary">Works</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Our AI-powered platform streamlines your research process, helping you extract key insights in minutes instead of hours
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Upload or Link",
                description: "Submit your papers or YouTube videos with just a few clicks",
                icon: FileText,
                color: "from-blue-400 to-blue-600"
              },
              {
                title: "AI Processing",
                description: "Our advanced AI models analyze and extract key insights",
                icon: motion.div,
                iconContent: <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="7" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                </motion.div>,
                color: "from-purple-400 to-purple-600"
              },
              {
                title: "Get Results",
                description: "Access interactive summaries, insights, and searchable content",
                icon: ArrowRight,
                color: "from-green-400 to-green-600"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`bg-gradient-to-r ${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  {item.iconContent ? item.iconContent : <item.icon className="h-6 w-6 text-white" />}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Powerful <span className="text-primary">Features</span></h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to accelerate your research and content analysis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FileText, text: "Supports PDF & Word documents" },
              { icon: Youtube, text: "Automatic video transcript extraction" },
              { icon: ArrowRight, text: "Interactive timestamp navigation" },
              { icon: Sparkles, text: "AI-powered comprehensive analysis" },
              { icon: ChevronRight, text: "Extract citations and references" },
              { icon: FileText, text: "Structured insights & key findings" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ 
                  scale: 1.03,
                  backgroundColor: "rgba(79, 70, 229, 0.1)"
                }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-primary/10 p-2 rounded-md">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-gray-700 dark:text-gray-200">{feature.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center mt-12"
          >
            <Button size="lg" className="font-medium bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}