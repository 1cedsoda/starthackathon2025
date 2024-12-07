import { DebugQuery } from "@/components/DebugQuery";
import { RunGenerateEmbeddingsButton } from "@/components/RunGenerateEmbeddingsButton";

export default function Page() {
  return (
    <>
      <h1>Generate Embeddings</h1>
      <RunGenerateEmbeddingsButton />
      <DebugQuery />
    </>
  );
}
