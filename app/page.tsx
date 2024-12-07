import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="">
      <div className="flex items-center mt-40 px-16 max-w-5xl mx-auto text-center">
        <Hero />
      </div>
      <div className="flex items-center mt-40 px-16 max-w-3xl mx-auto">
        <Input placeholder="Search your files" />
        <Button variant="outline" className="ml-2 ">
          <ArrowRight className="h-10 w-10" />
        </Button>
      </div>
    </div>
  );
}
