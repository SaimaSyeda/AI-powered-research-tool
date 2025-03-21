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
import { FileText, Youtube, ArrowRight, ChevronRight } from 'lucide-react';
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
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <section className="container flex-1 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.h1 
            variants={fadeIn}
            className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl mb-6"
          >
            Research Smarter, <span className="text-primary">Not Harder</span>
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="max-w-[700px] text-xl text-muted-foreground mb-8"
          >
            Harness the power of AI to process academic papers and YouTube videos for deeper insights.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24"
        >
          {/* Paper Analysis Card */}
          <motion.div 
            variants={fadeIn}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className="flex flex-col items-center text-center p-8 rounded-xl border bg-card shadow-lg transition-all"
          >
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ duration: 0.2 }}
              className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6"
            >
              <FileText className="h-8 w-8 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">Academic Paper Analysis</h2>
            <p className="text-muted-foreground mb-8">
              Upload your research papers for instant summaries, key point extraction, 
              and citation generation. Powered by advanced AI to help you research smarter.
            </p>
            <Link href="/papers" className="mt-auto">
              <Button size="lg" className="font-medium group">
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
          </motion.div>

          {/* Video Processing Card */}
          <motion.div 
            variants={fadeIn}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className="flex flex-col items-center text-center p-8 rounded-xl border bg-card shadow-lg transition-all"
          >
            <motion.div 
              whileHover={{ scale: 1.2, rotate: -5 }}
              transition={{ duration: 0.2 }}
              className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6"
            >
              <Youtube className="h-8 w-8 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">YouTube Video Insights</h2>
            <p className="text-muted-foreground mb-8">
              Turn YouTube videos into searchable content with AI-powered transcript extraction,
              key point identification, and smart timestamp linking.
            </p>
            <Link href="/videos" className="mt-auto">
              <Button size="lg" variant="secondary" className="font-medium group">
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
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section - Redesigned */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t bg-gradient-to-br from-muted/30 via-muted/50 to-muted/30 py-20"
      >
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-16"
          >
            How It <span className="text-primary">Works</span>
          </motion.h2>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
            {/* Step Cards */}
            {[
              {
                title: "Upload or Link",
                description: "Submit your papers or YouTube videos with just a few clicks",
                icon: <FileText className="h-6 w-6" />
              },
              {
                title: "AI Processing",
                description: "Our advanced algorithms analyze and extract key insights",
                icon: <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="7" />
                          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                        </svg>
                      </motion.div>
              },
              {
                title: "Get Results",
                description: "Access interactive summaries, insights, and searchable content",
                icon: <ArrowRight className="h-6 w-6" />
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full lg:w-1/3 relative"
              >
                <div className="absolute -top-5 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold z-10">
                  {index + 1}
                </div>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 mt-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-center">{step.description}</p>
                
                {index < 2 && (
                  <motion.div 
                    className="hidden lg:flex absolute -right-3 top-1/2 transform -translate-y-1/2 z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ChevronRight className="h-6 w-6 text-primary" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center mt-16"
          >
            <Button size="lg" className="font-medium">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}