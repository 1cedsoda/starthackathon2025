import Whatsapp from "@/public/whatsapp.svg";
import Confluence from "@/public/confluence.svg";
import { KeyRound } from "lucide-react";

export default function Filter() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-md font-bold text-gray-500">ACTIVE INTEGRATIONS</h2>
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-2 p-4 border-gray-400  border rounded-2xl">
          <Whatsapp className="h-12 w-12" />
          <span className="text-sm text-gray-500">Whatsapp</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 border-gray-400 border rounded-2xl">
          <Confluence className="h-12 w-12" />
          <span className="text-sm text-gray-500">Confluence</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 border-gray-200 border rounded-2xl">
          <KeyRound className="h-12 w-12" color="#E5E7EB" />
          <span className="text-sm text-gray-400">Add</span>
        </div>
      </div>
    </div>
  );
}
