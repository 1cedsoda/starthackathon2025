import { getUsernameServerside } from "@/app/hooks/useAuthorization";
import { chats } from "@/sources/mychat/mychatScraper";
import { headers } from "next/headers";

export default async function ChatPage({ params }) {
  const username = getUsernameServerside(await headers());

  // get path param chatId
  const { chatId } = await params;

  const chat =
    typeof chatId === "string" && chats.find((c) => c.id.toString() === chatId);

  if (!chat) {
    throw new Response("Not Found", { status: 404 });
  }

  // If the authenticated user is not a participant of the chat
  if (!username || !chat.participants.includes(username)) {
    throw new Response("Forbidden", { status: 403 });
  }

  // If authentication is successful, render the content
  return (
    <div className="p-4">
      <h1>
        Chat #{chat.id} with {chat.participants.join(", ")}
      </h1>
      <div className="flex flex-col space-y-4">
        {chat.messages.map((message, i) => (
          <div
            key={i}
            className="flex space-x-4 rounded-xl p-4 bg-green-300 w-max"
          >
            <div>{message.date}</div>
            <div>{message.sender}</div>
            <div>{message.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
