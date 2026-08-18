'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const experiences = [
  {
    role: "VP of Engineering",
    company: "TechCorp (Acquired by BigTech)",
    period: "2022 - Present",
    description: "Leading engineering organization through hypergrowth. Scaled team from 15 to 60 engineers. Architected platform serving 2M+ daily active users.",
    achievements: [
      "Led technical due diligence resulting in $200M acquisition",
      "Reduced infrastructure costs by 60% through architectural improvements",
      "Established engineering culture that achieved 95% employee satisfaction"
    ]
  },
  {
    role: "Engineering Manager, Platform",
    company: "ScaleUp Inc",
    period: "2019 - 2022",
    description: "Built and led platform team responsible for core infrastructure, CI/CD, and developer experience.",
    achievements: [
      "Designed microservices architecture supporting 100M+ API calls/day",
      "Reduced deployment time from 2 hours to 10 minutes",
      "Mentored 3 engineers to senior positions, 2 to staff level"
    ]
  },
  {
    role: "Senior Software Engineer",
    company: "StartupX",
    period: "2016 - 2019",
    description: "Early engineer building product from 0→1. Focused on backend systems, APIs, and real-time features.",
    achievements: [
      "Architected real-time collaboration engine (WebSockets, Redis, PostgreSQL)",
      "Contributed to $0→$10M ARR growth as tech lead",
      "Led migration to Kubernetes, improving reliability and reducing costs"
    ]
  },
  {
    role: "Software Engineer",
    company: "ConsultCo",
    period: "2014 - 2016",
    description: "Full-stack development across multiple client projects in fintech and healthcare.",
    achievements: [
      "Built HIPAA-compliant patient management system for healthcare startup",
      "Developed algorithmic trading platform processing $100M+ in daily volume",
      "Led technical workshops and code reviews for junior engineers"
    ]
  }
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="experience" className="py-32 bg-accent/20" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="mb-4" style={{ fontSize: '3rem', lineHeight: '1.2', fontWeight: 600 }}>
            Experience
          </h2>
          <p className="text-xl text-muted-foreground">
            12+ years of building, leading, and shipping products that matter.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative pl-0 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />

                <div className="p-6 md:p-8 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl mb-1">{exp.role}</h3>
                      <div className="text-primary font-medium mb-2">{exp.company}</div>
                    </div>
                    <div className="text-muted-foreground text-sm md:text-base">{exp.period}</div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.15 + i * 0.1 }}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
