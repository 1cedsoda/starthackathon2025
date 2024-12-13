import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateEmbedding(input: string): Promise<number[]> {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input,
    encoding_format: "float",
  });

  return embedding.data[0].embedding;
}

export function stringifyEmbedding(embedding: number[]): string {
  return `[${embedding.join(", ")}]`;
}

export function serializeVector(vector: number[]): Buffer {
  const buffer = Buffer.alloc(vector.length * 8); // 8 bytes per double
  vector.forEach((num, index) => {
    buffer.writeDoubleLE(num, index * 8);
  });
  return buffer;
}

export function deserializeVector(buffer: Buffer): number[] {
  const vector: number[] = [];
  for (let i = 0; i < buffer.length; i += 8) {
    vector.push(buffer.readDoubleLE(i));
  }
  return vector;
}

export async function innovate(input: string): Promise<any> {
  // Referenzen abrufen
  const references = (await (
    await fetch("/api/query", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("username")}`,
      },
      method: "POST",
      body: JSON.stringify({ query: input + "Müller" }),
    })
  ).json()) as { result: { allowed: boolean; content: string }[] };

  const allowedReferences = references.result.filter(
    (reference) => reference.allowed
  );

  console.log("Allowed References:", allowedReferences);

  // OpenAI API-Aufruf
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          `
          You are an innovation specialist. Given an input process, respond ONLY with a valid JSON in the following structure:
          {
            "metrics": [
              { "label": "Timeline", "value": "6-9 Months", "iconColor": "text-blue-500" },
              { "label": "Risk Level", "value": "Medium", "iconColor": "text-yellow-500" },
              { "label": "Optimization Value", "value": "€750k - €1.2M", "iconColor": "text-green-500" }
            ],
            "processDescription": "Detailed description of the process optimization.",
            "companyAnalysis": "Company analysis focusing on areas of improvement.",
            "steps": [
              { "title": "Step Title", "description": "Detailed description of the step." },
              { "title": "Step Title", "description": "Detailed description of the step." },
               { "title": "Step Title", "description": "Detailed description of the step." },
              { "title": "Step Title", "description": "Detailed description of the step." }
            ]
          }` +
          (allowedReferences.length > 0
            ? `\nCONTEXT:\n${allowedReferences
                .map((z) => z.content)
                .join("\n")}`
            : ""),
      },
      {
        role: "user",
        content: `Generate innovation insights for the process: ${input}`,
      },
    ],
  });

  try {
    return completion;
  } catch (error) {
    console.error("Error parsing JSON from OpenAI:", error);
    return null;
  }
}
