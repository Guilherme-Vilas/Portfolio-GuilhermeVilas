"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SYSTEM_CONTEXT = `Você é Guilherme Abiti, AI Engineer & Python Developer especializado em Computer Vision & Automation.

PERFIL PROFISSIONAL:
- Lead AI Engineer & Founder na IMPERIUM.IA (Set 2024 - Presente)
- CTO & Desenvolvedor de Produto na ARION GUARDIAN (Jan 2025 - Presente)
- Ex-Engenheiro de Automação de Processos no GRUPO ORIZEN (Mar 2024 - Out 2024)
- Ex-Desenvolvedor Full Stack no COLÉGIO ARAUTOS DO EVANGELHO (Jan 2017 - Fev 2022)

ESPECIALIDADES:
- Python (Avançado), FastAPI, OpenCV, YOLO
- OpenAI API (GPT-4), LangChain, n8n
- Edge Computing, IoT, Visão Computacional
- Automação de processos, integração de sistemas

PROJETOS PRINCIPAIS:
1. Sistema WMS com Visão Computacional & RFID para mineração
2. Arion Guardian - Monitoramento 24/7 de pecuária com Edge AI
3. Agentes de IA para triagem comercial e atendimento ao cliente

MENTALIDADE:
- Transformar operação em código inteligente
- Engenharia robusta + Agressividade comercial
- "Código só é bom se vender ou economizar dinheiro"
- Foco em sistemas críticos com fail-safe obrigatório

Responda de forma direta, técnica e profissional, como um CTO/co-fundador falaria. Seja conciso mas completo. Use português brasileiro.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Olá! Sou o assistente virtual do Guilherme. Posso te ajudar com informações sobre projetos, experiência, tecnologias ou qualquer dúvida sobre o trabalho dele. O que você gostaria de saber?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          systemContext: SYSTEM_CONTEXT,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao obter resposta");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "Desculpe, não consegui processar sua mensagem.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.6)] transition-all duration-300 flex items-center justify-center group"
        aria-label="Abrir chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-black" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-black" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#b794f6] rounded-full border-2 border-[#0a0a0a] animate-pulse" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-96 h-[600px] max-h-[80vh] bg-gray-900 border border-gray-800 rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00ff88]/10 to-[#b794f6]/10 border-b border-gray-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Guilherme AI</h3>
                  <p className="text-xs text-gray-400">Assistente Virtual</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-[#b794f6]"
                        : "bg-gradient-to-r from-[#00ff88] to-[#00cc6a]"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-black" />
                    ) : (
                      <Bot className="w-4 h-4 text-black" />
                    )}
                  </div>
                  <div
                    className={`flex-1 rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-[#b794f6]/20 text-white"
                        : "bg-gray-800 text-gray-100 border border-gray-700"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00ff88] to-[#00cc6a] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-800 p-4 bg-gray-900">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  disabled={isLoading}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#00ff88] transition-colors disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black rounded-lg hover:shadow-[0_0_15px_rgba(0,255,136,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center font-mono">
                [GPT-4]
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

