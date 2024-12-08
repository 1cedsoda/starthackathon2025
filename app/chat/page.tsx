import Filter from "@/components/Filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex justify-center">
      <Filter />
      <div className="absolute w-full bottom-0 pb-16">
        <div className="flex items-center mt-8 px-16 max-w-3xl mx-auto">
          <Input placeholder="Search your files" />
          <Button variant="outline" className="ml-2 ">
            <ArrowRight className="h-10 w-10" />
          </Button>
        </div>
      </div>
    </div>
  );
}
