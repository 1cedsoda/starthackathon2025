"use client";

import { useState } from "react";
import { createNote } from "../lib/notes/actions";

export function AddNote() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <div className="flex">
      <input
        placeholder="New Note"
        className="border"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={async () => {
          // reload page
          await createNote({ text: value });
          location.reload();
        }}
      >
        Create Note
      </button>
    </div>
  );
}
