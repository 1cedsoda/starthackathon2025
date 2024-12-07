import { Block } from "@/db/schema/blocks";

export async function getArticlePermission(
  blocks: Block,
  username: string
): Promise<boolean> {
  return true;
}
