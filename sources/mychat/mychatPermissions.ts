import { Block } from "@/db/schema/blocks";
import { ChatInterfaceSource } from "./mychatScraper";

export async function getChatPermission(
  blocks: Block,
  username: string
): Promise<boolean> {
  const interfaceSource = JSON.parse(
    blocks.interfaceSource
  ) as ChatInterfaceSource;

  console.log(
    `Checking chat permission for ${username} in chat ${interfaceSource.chatId}`
  );
  const response = await fetch(
    `http://localhost:3000/mychat/chat/${interfaceSource.chatId}`,
    {
      headers: {
        Authorization: `Bearer ${username}`,
      },
    }
  );

  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
}
