"use client";

import { motion } from "framer-motion";
import { ChevronDown, MapPin, Phone, Mail, Linkedin, Github } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { label: "Anos de Experiência", value: "8+", suffix: "" },
    { label: "Projetos Entregues", value: "50+", suffix: "" },
    { label: "Linhas de Código", value: "100k+", suffix: "" },
    { label: "Automações", value: "30+", suffix: "" },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f1a] to-[#0a0a0a] opacity-80" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-5xl mx-auto w-full"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 mb-8 text-green-400 text-xs font-mono"
        >
          <div className="w-1.5 h-1.5 bg-green-500" />
          <span>[AVAILABLE]</span>
        </motion.div>

        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88] to-[#b794f6] rounded-full blur-xl opacity-30" />
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-[#00ff88] overflow-hidden bg-gray-900 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
              <Image
                src="/profile.jpg"
                alt="Guilherme Abiti"
                width={192}
                height={192}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-glow-green"
        >
          Guilherme Abiti
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-4 text-gray-300"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-semibold">AI Engineer</span>
          <span className="hidden sm:inline text-gray-600">|</span>
          <span className="text-xl sm:text-2xl md:text-3xl font-semibold">Python Developer</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          Computer Vision & Automation Specialist
        </motion.p>

        {/* Contact info chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm sm:text-base"
        >
          <a href="https://linkedin.com/in/guilherme-abiti" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-[#00ff88] transition-colors">
            <Linkedin className="w-4 h-4" />
            <span className="hidden sm:inline">guilherme-abiti</span>
          </a>
          <a href="https://github.com/Guilherme-Vilas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-[#00ff88] transition-colors">
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">Guilherme-Vilas</span>
          </a>
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">Ponta Grossa, PR</span>
          </div>
          <a href="mailto:guilhermeabiti.v@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-[#b794f6] transition-colors">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Email</span>
          </a>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 backdrop-blur-sm"
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#00ff88] mb-1 font-mono">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
            className="px-8 py-4 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] transition-all duration-300"
          >
            Ver Projetos
          </motion.button>
          <motion.a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent border-2 border-[#b794f6] text-[#b794f6] font-semibold rounded-lg hover:bg-[#b794f6]/10 transition-all duration-300"
          >
            Minha Trajetória
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-[#00ff88]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
