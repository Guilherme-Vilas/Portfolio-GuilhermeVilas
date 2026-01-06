"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

interface CommandOutput {
  type: "output" | "error";
  content: string;
}

const commands = {
  help: () => ({
    type: "output" as const,
    content: `Available commands:
  help       - Show this help message
  contact    - Display contact information
  projects   - Scroll to projects section
  about      - Scroll to about section
  skills     - Scroll to skills section
  experience - Scroll to experience section
  clear      - Clear terminal
  whoami     - Show user information
  ls         - List main projects
  pwd        - Show current location
  date       - Show current date and time
  
Type any command above to execute.`,
  }),
  
  contact: () => ({
    type: "output" as const,
    content: `CONTACT INFORMATION
================================

EMAIL:     guilhermeabiti.v@gmail.com
LINKEDIN:  linkedin.com/in/guilherme-abiti
GITHUB:    github.com/Guilherme-Vilas
PHONE:     +55 (11) 96215-3536
LOCATION:  Ponta Grossa, PR
STATUS:    Available for Remote Work

For project inquiries, send an email.`,
  }),
  
  projects: () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
    return {
      type: "output" as const,
      content: "[OK] Navigating to projects section...",
    };
  },
  
  about: () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
    return {
      type: "output" as const,
      content: "[OK] Navigating to about section...",
    };
  },
  
  skills: () => {
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: "smooth" });
    }
    return {
      type: "output" as const,
      content: "[OK] Navigating to skills section...",
    };
  },
  
  experience: () => {
    const experienceSection = document.getElementById("experience");
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: "smooth" });
    }
    return {
      type: "output" as const,
      content: "[OK] Navigating to experience section...",
    };
  },
  
  clear: () => {
    return {
      type: "output" as const,
      content: "CLEAR", // Special command to clear terminal
    };
  },
  
  whoami: () => ({
    type: "output" as const,
    content: `guilherme-abiti

USER:      guilherme-abiti
ROLE:      AI Engineer & Python Developer
SPEC:      Computer Vision & Automation

CURRENT:
  - Lead AI Engineer @ IMPERIUM.IA
  - CTO @ ARION GUARDIAN

STACK:     Python | OpenCV | YOLO | OpenAI | LangChain | FastAPI | n8n`,
  }),
  
  ls: () => ({
    type: "output" as const,
    content: `total 4
drwxr-xr-x  SafetyVision/      WMS System (Computer Vision + RFID)
drwxr-xr-x  arion-guardian/    Edge AI for Agribusiness
drwxr-xr-x  imperium-ia/       AI Agents (Commercial Screening)
drwxr-xr-x  portfolio/         This website

Type 'projects' for more details.`,
  }),
  
  pwd: () => ({
    type: "output" as const,
    content: `/home/guilherme-abiti/portfolio`,
  }),
  
  date: () => ({
    type: "output" as const,
    content: new Date().toLocaleString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Sao_Paulo",
    }),
  }),
};

export default function Terminal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [history, setHistory] = useState<Array<{ command: string; output: CommandOutput }>>([
    {
      command: "whoami",
      output: commands.whoami(),
    },
  ]);
  const [input, setInput] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("guest@portfolio:~$ ");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInView]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (!trimmedCmd) {
      return;
    }

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    const commandHandler = commands[trimmedCmd as keyof typeof commands];
    
    if (commandHandler) {
      const output = commandHandler();
      setHistory((prev) => [...prev, { command: cmd, output }]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: {
            type: "error",
            content: `Comando não encontrado: ${cmd}\nDigite 'help' para ver os comandos disponíveis.`,
          },
        },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    executeCommand(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <section
      id="terminal"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto w-full"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center text-glow-green"
        >
          Terminal
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center text-gray-500 mb-8 text-xs sm:text-sm font-mono"
        >
          Interactive console - Type <span className="text-[#00ff88]">help</span> for available commands
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-2xl"
        >
          {/* Terminal header */}
          <div className="bg-gray-950 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 text-xs sm:text-sm ml-3 font-mono">terminal.sh</span>
            </div>
            <div className="text-gray-500 text-xs font-mono">pop-os@portfolio</div>
          </div>

          {/* Terminal content */}
          <div
            ref={terminalRef}
            className="font-mono text-sm sm:text-base h-[500px] overflow-y-auto p-4 bg-black/50"
            style={{ scrollBehavior: "smooth" }}
          >
            {history.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="text-[#00ff88] mb-1">
                  {currentPrompt}
                  <span className="text-white">{item.command}</span>
                </div>
                <div
                  className={`whitespace-pre-wrap ${
                    item.output.type === "error"
                      ? "text-red-400"
                      : "text-gray-300"
                  } ml-2`}
                >
                  {item.output.content}
                </div>
              </div>
            ))}
            
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-[#00ff88]">{currentPrompt}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent text-white outline-none ml-1 caret-[#00ff88]"
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
              <span className="cursor-blink bg-[#00ff88] text-[#00ff88] ml-1">▊</span>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

