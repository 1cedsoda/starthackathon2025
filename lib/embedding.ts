import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    "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",
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
