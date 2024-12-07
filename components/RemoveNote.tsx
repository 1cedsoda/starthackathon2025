"use client";
import { deleteNote } from "../lib/notes/actions";

export function RemoveNote({ note }) {
  return (
    <button
      onClick={async () => {
        await deleteNote(note.id);
        location.reload();
      }}
    >
      {"  "}X
    </button>
  );
}
