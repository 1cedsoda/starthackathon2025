"use server";

import { vectorIndex } from ".";
import { generateEmbedding } from "./embedding";
import {
  Block,
  BlockSecret,
  BlockVectorless,
  secritifyBlock,
} from "@/db/schema/blocks";
import { getBlocks } from "@/sources/source";
import { getPermissions } from "../permission/permission";

export type EmbeddingQueryResultAllowed = BlockVectorless & {
  similarity: number;
  allowed: true;
};

export type EmbeddingQueryResultDisallowed = BlockSecret & {
  similarity: number;
  allowed: false;
};

export type EmbeddingQueryResult =
  | EmbeddingQueryResultAllowed
  | EmbeddingQueryResultDisallowed;

export async function embeddingQuery(
  input: string,
  username: string
): Promise<EmbeddingQueryResult[]> {
  const embedding = await generateEmbedding(input);

  const similarity = await vectorIndex.query(embedding);

  const blocks = await getBlocks(similarity.map((s) => s.value));

  const permissions = await getPermissions(blocks, username);

  const res: EmbeddingQueryResult[] = [];

  for (let i = 0; i < similarity.length; i++) {
    const block = blocks.find((b) => b.id === similarity[i].value);
    if (!block) {
      throw new Error("Block not found");
    }
    if (permissions[i] === true) {
      res.push({
        ...{
          ...block,
          vector: undefined,
        },
        similarity: similarity[i].similarity,
        allowed: true,
      });
    } else {
      res.push({
        ...secritifyBlock(block),
        similarity: similarity[i].similarity,
        allowed: false,
      });
    }
  }

  return res;
}
