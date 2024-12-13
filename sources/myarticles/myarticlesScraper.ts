import { db } from "@/db/db";
import { blocksTable } from "@/db/schema/blocks";
import { generateEmbedding, serializeVector } from "@/lib/embedding/embedding";
import { ChunkerOutput } from "../source";
import { eq } from "drizzle-orm";

type Article = {
  id: number;
  publishedDate: string;
  participants: string[];
  author: string;
  title: string;
  content: string;
};

export type ArticleInterfaceSource = {
  articleId: number;
  publishedDate: string;
  startCharacterIndex: number;
  endCharacterIndex: number;
};

export const articles: Article[] = [
  {
    id: 1,
    publishedDate: "2024-12-08",
    participants: ["Carol", "Marcus", "Felix"],
    author: "Carol",
    title: "Boss: Marcus Zapper",
    content:
      "Marcus Zapper is the boss of Müller Mittelstand GmbH. He drives\n" +
      "innovation and is the one who gets asked if any question pops up.\n" +
      "Sometimes, he shoots lasers from his eyes. But that's a feature.",
  },
  {
    id: 2,
    publishedDate: "2024-12-08",
    participants: ["Marcus", "Carol", "Felix"],
    author: "Marcus",
    title: "Chief of Marketing: Carol Medimacher",
    content:
      "Carol Medimacher is the brain of Müller Mittelstand GmbH's marketing\n" +
      "department. She's the one who makes sure that the company's products\n" +
      "are known to the public. She onboards employees and makes sure they\n" +
      "know what they're doing. She likes cheesecake and crackers.",
  },
  {
    id: 3,
    publishedDate: "2024-12-08",
    participants: ["Marcus", "Carol", "Felix"],
    author: "Carol",
    title: "Marketing intern: Felix Flix",
    content:
      "Felix Flix is the new guy. He's an intern for Müller Mittelstand\n" +
      "GmbH's marketing department. He doesn't really know what he's doing\n" +
      "but learns quickly. He doesn't like cheesecake but he likes crackers,\n" +
      "especially the round ones with salt on top.",
  },
  {
    id: 4,
    publishedDate: "2024-12-08",
    participants: ["Marcus", "Carol", "Felix"],
    author: "Carol",
    title: "Project PLAY",
    content:
      "Project PLAY is an exciting new initiative by Müller Mittelstand GmbH,\n" +
      "aimed at revolutionizing the way people learn and engage with educational\n" +
      "content. This project focuses on developing a groundbreaking platform that\n" +
      "blends creativity, engagement, and entertainment to create an unparalleled\n" +
      "learning experience.\n" +
      "At its core, Project PLAY is an interactive learning platform designed to\n" +
      "make education more engaging and enjoyable for users of all ages.\n" +
      "By incorporating elements of gamification, the platform seeks to enhance\n" +
      "user engagement and retention, transforming traditional learning methods into\n" +
      "dynamic and interactive experiences.\n" +
      "One of the standout features of Project PLAY is its integration of virtual reality\n" +
      "technology. This innovative approach allows users to immerse themselves in a virtual\n" +
      "environment where they can interact with learning materials in a more intuitive and\n" +
      "effective manner. By leveraging VR, the platform aims to facilitate more efficient\n" +
      "learning, enabling users to grasp complex concepts through hands-on, simulated\n" +
      "experiences.\n" +
      "Project PLAY represents a significant step forward in educational technology,\n" +
      "promising to redefine how knowledge is acquired and applied.\n" +
      "Through strategic marketing efforts, Müller Mittelstand GmbH aims to\n" +
      "reach a broad audience, showcasing the platform's potential to transform\n" +
      "education and empower learners worldwide.",
  },
  {
    id: 5,
    publishedDate: "2024-12-08",
    participants: ["Marcus"],
    author: "Marcus",
    title: "Battery Product Sales Report 2024",
    content:
      "The Battery Product Sales Report for 2024 provides an overview\n" +
      "of the sales performance of EnergyMax Batteries over the year.\n" +
      "The report highlights a total annual revenue of $1,683,000, with\n" +
      "significant quarterly growth observed in Q1 and Q2, despite a slight\n" +
      "dip in Q3. The product line is dominated by AA and AAA batteries,\n" +
      "which together account for 75% of total sales. Sales distribution\n" +
      "is primarily through retail stores and online marketplaces, which\n" +
      "together constitute 75% of sales channels. Regionally, the North\n" +
      "holds the largest market share with 32%, followed by the South at 29%.",
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

async function chunkArticle(
  article: Article
): Promise<ChunkerOutput<ArticleInterfaceSource>[]> {
  const chunks: ChunkerOutput<ArticleInterfaceSource>[] = [];
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
        title: article.title,
        date: article.publishedDate,
        interfaceSource: {
          publishedDate: article.publishedDate,
          articleId: article.id,
          startCharacterIndex: i * 1000,
          endCharacterIndex: (i + 1) * 1000,
        },
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
    chunks.map(async ({ embedding, interfaceSource, content, title, date }) => {
      console.log(`[Embedding]: Embedding article chunk: ${interfaceSource}`);
      await db
        .insert(blocksTable)
        .values({
          vector: serializeVector(embedding),
          content,
          date,
          title,
          webUrl:
            "http://confluence.mycompany.de/article/" +
            interfaceSource.articleId,
          interface: "myarticles",
          interfaceSource: JSON.stringify(interfaceSource),
        })
        .execute();
    });
  });
}
