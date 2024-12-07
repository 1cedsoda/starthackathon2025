import { getUsernameServerside } from "@/app/hooks/useAuthorization";
import { articles } from "@/sources/myarticles/myarticlesScraper";
import { headers } from "next/headers";

export default async function ArticlePage({ params }) {
  const username = getUsernameServerside(await headers());

  // get path param chatId
  const { articleId } = params;

  const article =
    typeof articleId === "string" &&
    articles.find((c) => c.id.toString() === articleId);

  if (!article) {
    throw new Response("Not Found", { status: 404 });
  }

  // If the authenticated user is not participator or author
  if (
    !username ||
    !(article.participants.includes(username) || username === article.author)
  ) {
    throw new Response("Forbidden", { status: 403 });
  }

  // If authentication is successful, render the content
  return (
    <div className="p-4">
      <h1>
        &quot;{article.title}&quot; by @{article.author}
      </h1>
      <h2>Allowed Viewers: {article.participants.join(", ")}</h2>
      <p className="bg-gray-200 p-4 rounded-xl">{article.content}</p>
    </div>
  );
}
