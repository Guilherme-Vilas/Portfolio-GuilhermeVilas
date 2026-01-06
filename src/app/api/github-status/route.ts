import { NextResponse } from "next/server";

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  html_url: string;
  repository?: {
    name: string;
  };
}

// Repositórios para monitorar
const REPOSITORIES = [
  { owner: "Guilherme-Vilas", name: "portfolio-guilherme" },
  { owner: "Guilherme-Vilas", name: "SafetyVision" },
  { owner: "Guilherme-Vilas", name: "arion-guardian" },
  // Adicione mais repositórios aqui conforme necessário
];

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return "há poucos segundos";
  } else if (diffMins < 60) {
    return `há ${diffMins} ${diffMins === 1 ? "minuto" : "minutos"}`;
  } else if (diffHours < 24) {
    return `há ${diffHours} ${diffHours === 1 ? "hora" : "horas"}`;
  } else if (diffDays < 7) {
    return `há ${diffDays} ${diffDays === 1 ? "dia" : "dias"}`;
  } else {
    const diffWeeks = Math.floor(diffDays / 7);
    return `há ${diffWeeks} ${diffWeeks === 1 ? "semana" : "semanas"}`;
  }
}

export async function GET() {
  try {
    const commits: Array<{
      repo: string;
      message: string;
      timeAgo: string;
      url: string;
      date: Date;
    }> = [];

    // Busca commits de todos os repositórios
    for (const repo of REPOSITORIES) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repo.owner}/${repo.name}/commits?per_page=1`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              // Opcional: adicione um token se quiser aumentar o rate limit
              // Authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
            next: { revalidate: 300 }, // Cache por 5 minutos
          }
        );

        if (!response.ok) {
          console.error(`Erro ao buscar commits do repo ${repo.name}: ${response.status}`);
          continue;
        }

        const data: GitHubCommit[] = await response.json();

        if (data.length > 0) {
          const commit = data[0];
          const commitDate = new Date(commit.commit.author.date);
          
          commits.push({
            repo: repo.name,
            message: commit.commit.message.split("\n")[0], // Primeira linha da mensagem
            timeAgo: getTimeAgo(commitDate),
            url: commit.html_url,
            date: commitDate,
          });
        }
      } catch (error) {
        console.error(`Erro ao processar repo ${repo.name}:`, error);
        continue;
      }
    }

    if (commits.length === 0) {
      return NextResponse.json({
        commit: null,
        message: "Nenhum commit encontrado",
      });
    }

    // Ordena por data (mais recente primeiro)
    commits.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Retorna o commit mais recente
    const latestCommit = commits[0];

    return NextResponse.json({
      commit: {
        repo: latestCommit.repo,
        message: latestCommit.message,
        timeAgo: latestCommit.timeAgo,
        url: latestCommit.url,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar status do GitHub:", error);
    return NextResponse.json(
      {
        error: "Erro ao buscar status do GitHub",
        commit: null,
      },
      { status: 500 }
    );
  }
}

