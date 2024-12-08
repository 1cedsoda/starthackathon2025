import { db } from "@/db/db";
import { Block, blocksTable } from "@/db/schema/blocks";
import { eq } from "drizzle-orm";

export const interfaces = ["myarticles", "mychat"] as const;
export type Interface = (typeof interfaces)[number];

export type ChunkerOutput<IS> = {
  embedding: number[];
  content: string;
  interfaceSource: IS;
  title: string;
  date: string | null;
};

export async function getBlocks(ids: number[]): Promise<Block[]> {
  return await Promise.all(
    ids.map(
      async (id) =>
        (
          await db
            .select()
            .from(blocksTable)
            .where(eq(blocksTable.id, id))
            .execute()
        )[0] as Block
    )
  );
}
