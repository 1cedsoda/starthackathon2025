import { NextRequest, NextResponse } from "next/server";
import { getUsernameServerside } from "@/app/hooks/useAuthorization";
import { chats } from "@/sources/mychat/mychatScraper";

export async function GET(
  request: NextRequest,
  { params }: { params: { chatId: string } }
) {
  console.log("GET /mychat/chat/[chatId]", request.headers);

  const head = request.headers;
  const username = getUsernameServerside(head);

  console.log("username", username);

  // get path param chatId
  const { chatId } = params;

  console.log("chatId", chatId);

  const chat =
    typeof chatId === "string" && chats.find((c) => c.id.toString() === chatId);

  if (!chat) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  // If the authenticated user is not a participant of the chat
  if (!username || !chat.participants.includes(username)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // If authentication is successful, return the chat data
  return NextResponse.json(chat);
}
