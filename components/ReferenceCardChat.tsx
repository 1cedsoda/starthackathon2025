import { EmbeddingQueryResult } from "@/lib/embedding/actions";
import { LockOpen, Lock } from "lucide-react";
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
                <a className="text-blue-500 text-sm" href={reference.interface == "mychat" ? "https://www.figma.com/proto/JtDotBMNkp4xAaHIDpxBEM/Whatsapp-(Community)?node-id=0-1&t=VxDNrwO9AvJ6Mhou-1" : "https://foam-newsstand-609.notion.site/Battery-Product-Sales-Report-2024-156fbe6e82388092b983d437086bc056"}>
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
