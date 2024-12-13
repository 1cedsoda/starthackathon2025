"use server";

import { BlockSecret, BlockVectorless } from "@/db/schema/blocks";

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
