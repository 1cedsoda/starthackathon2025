import { Block } from "@/db/schema/blocks";
import { getArticlePermission } from "@/sources/myarticles/myarticlesPermisisons";
import { getChatPermission } from "@/sources/mychat/mychatPermissions";

export async function getPermissions(blocks: Block[], username: string) {
  return await Promise.all(
    blocks.map((block) => {
      const permission =
        block.interface === "myarticles"
          ? getArticlePermission(block, username)
          : block.interface === "mychat"
          ? getChatPermission(block, username)
          : undefined;
      if (permission === undefined) {
        throw new Error("Unknown interface");
      }
      return permission;
    })
  );
}
