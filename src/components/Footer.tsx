"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";
import GitHubStatus from "./GitHubStatus";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/guilherme-abiti",
      color: "hover:text-blue-400",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/Guilherme-Vilas",
      color: "hover:text-[#00ff88]",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:guilhermeabiti.v@gmail.com",
      color: "hover:text-[#b794f6]",
    },
  ];

  return (
    <footer className="border-t border-gray-800 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
            <p>© {currentYear} Guilherme Abiti. Todos os direitos reservados.</p>
            <p className="text-xs mt-2 text-gray-500">
              Ponta Grossa, PR | +55 (11) 96215-3536
            </p>
            <div className="mt-3">
              <GitHubStatus />
            </div>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-gray-400 transition-colors ${link.color}`}
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
