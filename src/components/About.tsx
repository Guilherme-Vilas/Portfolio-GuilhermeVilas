"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-glow-green"
        >
          Sobre
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6 text-lg sm:text-xl text-gray-300 leading-relaxed"
        >
          <div className="bg-gray-900/50 border-l-4 border-[#00ff88] pl-6 py-4 rounded-r-lg">
            <p className="font-semibold text-white mb-2">Resumo Profissional</p>
            <p>
              Desenvolvedor com visão de negócio (ex-COO) e foco total em{" "}
              <span className="text-[#00ff88] font-semibold">Inteligência Artificial Aplicada</span>.
              Especialista em transformar operações manuais em{" "}
              <span className="text-[#b794f6] font-semibold">ecossistemas autônomos</span> utilizando Python,
              Visão Computacional e LLMs.
            </p>
          </div>

          <p>
            Experiência prática na arquitetura e desenvolvimento de <strong>MVPs complexos</strong> para
            Mineração e Agronegócio, integrando software e hardware (Edge Computing/IoT). Busco desafios
            técnicos onde possa escrever código que impacte diretamente o <span className="text-[#00ff88]">P&L da empresa</span>,
            eliminando ineficiências através da tecnologia.
          </p>

          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <div className="bg-gray-900/30 border border-gray-800 rounded p-4 font-mono">
              <h4 className="text-[#00ff88] font-semibold mb-2 text-sm">
                &gt; FOCUS
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Transformar operação em código inteligente. Sistemas críticos com fail-safe obrigatório.
              </p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded p-4 font-mono">
              <h4 className="text-[#b794f6] font-semibold mb-2 text-sm">
                &gt; MINDSET
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Engenharia robusta + Agressividade comercial. Código só é bom se vender ou economizar dinheiro.
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-400 pt-4 border-t border-gray-800 font-mono text-xs">
            # "Dados são o novo petróleo. A diferença está em como você processa e converte em valor."
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
