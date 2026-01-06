"use client";

import { useState, useEffect } from "react";
import { Github, Clock, Code } from "lucide-react";

interface GitHubCommit {
  repo: string;
  message: string;
  timeAgo: string;
  url: string;
}

export default function GitHubStatus() {
  const [lastCommit, setLastCommit] = useState<GitHubCommit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubStatus = async () => {
      try {
        const response = await fetch("/api/github-status");
        
        if (!response.ok) {
          throw new Error("Erro ao buscar status do GitHub");
        }

        const data = await response.json();
        
        if (data.commit) {
          setLastCommit(data.commit);
        }
      } catch (err) {
        setError("Não foi possível carregar o status");
        console.error("Erro ao buscar status do GitHub:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubStatus();
    
    // Atualiza a cada 5 minutos
    const interval = setInterval(fetchGitHubStatus, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (timeAgo: string) => {
    return timeAgo;
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-500 text-xs">
        <Clock className="w-3 h-3 animate-pulse" />
        <span>Carregando status...</span>
      </div>
    );
  }

  if (error || !lastCommit) {
    return (
      <div className="flex items-center gap-2 text-gray-600 text-xs">
        <Github className="w-3 h-3" />
        <span>GitHub: Ativo</span>
      </div>
    );
  }

  return (
    <a
      href={lastCommit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-gray-400 hover:text-[#00ff88] transition-colors text-xs group"
    >
      <div className="relative">
        <Github className="w-3 h-3" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
      <span className="hidden sm:inline">
        Último commit: <span className="text-[#00ff88] font-mono">{formatTimeAgo(lastCommit.timeAgo)}</span> no repo{" "}
        <span className="text-[#b794f6] font-semibold">'{lastCommit.repo}'</span>
      </span>
      <span className="sm:hidden">
        <span className="text-[#00ff88]">{formatTimeAgo(lastCommit.timeAgo)}</span> • {lastCommit.repo}
      </span>
    </a>
  );
}

