"use client";
import Filter from "@/components/Filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import OpenAI from "openai";
import { useCallback, useEffect, useState } from "react";
import Markdown from "react-markdown";
import Image from "next/image";
import { RequestEmbeddingQueryResult } from "../api/query/route";
import { ReferenceCard } from "@/components/ReferenceCard";
import { EmbeddingQueryResultAllowed } from "@/lib/embedding/actions";
import { ReferenceCardChat } from "@/components/ReferenceCardChat";
import SparklesText from "@/components/ui/sparkles-text";

type UserMessage = {
  role: "user";
  content: string;
};

type BotMessage = {
  role: "assistant";
  content: string;
};

type SystemMessage = {
  role: "system";
  content: string;
};
type ReferenceMessage = {
  role: "reference";
  content: EmbeddingQueryResultAllowed[];
};

type Message = UserMessage | BotMessage | SystemMessage | ReferenceMessage;

export const openai = new OpenAI({
  apiKey:
    "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",
  dangerouslyAllowBrowser: true,
});

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);
  const handleSendMessage = useCallback(async () => {
    // submit input
    setInput("");
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);

    // RAG
    const references = (await (
      await fetch("/api/query", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("username")}`,
        },
        method: "POST",
        body: input,
      })
    ).json()) as RequestEmbeddingQueryResult;

    const allowedRefrences = references.result.filter(
      (reference) => reference.allowed
    );

    console.log("allowedRefrences", allowedRefrences);

    if (allowedRefrences.length > 0) {
      newMessages.push({
        role: "system",
        content:
          `CONTEXT:\n` + allowedRefrences.map((z: any) => z.content).join("\n"),
      });
    }

    console.log("requesting...", messages);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: newMessages.filter(
        (message) => (message as any).role !== "reference"
      ) as any,
    });
    const answer = completion.choices[0].message.content;
    if (answer) {
      console.log("answer", answer);
      newMessages.push({ role: "assistant", content: answer });
    }

    newMessages.push({
      role: "reference",
      content: allowedRefrences,
    });

    setMessages([...newMessages]);
  }, [input, messages]);
  return (
    <>
      <div className="flex flex-col w-[40rem] gap-4 mx-auto min-h-screen">
        <SparklesText
          className="text-6xl font-bold text-stroke"
          text="Chat with Crystal"
        />
        <Filter />
        <h2 className="text-md font-bold text-gray-500">CHAT</h2>
        {messages.map((message, index) => (
          <div key={index} className={`flex`}>
            {message.role === "user" && <div className="flex-1" />}
            <div
              className={`${
                message.role != "reference" ? "p-4" : ""
              } rounded-3xl flex gap-2 ${
                message.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : message.role === "assistant"
                  ? "bg-gray-200 rounded-bl-none"
                  : message.role === "reference"
                  ? ""
                  : "display-none"
              }`}
            >
              {message.role === "assistant" && (
                <Image
                  src="/crystal.png"
                  alt="avatar"
                  width={24}
                  height={24}
                  className="aspect-square self-start"
                />
              )}
              {["user", "assistant"].includes(message.role) && (
                <Markdown className="prose">
                  {message.content as string}
                </Markdown>
              )}
              {message.role === "reference" && (
                <div className="flex flex-col gap-2 p-0 -mt-2">
                  {(
                    message.content as unknown as EmbeddingQueryResultAllowed[]
                  ).map((reference, i) => (
                    <ReferenceCardChat key={i} reference={reference} />
                  ))}
                </div>
              )}
            </div>
            {message.role === "assistant" && <div className="flex-1" />}
          </div>
        ))}
      </div>
      <div className="sticky w-full bottom-0 pb-16">
        <div className="flex items-center mt-8 px-16 max-w-3xl mx-auto">
          <Input
            placeholder="Search your files"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage() : null)}
          />
          <Button
            variant="outline"
            className="ml-2 "
            onClick={handleSendMessage}
          >
            <ArrowRight className="h-10 w-10" />
          </Button>
        </div>
      </div>
    </>
  );
}
