import { db } from "@/db/db";
import { blocksTable } from "@/db/schema/blocks";
import { generateEmbedding, stringifyEmbedding } from "@/lib/embedding";
import { ChunkerOutput } from "../source";
import { eq } from "drizzle-orm";

type Chat = {
  id: number;
  participants: string[];
  messages: Message[];
};

type Message = {
  date: string;
  sender: string;
  message: string;
};

const chats: Chat[] = [
  {
    id: 1,
    participants: ["Alice", "Bob"],
    messages: [
      { date: "2021-01-01", sender: "Alice", message: "Hello, Bob!" },
      { date: "2021-01-02", sender: "Bob", message: "Hi, Alice!" },
    ],
  },
  {
    id: 2,
    participants: ["Alice", "Charlie"],
    messages: [
      { date: "2021-01-01", sender: "Alice", message: "Hello, Charlie!" },
      { date: "2021-01-02", sender: "Charlie", message: "Hi, Alice!" },
    ],
  },
];

async function chunkChat(chat: Chat): Promise<ChunkerOutput[]> {
  const chunks: ChunkerOutput[] = [];
  // last 3 messages
  const messageBuffer: Message[] = [];

  for (const message of chat.messages) {
    // batch messages into chunks of 3
    if (messageBuffer.length >= 1) {
      // remove leftest message from messageBuffer.
      messageBuffer.shift();
    }
    messageBuffer.push(message);
    if (messageBuffer.length < 1) {
      continue;
    }

    // convert to chunks
    const content = messageBuffer
      .map((m) => `at ${m.date} "${m.sender}" wrote "${m.message}"`)
      .join(" then ");
    chunks.push({
      embedding: await generateEmbedding(content),
      content,
      interfaceSource: JSON.stringify({
        chatId: chat.id,
        startMessageIndex: chat.messages.indexOf(message),
        endMessageIndex: chat.messages.indexOf(message) + 1,
      }),
    });
  }

  return chunks;
}

export async function generateChatEmbeddings() {
  // deleta all blovks with interface mychat
  await db
    .delete(blocksTable)
    .where(eq(blocksTable.interface, "mychat"))
    .execute();

  chats.map(async (chat) => {
    const chunks = await chunkChat(chat);
    chunks.map(async ({ embedding, interfaceSource, content }) => {
      console.log(`[Embedding]: Embedding chat chunk: ${interfaceSource}`);
      await db
        .insert(blocksTable)
        .values({
          vector: stringifyEmbedding(embedding),
          content,
          webUrl: "https://mychat.com",
          interface: "mychat",
          interfaceSource,
        })
        .execute();
    });
  });
}
