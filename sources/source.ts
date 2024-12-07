export const interfaces = ["myarticles", "mychat"] as const;
export type Interface = (typeof interfaces)[number];

export type ChunkerOutput = {
  embedding: number[];
  content: string;
  interfaceSource: string;
};
