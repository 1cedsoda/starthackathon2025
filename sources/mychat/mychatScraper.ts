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
    participants: ["Carol", "Marcus"],
    messages: [
      { date: "2024-12-07", sender: "Carol", message: "Hello, Marcus" },
      { date: "2024-12-07", sender: "Marcus", message: "Hey, Carol!" },
      {
        date: "2024-12-07",
        sender: "Carol",
        message: "Are you joining our think tank at 7pm?",
      },
      { date: "2024-12-07", sender: "Marcus", message: "Sure!" },
      {
        date: "2024-12-08",
        sender: "Carol",
        message:
          "Hey, do you have an update on the marketing proposal for Project PLAY? Also please confirm the campaign launch date",
      },
      { date: "2024-12-08", sender: "Marcus", message: "Hi Carol!" },
      { date: "2024-12-08", sender: "Marcus", message: "I just reviewed it" },
      {
        date: "2024-12-08",
        sender: "Marcus",
        message:
          "The final document is saved in the shared drive under 'Marketing/Projects/Project PLAY.' Let me know if you need me to make any further changes.The launch is scheduled for May 15. Also, did you already schedule the meeting with Felix for tomorrow?",
      },
      {
        date: "2024-12-08",
        sender: "Carol",
        message:
          "Yes, I just sent an invite. Please inform him about the changes we made during yesterday’s think tank. I think he’s not in the mailing list...",
      },
    ],
  },
  {
    id: 2,
    participants: ["Marcus", "Felix"],
    messages: [
      { date: "2024-12-08", sender: "Marcus", message: "Hello, Felix!" },
      { date: "2024-12-08", sender: "Felix", message: "Hi, Marcus!" },
      {
        date: "2024-12-08",
        sender: "Marcus",
        message:
          "In yesterday's think tank, we applied a few changes to the marketing proposal for Project PLAY. You can find them in the shared drive under 'Marketing/Projects/Project PLAY.' Please read through them and hit me up if you find any inconsistencies.",
      },
      {
        date: "2024-12-08",
        sender: "Felix",
        message: "Done, everything's fine! :)",
      },
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
            "https://web.whatsapp.com/chat/" +
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
