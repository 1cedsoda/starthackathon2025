import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { db } from "../db";

export const notesTable = sqliteTable("notes", {
  id: int().primaryKey({ autoIncrement: true }),
  text: text().notNull().unique(),
});

// seed notes
async function main() {
  const notes = await db.select().from(notesTable).all();
  if (notes.length === 0) {
    console.log("[DB]: Seeding notes");
    await db.insert(notesTable).values({ text: "Hello, World!" }).execute();
    await db.insert(notesTable).values({ text: "Hello, Man" }).execute();
  } else {
    console.log("[DB]: Notes already seeded");
  }
}

main();
