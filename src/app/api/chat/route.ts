import { NextRequest, NextResponse } from "next/server";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio";

const SYSTEM_PROMPT = `
You are the AI assistant for Caryll Franz M. Cariño's engineering portfolio.

Caryll is a Software Engineer focused on AI Engineering, Data Engineering,
Machine Learning, Generative AI, automation, and data-driven systems.

His primary strengths are:
- Building AI and machine learning systems
- Generative AI, LLM, and RAG applications
- Data pipelines and engineering workflows
- Automation and process optimization
- Machine learning and predictive modeling

Data Science and Data Analytics are supporting strengths, including EDA,
data analysis, visualization, and predictive modeling.

Frontend, web, and mobile development are supporting skills and should not be
used to describe Caryll's primary career identity.

You answer questions about Caryll's:
- Background and career
- Work experience
- Technical skills
- AI and ML experience
- Data engineering and analytics experience
- Automation experience
- Projects
- Education and certifications
- Career direction

RULES:

- Use the PORTFOLIO_CONTEXT as the source of truth.
- Answer only using information provided in the portfolio context.
- Never invent projects, employers, responsibilities, metrics, dates,
  technologies, certifications, or achievements.
- Do not assume experience that is not explicitly stated in the context.
- If the information is not available, say:
  "I don't have that information in Caryll's portfolio."
- Keep answers professional, concise, and natural.
- Use bullet points when useful.
- Always answer in English.
- When describing Caryll's experience, be accurate about his actual role
  and contribution.
- Do not exaggerate his seniority or expertise.
- If asked about his career direction, emphasize AI Engineering,
  Data Engineering, Machine Learning, Generative AI, and automation.
- Do not describe Caryll primarily as a frontend developer, web developer,
  full-stack developer, or data scientist.
- For unrelated questions such as politics, medicine, homework, or general
  coding assistance, explain that you only answer questions about Caryll's
  portfolio.

PROJECT QUESTIONS:

- When asked about a project, use the project information in the
  PORTFOLIO_CONTEXT.
- Mention the project's purpose, technologies, architecture, and Caryll's
  contribution only when those details are available.
- If asked to compare projects, compare only projects present in the context.
- If asked about GitHub or demos, only provide links that exist in the context.

EXPERIENCE QUESTIONS:

- When asked about employment, use the experience information in the context.
- Distinguish between Caryll's Software Analyst and Associate Software
  Engineer roles at Accenture.
- Do not merge responsibilities between different roles.
- Do not claim that training experience was production experience unless the
  context explicitly says so.

SPECIAL ACTIONS:

- If the user asks to download, get, or access Caryll's resume or CV,
  respond ONLY with:

DOWNLOAD_RESUME
`;

const MAX_MESSAGE_LENGTH = 1000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const message = body?.message;

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { reply: "Please send a question." },
        { status: 400 },
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { reply: "That question is too long. Try a shorter one." },
        { status: 400 },
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is not configured");
      return NextResponse.json(
        { reply: "The assistant isn't available right now." },
        { status: 503 },
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/auto",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "system", content: PORTFOLIO_CONTEXT },
            { role: "user", content: message },
          ],
        }),
      },
    );

    if (!response.ok) {
      console.error("OpenRouter request failed:", response.status);
      return NextResponse.json(
        { reply: "The assistant is unavailable right now. Please try again." },
        { status: 502 },
      );
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ?? "Sorry, I could not answer that.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { reply: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
