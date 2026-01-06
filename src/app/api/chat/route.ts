import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const { messages, systemContext } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY não configurada. Por favor, configure a variável de ambiente." },
        { status: 500 }
      );
    }

    // Inicializa o cliente OpenAI apenas quando necessário
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Prepara as mensagens para a API da OpenAI
    const openaiMessages = [
      {
        role: "system" as const,
        content: systemContext || "Você é um assistente útil.",
      },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    ];

    // Chama a API da OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Usando gpt-4o-mini para ser mais econômico, mas mantendo boa qualidade
      messages: openaiMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = completion.choices[0]?.message?.content || "Desculpe, não consegui gerar uma resposta.";

    return NextResponse.json({
      message: assistantMessage,
    });
  } catch (error: unknown) {
    console.error("Erro na API de chat:", error);
    
    let errorMessage = "Ocorreu um erro ao processar sua mensagem.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

