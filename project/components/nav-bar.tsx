'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import { Brain, FileText, Youtube, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export function NavBar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/papers',
      label: 'Papers',
      icon: FileText
    },
    {
      href: '/videos',
      label: 'Videos',
      icon: Youtube
    },
    {
      href: '/about',
      label: 'How It Works',
      icon: Info
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-8 flex items-center space-x-2 group">
            <motion.div
              className="bg-primary/10 p-2 rounded-lg flex items-center justify-center"
              whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Brain className="h-5 w-5 text-primary" />
            </motion.div>
            <motion.span 
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              ResearchAI
            </motion.span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-primary relative group flex items-center space-x-1",
                  pathname === item.href 
                    ? "text-primary font-semibold" 
                    : "text-foreground/70"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                
                {/* Animated underline effect */}
                {pathname === item.href && (
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Hover underline effect */}
                <motion.div 
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          {/* Mobile navigation indicator */}
          <div className="flex md:hidden">
            {navItems.map((item) => (
              pathname === item.href && (
                <div key={item.href} className="flex items-center px-3 py-1 rounded-full bg-primary/10">
                  <item.icon className="h-3.5 w-3.5 text-primary mr-2" />
                  <span className="text-xs font-medium text-primary">{item.label}</span>
                </div>
              )
            ))}
          </div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </header>
  );
}