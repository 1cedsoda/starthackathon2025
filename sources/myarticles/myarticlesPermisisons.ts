import { Block } from "@/db/schema/blocks";

export async function getArticlePermission(
  blocks: Block,
  username: string
): Promise<boolean> {
  const response = await fetch(
    `http://localhost:3000/myarticles/article/${blocks.id}`,
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
