'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Mail, Linkedin, Github, Twitter, Calendar } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "alex.chen@email.com",
    href: "mailto:alex.chen@email.com",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/alexchen",
    href: "https://linkedin.com/in/alexchen",
    color: "from-blue-600 to-blue-700"
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@alexchen",
    href: "https://github.com/alexchen",
    color: "from-gray-700 to-gray-900"
  },
  {
    icon: Calendar,
    label: "Schedule Call",
    value: "Book 30min chat",
    href: "https://calendly.com/alexchen",
    color: "from-purple-500 to-pink-500"
  }
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-accent/30 to-background" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4" style={{ fontSize: '3rem', lineHeight: '1.2', fontWeight: 600 }}>
            Let's Build Something Great
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Always open to interesting conversations about technology, leadership, or new opportunities.
            Reach out through any of these channels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-8 bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all"
                whileHover={{ y: -5 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                <div className="relative z-10 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${method.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">{method.label}</div>
                    <div className="font-medium group-hover:text-primary transition-colors">
                      {method.value}
                    </div>
                  </div>
                  <motion.div
                    className="text-muted-foreground"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center p-8 bg-primary text-primary-foreground rounded-2xl"
        >
          <h3 className="text-2xl mb-3">Currently exploring opportunities at</h3>
          <p className="text-lg opacity-90 mb-4">
            Late-stage startups & innovative tech companies looking for senior technical leadership
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-4 py-2 bg-primary-foreground/10 rounded-full">VP Engineering</span>
            <span className="px-4 py-2 bg-primary-foreground/10 rounded-full">CTO</span>
            <span className="px-4 py-2 bg-primary-foreground/10 rounded-full">Technical Advisor</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
