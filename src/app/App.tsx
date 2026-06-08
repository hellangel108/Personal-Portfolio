import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Code2,
  Sparkles,
  Award,
  Users,
  TrendingUp,
  ExternalLink,
  Terminal,
  Layers,
  Database,
  Cloud,
  Zap,
  ChevronDown
} from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Impact from './components/Impact';
import Skills from './components/Skills';
import Contact from './components/Contact';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Code2 className="w-6 h-6" />
            <span className="font-semibold">Alex Chen</span>
          </motion.div>

          <div className="hidden md:flex gap-8">
            {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex gap-4">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Projects Section */}
      <Projects />

      {/* Impact Metrics */}
      <Impact />

      {/* Experience Timeline */}
      <Experience />

      {/* Skills */}
      <Skills />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted-foreground">
          <p>© 2026 Alex Chen. Crafted with React, TypeScript & Motion</p>
        </div>
      </footer>
    </div>
  );
}
