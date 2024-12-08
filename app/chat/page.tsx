"use client";
import Filter from "@/components/Filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import OpenAI from "openai";
import { useCallback, useState } from "react";
import Markdown from "react-markdown";
import Image from "next/image";

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

type Message = UserMessage | BotMessage | SystemMessage;

export const openai = new OpenAI({
  apiKey:
    "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",
  dangerouslyAllowBrowser: true,
});

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! How can I help you today?" },
    { role: "user", content: "I need help with my taxes" },
    {
      role: "assistant",
      content: "Sure! I can help with that. What's your question?",
    },
  ]);
  const [input, setInput] = useState("");
  const handleSendMessage = useCallback(async () => {
    setInput("");
    setMessages([...messages, { role: "user", content: input }]);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [...messages, { role: "user", content: input }],
    });
    const answer = completion.choices[0].message.content;
    if (answer) {
      setMessages([
        ...messages,
        { role: "user", content: input },
        { role: "assistant", content: answer },
      ]);
    }
  }, [input, messages]);
  return (
    <>
      <div className="flex flex-col w-[40rem] gap-4 mx-auto min-h-screen">
        <h1 className="text-3xl ">Chat with Crystal</h1>
        <Filter />
        {messages.map((message, index) => (
          <div key={index} className={`flex`}>
            {message.role === "user" && <div className="flex-1" />}
            <div
              className={`p-4 rounded-3xl flex gap-2 ${
                message.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : message.role === "assistant"
                  ? "bg-gray-200 rounded-bl-none"
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
              <Markdown className="prose">{message.content}</Markdown>
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
