"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "Sistema WMS com Visão Computacional & RFID",
    description: "MVP para controle de almoxarifado em mineração, eliminando fraudes e erros de inventário. Implementação de Reconhecimento Facial (OpenCV) para autenticação de operadores e integração com leitores RFID para rastreamento de ativos em tempo real.",
    tags: ["Python", "OpenCV", "RFID", "Hardware Integration", "Mineração"],
    github: "https://github.com/Guilherme-Vilas",
  },
  {
    title: "Arion Guardian",
    description: "Sistema de monitoramento 24/7 para equinos e gado, focado em detecção de comportamento anômalo. Arquitetura Edge AI para processamento de vídeo em tempo real on-premise, reduzindo latência e dependência de nuvem. Algoritmos de Visão Computacional desenvolvidos especificamente para o setor de agronegócio.",
    tags: ["Python", "Edge AI", "OpenCV", "YOLO", "IoT", "Agronegócio"],
    github: "https://github.com/Guilherme-Vilas",
  },
  {
    title: "Agentes de IA para Triagem Comercial",
    description: "Sistema de Agentes de IA personalizados integrando LLMs (GPT-4) com CRMs via API para automação de triagem comercial e atendimento ao cliente. Scripts Python e workflows n8n para automação end-to-end de processos administrativos.",
    tags: ["Python", "OpenAI", "LangChain", "n8n", "API Integration", "CRM"],
    github: "https://github.com/Guilherme-Vilas",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-glow-green"
        >
          Projetos
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-[#00ff88] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.2)] flex flex-col"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[#00ff88]">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4 flex-grow text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#00ff88] transition-colors text-sm"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#b794f6] transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
