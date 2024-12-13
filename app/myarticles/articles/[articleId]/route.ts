import { NextRequest, NextResponse } from "next/server";
import { getUsernameServerside } from "@/app/hooks/useAuthorization";
import { articles } from "@/sources/myarticles/myarticlesScraper";

export async function GET(
  request: NextRequest,
  { params }: { params: { articleId: string } }
) {
  const headers = request.headers;
  const username = getUsernameServerside(headers);

  // Get path param articleId
  const { articleId } = params;

  const article =
    typeof articleId === "string" &&
    articles.find((c) => c.id.toString() === articleId);

  if (!article) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  // If the authenticated user is not a participant
  if (!username || !article.participants.includes(username)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // If authentication is successful, return the article data
  return NextResponse.json(article);
}
