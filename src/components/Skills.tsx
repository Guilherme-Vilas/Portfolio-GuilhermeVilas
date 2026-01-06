"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    category: "Linguagens & Backend",
    skills: [
      { name: "Python", level: "Avançado", color: "from-yellow-500 to-yellow-600" },
      { name: "FastAPI", level: "Avançado", color: "from-teal-400 to-teal-500" },
      { name: "SQL", level: "Intermediário", color: "from-blue-400 to-blue-500" },
      { name: "JavaScript", level: "Básico", color: "from-yellow-400 to-yellow-500" },
    ],
  },
  {
    category: "AI & Computer Vision",
    skills: [
      { name: "OpenCV", level: "Avançado", color: "from-orange-500 to-orange-600" },
      { name: "YOLO", level: "Avançado", color: "from-purple-400 to-purple-500" },
      { name: "OpenAI API", level: "Avançado", color: "from-green-400 to-green-500" },
      { name: "LangChain", level: "Avançado", color: "from-blue-400 to-blue-500" },
    ],
  },
  {
    category: "Automação & Integração",
    skills: [
      { name: "n8n", level: "Avançado", color: "from-red-500 to-red-600" },
      { name: "Webhooks", level: "Avançado", color: "from-indigo-500 to-indigo-600" },
      { name: "REST APIs", level: "Avançado", color: "from-cyan-400 to-cyan-500" },
      { name: "Web Scraping", level: "Intermediário", color: "from-pink-500 to-pink-600" },
    ],
  },
  {
    category: "Infra & Ferramentas",
    skills: [
      { name: "Linux", level: "Avançado", color: "from-orange-400 to-orange-500" },
      { name: "Docker", level: "Intermediário", color: "from-blue-400 to-blue-600" },
      { name: "Git", level: "Avançado", color: "from-gray-400 to-gray-600" },
      { name: "Edge Computing", level: "Intermediário", color: "from-green-500 to-green-600" },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center text-glow-green"
        >
          Stack Tecnológico
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center text-gray-400 mb-12"
        >
          Tecnologias que domino e utilizo diariamente
        </motion.p>

        <div className="space-y-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3 + catIndex * 0.1, duration: 0.8 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-[#b794f6] flex items-center gap-2">
                <span className="text-2xl">▸</span>
                {category.category}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 h-full flex flex-col items-center justify-center hover:border-[#00ff88] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300`} />
                      <span className="text-white font-semibold text-sm sm:text-base relative z-10 mb-2">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-400 relative z-10">
                        {skill.level}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
