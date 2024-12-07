import { Block } from "@/db/schema/blocks";

export async function getChatPermission(
  blocks: Block,
  username: string
): Promise<boolean> {
  return true;
}
