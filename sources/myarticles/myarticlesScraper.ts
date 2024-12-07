import { db } from "@/db/db";
import { blocksTable } from "@/db/schema/blocks";
import { generateEmbedding, stringifyEmbedding } from "@/lib/embedding";
import { ChunkerOutput } from "../source";
import { eq } from "drizzle-orm";

type Article = {
  id: number;
  participants: string[];
  author: string;
  title: string;
  content: string;
};

const articles: Article[] = [
  {
    id: 1,
    participants: ["Alice", "Bob"],
    author: "Alice",
    title: "The superhero 'Bob Zapper'",
    content:
      "Bob Zapper is a fictional character that is a superhero\n" +
      "that can shoot lasers from his eyes.",
  },
];

function splitByCharacters(text: string, maxCharacters: number): string[] {
  const splitted = text.split("");
  const result: string[] = [];
  let current = "";
  for (const char of splitted) {
    if (current.length + char.length > maxCharacters) {
      result.push(current);
      current = "";
    }
    current += char;
  }
  result.push(current);
  return result;
}

async function chunkArticle(article: Article): Promise<ChunkerOutput[]> {
  const chunks: ChunkerOutput[] = [];
  // 8000 token limit
  // 1 token = 4 characters
  // split article into sections of 1000 or less characters
  const contents = splitByCharacters(article.content, 1000);
  console.log(contents);

  await Promise.all(
    contents.map(async (content, i) => {
      const embedding = await generateEmbedding(content);
      chunks.push({
        embedding,
        content,
        interfaceSource: JSON.stringify({
          articleId: article.id,
          startCharacterIndex: i * 1000,
          endCharacterIndex: (i + 1) * 1000,
        }),
      });
    })
  );

  return chunks;
}

export async function generateArticleEmebeddings() {
  // deleta all blovks with interface myarticles
  await db
    .delete(blocksTable)
    .where(eq(blocksTable.interface, "myarticles"))
    .execute();

  articles.map(async (article) => {
    console.log(`[Embedding]: Seeding article: ${article.title}`);
    const chunks = await chunkArticle(article);
    console.log(chunks.length);
    chunks.map(async ({ embedding, interfaceSource, content }) => {
      console.log(`[Embedding]: Embedding article chunk: ${interfaceSource}`);
      await db
        .insert(blocksTable)
        .values({
          vector: stringifyEmbedding(embedding),
          content,
          webUrl: "https://myarticles.com",
          interface: "myarticles",
          interfaceSource,
        })
        .execute();
    });
  });
}
