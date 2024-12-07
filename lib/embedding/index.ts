import { db } from "@/db/db";
import { blocksTable } from "@/db/schema/blocks";
import { deserializeVector } from "./embedding";

class VectorIndex<T> {
  private entries: { vector: number[]; value: T }[] = [];
  private initializationFunction:
    | (() => Promise<{ vector: number[]; value: T }[]>)
    | null = null;

  constructor(
    initializationFunction?: () => Promise<{ vector: number[]; value: T }[]>
  ) {
    if (initializationFunction) {
      this.initializationFunction = initializationFunction;
    }
  }

  /**
   * Adds a vector-value pair to the index.
   * @param vector The vector to add.
   * @param value The associated value.
   */
  add(vector: number[], value: T): void {
    // Ensure the vector is valid (non-empty)
    if (!vector.length) {
      throw new Error("Vector must be non-empty.");
    }

    // Normalize the vector for faster cosine similarity calculation later
    const norm = this.calculateNorm(vector);
    if (norm === 0) {
      throw new Error("Vector norm cannot be zero.");
    }
    const normalizedVector = vector.map((val) => val / norm);

    this.entries.push({ vector: normalizedVector, value });
  }

  async query(
    queryVector: number[],
    minSimilarity = 0,
    limit?: number
  ): Promise<{ vector: number[]; value: T; similarity: number }[]> {
    // Ensure the vector is valid (non-empty)
    if (!queryVector.length) {
      throw new Error("Query vector must be non-empty.");
    }

    // Initialize entries if they are empty and an initialization function is provided
    if (this.entries.length === 0 && this.initializationFunction) {
      const initialEntries = await this.initializationFunction();
      for (const { vector, value } of initialEntries) {
        this.add(vector, value);
      }
    }

    // Normalize the query vector
    const norm = this.calculateNorm(queryVector);
    if (norm === 0) {
      throw new Error("Query vector norm cannot be zero.");
    }
    const normalizedQuery = queryVector.map((val) => val / norm);

    // Calculate similarities
    const results = this.entries
      .map(({ vector: entryVector, value }) => {
        const similarity = this.cosineSimilarity(normalizedQuery, entryVector);
        return { vector: entryVector, value, similarity };
      })
      // Filter by minimum similarity
      .filter(({ similarity }) => similarity >= minSimilarity)
      // Sort by similarity in descending order
      .sort((a, b) => b.similarity - a.similarity);

    // Apply limit if specified
    return typeof limit === "number" ? results.slice(0, limit) : results;
  }

  private cosineSimilarity(
    normalizedVector1: number[],
    normalizedVector2: number[]
  ): number {
    // Ensure vectors have the same dimension
    if (normalizedVector1.length !== normalizedVector2.length) {
      throw new Error("Vectors must be of the same dimension.");
    }

    // Compute dot produc
    let dot = 0;
    for (let i = 0; i < normalizedVector1.length; i++) {
      dot += normalizedVector1[i] * normalizedVector2[i];
    }
    return dot;
  }

  private calculateNorm(vector: number[]): number {
    let sumSquares = 0;
    for (const val of vector) {
      sumSquares += val * val;
    }
    return Math.sqrt(sumSquares);
  }
}

async function loadVectorIndex(): Promise<
  {
    vector: number[];
    value: number;
  }[]
> {
  console.log(`[Embedding]: Loading VectorStore...`);
  const blocks = await db.select().from(blocksTable).all();
  console.log(`[Embedding]: Loaded ${blocks.length} blocks.`);
  const res = blocks.map((block) => ({
    vector: deserializeVector(block.vector as Buffer),
    value: block.id,
  }));
  console.log(`[Embedding]: Finished loading VectorStore.`);
  return res;
}

export let vectorIndex: VectorIndex<number> = new VectorIndex<number>(
  loadVectorIndex
);
