import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const blocksTable = sqliteTable("blocks", {
  id: int().primaryKey({ autoIncrement: true }),
  // text
  content: text().notNull(),
  // vector '[1, 2, 3]'
  vector: text().notNull(),
  // if possible web url like https://example.com
  webUrl: text().notNull(),
  // client that scraped the block and does the permisison check
  interface: text().notNull(),
  // source identification of the scraped content
  interfaceSource: text().notNull(),
});
