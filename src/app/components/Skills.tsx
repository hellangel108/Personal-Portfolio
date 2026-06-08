import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Terminal, Layers, Database, Cloud, Code2, Users } from 'lucide-react';

const skillCategories = [
  {
    icon: Terminal,
    title: "Languages & Frameworks",
    skills: ["TypeScript", "Python", "Go", "Rust", "React", "Node.js", "FastAPI", "Next.js"]
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    skills: ["AWS", "GCP", "Kubernetes", "Terraform", "Docker", "CI/CD", "GitOps", "Monitoring"]
  },
  {
    icon: Database,
    title: "Data & Backend",
    skills: ["PostgreSQL", "Redis", "MongoDB", "Kafka", "GraphQL", "REST APIs", "gRPC", "Microservices"]
  },
  {
    icon: Layers,
    title: "Architecture & Design",
    skills: ["System Design", "DDD", "Event-Driven", "Distributed Systems", "API Design", "Scalability"]
  },
  {
    icon: Users,
    title: "Leadership & Process",
    skills: ["Team Building", "Mentoring", "Agile", "Technical Strategy", "Hiring", "Stakeholder Management"]
  },
  {
    icon: Code2,
    title: "Tools & Practices",
    skills: ["Git", "VS Code", "Testing", "Code Review", "Documentation", "Performance Optimization"]
  }
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4" style={{ fontSize: '3rem', lineHeight: '1.2', fontWeight: 600 }}>
            Technical Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built over years of hands-on experience across the full stack.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3>{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                      className="px-3 py-1 bg-accent/50 text-accent-foreground rounded-md text-sm"
                      whileHover={{ scale: 1.05, backgroundColor: "var(--accent)" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
