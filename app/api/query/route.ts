// nextjs GET route

import { EmbeddingQueryResult } from "@/lib/embedding/actions";
import { generateEmbedding } from "@/lib/embedding/embedding";
import { vectorIndex } from "@/lib/embedding";
import { getBlocks } from "@/sources/source";
import { getPermissions } from "@/lib/permission/permission";
import { secritifyBlock } from "@/db/schema/blocks";

function getUsername(req: Request): string | undefined {
  // Get the 'Authorization' header
  const authHeader = req.headers.get("authorization");

  // Get valeu after bearer or undefined
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  } else {
    return undefined;
  }
}

export async function POST(req: Request): Promise<Response> {
  const username = getUsername(req);

  if (!username) {
    return new Response("Unauthorized", { status: 401 });
  }

  const input = await req.text();

  const result = await embeddingQuery(input, username);

  return new Response(JSON.stringify({ result: result }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

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

export type RequestEmbeddingQueryResult = {
  result: EmbeddingQueryResult[];
};
