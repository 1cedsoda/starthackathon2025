import { Block } from "@/db/schema/blocks";
import { ArticleInterfaceSource } from "./myarticlesScraper";

export async function getArticlePermission(
  blocks: Block,
  username: string
): Promise<boolean> {
  console.log("ajsndfaofnioqiewfn");
  const interfaceSource = JSON.parse(
    blocks.interfaceSource
  ) as ArticleInterfaceSource;

  const response = await fetch(
    `http://localhost:3000/myarticles/articles/${interfaceSource.articleId}`,
    {
      headers: {
        Authorization: `Bearer ${username}`,
      },
    }
  );

  if (response.status >= 200 && response.status < 300) {
    return true;
  } else {
    return false;
  }
}
