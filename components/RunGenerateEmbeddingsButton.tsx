"use client";
import { generateEmbeddings } from "@/sources/actions";

export function RunGenerateEmbeddingsButton() {
  return (
    <button
      onClick={async () => {
        await generateEmbeddings();
        location.reload();
      }}
    >
      Click to run
    </button>
  );
}
