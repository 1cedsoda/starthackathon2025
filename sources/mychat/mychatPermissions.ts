import { Block } from "@/db/schema/blocks";

export async function getChatPermission(
  blocks: Block,
  username: string
): Promise<boolean> {
  const response = await fetch(
    `http://localhost:3000/mychat/chat/${blocks.id}`,
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
