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
