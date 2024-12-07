import { blob, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const blocksTable = sqliteTable("blocks", {
  id: int().primaryKey({ autoIncrement: true }),
  // text
  content: text().notNull(),
  // vector Float32Array
  vector: blob().notNull(),
  // if possible web url like https://example.com
  webUrl: text().notNull(),
  // title
  title: text().notNull(),
  // date
  date: text(),
  // client that scraped the block and does the permisison check
  interface: text().notNull(),
  // source identification of the scraped content
  interfaceSource: text().notNull(),
});

export type Block = typeof blocksTable.$inferSelect;

export type BlockVectorless = Omit<Block, "vector">;

export type BlockSecret = Pick<
  Block,
  "id" | "interface" | "interfaceSource" | "webUrl"
>;

export function secritifyBlock(block: Block): BlockSecret {
  return {
    id: block.id,
    interface: block.interface,
    interfaceSource: block.interfaceSource,
    webUrl: block.webUrl,
  };
}
