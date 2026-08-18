'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Award } from 'lucide-react';

const projects = [
  {
    title: "StreamFlow",
    category: "Real-time Infrastructure",
    description: "Built a distributed event streaming platform processing 50M+ events/day with sub-100ms latency. Powers real-time features for 2M+ daily active users.",
    tech: ["Go", "Kafka", "Redis", "Kubernetes"],
    impact: "99.99% uptime, 70% cost reduction",
    featured: true,
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    title: "DevOps Autopilot",
    category: "Developer Tools",
    description: "Led development of an AI-powered deployment pipeline that reduced deployment time from 45min to 3min. Saved 1000+ engineering hours annually.",
    tech: ["Python", "TypeScript", "AWS", "Terraform"],
    impact: "15x faster deployments, 95% success rate",
    featured: true,
    gradient: "from-emerald-500/20 to-cyan-500/20"
  },
  {
    title: "CollabSpace",
    category: "B2B SaaS",
    description: "Architected collaborative workspace platform from 0→1. Grew to $5M ARR with 500+ enterprise customers. Led team of 12 engineers through Series B.",
    tech: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    impact: "$5M ARR, 500+ customers",
    featured: true,
    gradient: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "ML Insights Engine",
    category: "Machine Learning",
    description: "Built recommendation engine that increased user engagement by 40%. Processed 1B+ data points daily using custom ML pipeline.",
    tech: ["Python", "TensorFlow", "Apache Spark", "GCP"],
    impact: "40% engagement lift, 25% revenue increase",
    featured: false,
    gradient: "from-pink-500/20 to-purple-500/20"
  }
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="mb-4" style={{ fontSize: '3rem', lineHeight: '1.2', fontWeight: 600 }}>
            Featured Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A selection of projects that demonstrate my approach to solving complex technical challenges at scale.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative p-8 rounded-2xl border border-border bg-card overflow-hidden group ${
                project.featured ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">{project.category}</div>
                    <h3 className="text-2xl mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  {project.featured && (
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Featured
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-accent text-accent-foreground rounded-md text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-sm font-medium text-primary">
                    {project.impact}
                  </div>
                  <motion.div
                    className="flex gap-3"
                    animate={hoveredIndex === index ? { x: 0 } : { x: -10 }}
                  >
                    <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
