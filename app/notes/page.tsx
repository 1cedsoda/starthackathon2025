import { db } from "@/db/db";
import { notesTable } from "@/db/schema";
import { AddNote } from "@/lib/notes/AddNote";
import { RemoveNote } from "@/lib/notes/RemoveNote";

export default async function Notes() {
  const notes = await db.select().from(notesTable).all();
  return (
    <>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.id} className="flex">
          <p>{note.text}</p>
          <RemoveNote note={note} />
        </div>
      ))}
      <AddNote />
    </>
  );
}
