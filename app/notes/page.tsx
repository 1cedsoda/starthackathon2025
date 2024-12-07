import { db } from "@/db/db";
import { notesTable } from "@/db/schema";
import { Fragment } from "react";

export default async function Notes() {
  const notes = await db.select().from(notesTable).all();
  return (
    <>
      <h1>Notes</h1>
      {notes.map((note) => (
        <Fragment key={note.id}>
          <p>{note.text}</p>
        </Fragment>
      ))}
    </>
  );
}
