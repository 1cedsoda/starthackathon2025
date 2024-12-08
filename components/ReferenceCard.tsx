import { EmbeddingQueryResult } from "@/lib/embedding/actions";
import { LockOpen, Lock } from "lucide-react";
import Whatsapp from "@/public/whatsapp.svg";
import Confluence from "@/public/confluence.svg";

type Props = {
  reference: EmbeddingQueryResult;
};

export function ReferenceCard({ reference }: Props) {
  return (
    <div className="rounded-md border p-4 flex gap-4">
      {reference.interface === "mychat" ? (
        <Whatsapp width={48} height={48} />
      ) : (
        <Confluence width={48} height={48} />
      )}
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <div className="flex gap-2">
            {reference.allowed && (
              <>
                <span className="text-gray-400">{reference.date}</span>
                <span className="">{reference.title}</span>
              </>
            )}
            {!reference.allowed && (
              <>
                <span className="text-gray-400 blur-[5px]">****-**-**</span>
                <span className="blur-[5px]">***********</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            {reference.allowed ? (
              <>
                <LockOpen size={16} />
                Allowed
              </>
            ) : (
              <>
                <Lock size={16} color="red" />
                <span className="text-red-500">Protected</span>
              </>
            )}
          </div>
        </div>
        <a
          className="text-blue-500 text-sm"
          target="_blank"
          rel="noopener noreferrer"
          href={
            reference.interface == "mychat"
              ? "https://www.figma.com/proto/JtDotBMNkp4xAaHIDpxBEM/Whatsapp-(Community)?node-id=0-1&t=VxDNrwO9AvJ6Mhou-1"
              : "https://foam-newsstand-609.notion.site/Battery-Product-Sales-Report-2024-156fbe6e82388092b983d437086bc056"
          }
        >
          {reference.webUrl}
        </a>
      </div>
    </div>
  );
}
