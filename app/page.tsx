import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";

import { FiGitlab } from "react-icons/fi";
import { RiNotionFill } from "react-icons/ri";
import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";
import { FaSlack } from "react-icons/fa";
import { IconMarquee } from "@/components/IconMarquee";

export default function Home() {
  return (
    <div className="">
      <div className="flex items-center mt-40 px-16 max-w-5xl mx-auto text-center">
        <Hero />
      </div>
      <div className="flex items-center mt-8 px-16 max-w-3xl mx-auto">
        <Input placeholder="Search your files" />
        <Button variant="outline" className="ml-2 ">
          <ArrowRight className="h-10 w-10" />
        </Button>
      </div>
      <div className="flex mx-auto items-ceter max-w-3xl">
        <div className="flex max-w-3xl mx-auto items-center gap-8 pt-10 text-black">
          <FiGitlab className="h-6 w-6" />
          <RiNotionFill className="h-6 w-6" />
          <BiLogoMicrosoftTeams className="h-6 w-6" />
          <PiMicrosoftOutlookLogo className="h-6 w-6" />
          <FaSlack className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-10 max-w-3xl mx-auto">
        <IconMarquee />
      </div>
    </div>
  );
}
