import { drizzle } from "drizzle-orm/better-sqlite3";
import { notesTable } from "./schema";

export const db = drizzle("db/sqlite.db");

async function main() {
  // seed notes
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
