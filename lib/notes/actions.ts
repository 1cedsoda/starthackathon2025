"use server";

import { db } from "@/db/db";
import { notesTable } from "@/db/schema/blocks";
import { eq } from "drizzle-orm";

export async function createNote({ text }) {
  await db
    .insert(notesTable)
    .values({
      text,
    })
    .execute();
}

export async function deleteNote(id) {
  await db.delete(notesTable).where(eq(notesTable.id, id)).execute();
}
