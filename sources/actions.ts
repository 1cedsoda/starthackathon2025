"use server";

import { generateArticleEmebeddings } from "./myarticles/myarticlesScraper";
import { generateChatEmbeddings } from "./mychat/mychatScraper";

export async function generateEmbeddings() {
  await generateArticleEmebeddings();
  await generateChatEmbeddings();
}
