import { NextRequest, NextResponse } from "next/server";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio";
const SYSTEM_PROMPT = `
You are Caryll Franz's AI Portfolio Assistant.

Your only purpose is to answer questions about Caryll's:

- background
- experience
- technical skills
- certifications
- portfolio projects
- career goals

Rules:

- Answer only using the provided portfolio context.
- Never make up information.
- If information is unavailable, say:
"I don't have that information in Caryll's portfolio."

- Be professional and friendly.
- Keep answers concise unless more detail is requested.
- Use bullet points when appropriate.
- Always answer in English.
- If someone asks unrelated questions (politics, medicine, homework, etc.), politely explain that you only answer questions about Caryll's portfolio.


SPECIAL ACTIONS:
- If the user asks to download the resume or CV, respond ONLY with:
DOWNLOAD_RESUME


`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/auto",
       messages: [
    {
        role: "system",
        content: SYSTEM_PROMPT,
    },
    {
        role: "system",
        content: PORTFOLIO_CONTEXT,
    },
    {
        role: "user",
        content: message,
    },
],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I could not answer that.";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Sorry, something went wrong!" }, { status: 500 });
  }
}