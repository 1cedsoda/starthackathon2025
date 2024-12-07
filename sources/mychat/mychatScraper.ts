import { db } from "@/db/db";
import { blocksTable } from "@/db/schema/blocks";
import { generateEmbedding, serializeVector } from "@/lib/embedding/embedding";
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

export type ChatInterfaceSource = {
  chatId: number;
  startMessageIndex: number;
  startMessageDate: string;
  endMessageIndex: number;
  endMessageDate: string;
};

export const chats: Chat[] = [
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

async function chunkChat(
  chat: Chat
): Promise<ChunkerOutput<ChatInterfaceSource>[]> {
  const chunks: ChunkerOutput<ChatInterfaceSource>[] = [];
  // last 3 messages
  const messageBuffer: Message[] = [];

  await Promise.all(
    chat.messages.map(async (message, i) => {
      // batch messages into chunks of 3
      if (messageBuffer.length >= 1) {
        // remove leftest message from messageBuffer.
        messageBuffer.shift();
      }
      messageBuffer.push(message);
      if (messageBuffer.length < 1) {
        return;
      }

      // convert to chunks
      const content = messageBuffer
        .map((m) => `at ${m.date} "${m.sender}" wrote "${m.message}"`)
        .join(" then ");
      chunks.push({
        embedding: await generateEmbedding(content),
        title: `Message #${i} between ${chat.participants.join(" and ")}`,
        date: message.date,
        content,
        interfaceSource: {
          chatId: chat.id,
          startMessageIndex: chat.messages.indexOf(message),
          startMessageDate: message.date,
          endMessageIndex: chat.messages.indexOf(message) + 1,
          endMessageDate: message.date,
        },
      });
    })
  );

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
    chunks.map(async ({ embedding, interfaceSource, content, title, date }) => {
      console.log(`[Embedding]: Embedding chat chunk: ${interfaceSource}`);
      await db
        .insert(blocksTable)
        .values({
          vector: serializeVector(embedding),
          content,
          title,
          date,
          webUrl:
            "http://localhost:3000/mychat/chat/" +
            interfaceSource.chatId +
            "?message=" +
            interfaceSource.startMessageIndex,
          interface: "mychat",
          interfaceSource: JSON.stringify(interfaceSource),
        })
        .execute();
    });
  });
}
