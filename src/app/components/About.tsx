'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Heart, Rocket, Users } from 'lucide-react';

const values = [
  {
    icon: Code2,
    title: "Craft & Quality",
    description: "Obsessed with clean code, elegant architecture, and products that feel delightful to use."
  },
  {
    icon: Users,
    title: "Team First",
    description: "Building great products requires great teams. I lead with empathy and invest in people."
  },
  {
    icon: Rocket,
    title: "Ship Fast",
    description: "Bias for action. Prototype early, iterate quickly, and deliver value continuously."
  },
  {
    icon: Heart,
    title: "User Impact",
    description: "Every line of code should move the needle on something that matters to real people."
  }
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-32 bg-accent/20" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20"
        >
          <h2 className="mb-6" style={{ fontSize: '3rem', lineHeight: '1.2', fontWeight: 600 }}>
            The Journey
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            My path in tech started with a simple Python script that automated my college homework.
            That spark of "I can build anything" never faded.
          </p>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Over the years, I've had the privilege of building real-time collaboration tools used by
            millions, scaling infrastructure to handle billions of requests, and leading teams through
            pivots, launches, and acquisitions.
          </p>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Today, I focus on technical strategy, system design, and helping engineering teams do
            their best work. I believe great software is equal parts art and science.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
