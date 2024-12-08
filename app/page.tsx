"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";

import { FiGitlab } from "react-icons/fi";
import { RiNotionFill } from "react-icons/ri";
import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";
import { FaSlack } from "react-icons/fa";
import { IconMarquee } from "@/components/IconMarquee";
import { useCallback, useState } from "react";
import { EmbeddingQueryResult } from "@/lib/embedding/actions";
import { ReferenceCard } from "@/components/ReferenceCard";
import { RequestEmbeddingQueryResult } from "./api/query/route";
import Filter from "@/components/Filter";

export default function Home() {
  const [input, setInput] = useState("");
  const [references, setReferences] = useState<
    EmbeddingQueryResult[] | undefined
  >(undefined);
  const handleSearch = useCallback(async () => {
    const res = await fetch("/api/query", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("username")}`,
      },
      method: "POST",
      body: input,
    });
    const json = (await res.json()) as RequestEmbeddingQueryResult;
    console.log(json);
    setReferences(json.result);
  }, [input]);
  return (
    <div className="">
      <div className="flex items-center mt-40 px-16 max-w-5xl mx-auto text-center">
        <Hero />
      </div>
      <div className="flex items-center mt-8 px-16 max-w-3xl mx-auto">
        <Input
          placeholder="Search your files"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="outline" className="ml-2 " onClick={handleSearch}>
          <ArrowRight className="h-10 w-10" />
        </Button>
      </div>
      <div className="flex mx-auto items-center w-[40rem] pt-8">
        <Filter />
      </div>
      {!references && (
        <>
          <div className="mx-auto w-[40rem] mt-10 ">
            <h2 className="text-md font-bold text-gray-500">
              MORE INTEGRATIONS
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <IconMarquee />
          </div>
        </>
      )}
      {references && (
        <div className="mx-auto flex flex-col max-w-3xl gap-4">
          {references.map((reference) => (
            <ReferenceCard key={reference.id} reference={reference} />
          ))}
        </div>
      )}
    </div>
  );
}
