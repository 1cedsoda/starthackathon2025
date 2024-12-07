"use client";

import { embeddingQuery } from "@/lib/embedding/actions";
import { useState } from "react";

export function DebugQuery() {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<any | undefined>(undefined);
  return (
    <div className="flex">
      <input
        placeholder="Query"
        className="border"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={async () => {
          // reload page
          const res = await embeddingQuery("Who is Bob Zapper?", "username");
          console.log(res);
          setResult(res);
        }}
      >
        GO
      </button>
      <br />
      <h2> Result</h2>
      <p>{JSON.stringify(result || {}, null, 2)}</p>
    </div>
  );
}
