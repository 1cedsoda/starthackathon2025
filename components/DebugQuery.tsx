"use client";

import { RequestEmbeddingQueryResult } from "@/app/api/query/route";
import { useState } from "react";

export function DebugQuery() {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<RequestEmbeddingQueryResult | undefined>(
    undefined
  );
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
          const res = await fetch("/api/query", {
            method: "POST",
            body: value,
            headers: {
              Authorization: "Bearer " + "Carol",
            },
          }).then((res) => res.json());
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
