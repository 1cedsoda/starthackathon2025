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

