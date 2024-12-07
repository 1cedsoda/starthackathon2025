"use client";
import { deleteNote } from "./actions";

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
