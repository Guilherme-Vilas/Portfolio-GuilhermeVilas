"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Briefcase } from "lucide-react";

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  tech: string[];
}

const experiences: Experience[] = [
  {
    company: "IMPERIUM.IA",
    role: "Lead AI Engineer & Founder",
    period: "Set 2024 – Presente",
    location: "Remoto",
    description: [
      "Desenvolvimento e deploy de Agentes de IA personalizados para triagem comercial e atendimento ao cliente",
      "Integração de LLMs (GPT-4) com CRMs via API usando Function Calling",
      "Criação de scripts Python e fluxos no n8n para automação end-to-end de processos administrativos",
      "Atuação técnica consultiva (Fractional CTO) para estruturação de pipelines de dados em clientes de varejo e serviços",
    ],
    tech: ["Python", "OpenAI API", "LangChain", "n8n", "FastAPI", "REST APIs"],
  },
  {
    company: "ARION GUARDIAN",
    role: "CTO & Desenvolvedor de Produto",
    period: "Jan 2025 – Presente",
    location: "Remoto",
    description: [
      "Liderança técnica do desenvolvimento de produto (Hardware + Software) para o setor de agronegócio",
      "Desenvolvimento dos algoritmos core de Visão Computacional e definição da arquitetura de deploy em dispositivos de borda",
      "Gestão do ciclo de vida do desenvolvimento (SDLC) e validação técnica de protótipos",
      "Processamento de vídeo em tempo real usando Edge Computing para reduzir latência",
    ],
    tech: ["Python", "OpenCV", "YOLO", "Edge AI", "IoT", "Computer Vision"],
  },
  {
    company: "GRUPO ORIZEN",
    role: "Engenheiro de Automação de Processos",
    period: "Mar 2024 – Out 2024",
    location: "Presencial/Híbrido",
    description: [
      "Mapeamento de gargalos operacionais e implementação de automações Low-Code e scripts Python",
      "Aumento significativo da produtividade da equipe administrativa através de automação",
      "Integração de sistemas legados através de APIs e Webhooks",
      "Desenvolvimento de soluções customizadas para otimização de processos internos",
    ],
    tech: ["Python", "n8n", "Webhooks", "API Integration", "Web Scraping"],
  },
  {
    company: "COLÉGIO ARAUTOS DO EVANGELHO",
    role: "Desenvolvedor Full Stack",
    period: "Jan 2017 – Fev 2022",
    location: "Presencial",
    description: [
      "Manutenção e desenvolvimento de sistemas internos e portais web com foco em SEO e performance",
      "Gestão de banco de dados e otimização de queries para relatórios gerenciais",
      "Desenvolvimento de soluções educacionais com interface moderna e responsiva",
    ],
    tech: ["JavaScript", "SQL", "Web Development", "Database Optimization"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center text-glow-purple"
        >
          Experiência Profissional
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center text-gray-400 mb-12"
        >
          Trajetória de transformação: de Full Stack a AI Engineer
        </motion.p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00ff88] via-[#b794f6] to-[#00ff88] opacity-30" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.8 }}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#00ff88] rounded-full border-4 border-[#0a0a0a] z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-[#b794f6] transition-all duration-300 hover:shadow-[0_0_30px_rgba(183,148,246,0.2)]">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#00ff88] mb-1">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-[#b794f6] font-semibold mb-2">
                          <Briefcase className="w-4 h-4" />
                          {exp.company}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((desc, descIndex) => (
                        <li key={descIndex} className="text-gray-300 text-sm sm:text-base flex items-start gap-2">
                          <span className="text-[#00ff88] mt-1.5">▸</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-800/50 text-[#b794f6] text-xs rounded-full border border-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
