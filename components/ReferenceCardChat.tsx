import { EmbeddingQueryResult } from "@/lib/embedding/actions";
import Whatsapp from "@/public/whatsapp.svg";
import Confluence from "@/public/confluence.svg";

type Props = {
  reference: EmbeddingQueryResult;
};

export function ReferenceCardChat({ reference }: Props) {
  return (
    <div className="rounded-3xl p-4 flex gap-4 rounded-bl-none bg-gray-200">
      {reference.interface === "mychat" ? (
        <Whatsapp width={24} height={24} />
      ) : (
        <Confluence width={24} height={24} />
      )}
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <div className="flex gap-2">
            {reference.allowed && (
              <>
                <span className="text-gray-400">{reference.date}</span>
                <a
                  className="text-blue-500 text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={reference.webUrl}
                >
                  {reference.title}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
