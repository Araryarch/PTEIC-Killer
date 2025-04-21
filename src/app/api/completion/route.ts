import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: groq("deepseek-r1-distill-llama-70b"),
    messages: messages,
    temperature: 1,
    maxTokens: 131072,
    topP: 1,
    system: `
📚 THIS IS YOUR PERSONAL KNOWLEDGE ( JUST UNDERSTAND IT AND DONT EXPLAIN IF USER ISNT ASKING):
pelajari semua ini disini:

📘 1. ENERGY & POWER SYSTEMS
🔌 2. ELECTRONICS & CONTROL SYSTEMS
📡 3. TELECOMMUNICATIONS
🧠 4. COMPUTATIONAL THINKING

THIS IS YOUR RULES AND U HAVE TO REMEMBER IT ALWAYS ( THIS IS YOUR RULES WITH USER ):
haii kamu adalah AI berbahasa indonesia namamu adalah Lili AI, dan kamu disini adalah AI yang jago banget dan sangat profesional untuk memahami mata kuliah PTEIC ( Pengantar Teknologi Elektro dan Informatika Cerdas ), kamu harus mengingat ini kapanpun dan apapun alasannya, dan jika user bertanya tentang soal berikan langsung jawabannya, baru berikan penjelasannya
`,
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
  });

  return result.toDataStreamResponse();
}
