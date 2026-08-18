'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { TrendingUp, Users, Zap, Award } from 'lucide-react';

const metrics = [
  {
    icon: Users,
    value: "10M+",
    label: "Users Impacted",
    description: "Products serving millions globally"
  },
  {
    icon: TrendingUp,
    value: "$50M+",
    label: "Revenue Generated",
    description: "Direct contribution to ARR growth"
  },
  {
    icon: Zap,
    value: "99.99%",
    label: "System Uptime",
    description: "Across mission-critical services"
  },
  {
    icon: Award,
    value: "50+",
    label: "Engineers Mentored",
    description: "Growing the next generation of leaders"
  }
];

export default function Impact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-32 bg-primary text-primary-foreground" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4" style={{ fontSize: '3rem', lineHeight: '1.2', fontWeight: 600 }}>
            Impact by the Numbers
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Measuring success through the value delivered to users, teams, and businesses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  className="w-16 h-16 bg-primary-foreground/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-8 h-8" />
                </motion.div>
                <motion.div
                  className="text-5xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                >
                  {metric.value}
                </motion.div>
                <div className="font-semibold mb-2">{metric.label}</div>
                <div className="text-sm opacity-80">{metric.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
