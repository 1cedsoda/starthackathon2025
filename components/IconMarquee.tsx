import Marquee from "@/components/ui/marquee";

import Image from "next/image";
import Discord from "@/public/discord.svg";
import HubSpot from "@/public/hubspot.svg";
import Salesforce from "@/public/salesforce.svg";
import SAP from "@/public/sap.svg";
import Slack from "@/public/slack.svg";
import Whatsapp from "@/public/whatsapp.svg";
import Confluence from "@/public/confluence.svg";
import Jira from "@/public/jira-1.svg";
import { useMemo } from "react";

const icons = [
  { id: "discord", component: <Discord width={48} height={48} /> },
  { id: "hubspot", component: <HubSpot width={48} height={48} /> },
  { id: "salesforce", component: <Salesforce width={48} height={48} /> },
  { id: "sap", component: <SAP width={48} height={48} /> },
  { id: "slack", component: <Slack width={48} height={48} /> },
  { id: "whatsapp", component: <Whatsapp width={48} height={48} /> },
  { id: "confluence", component: <Confluence width={48} height={48} /> },
  { id: "jira", component: <Jira width={48} height={48} /> },
];

const IconCard = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-fulltext-2xl ">
      {icon}
    </div>
  );
};

function randomizeOrder(array: any[], seed: number) {
  return array.sort(() => seed - 0.5);
}

export function IconMarquee() {
  "use client";
  const random1 = useMemo(() => Math.random(), []);
  const random2 = useMemo(() => Math.random(), []);
  return (
    <div className="relative flex h-[100px] pt-2 w-full flex-col items-center justify-center overflow-hidden">
      {/* Icons bewegen sich nach links */}
      <Marquee pauseOnHover className="[--duration:20s]">
        {randomizeOrder(icons, random1).map((icon) => (
          <IconCard key={icon.id} icon={icon.component} />
        ))}
      </Marquee>

      {/* Icons bewegen sich nach rechts */}
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {randomizeOrder(icons, random2).map((icon) => (
          <IconCard key={icon.id} icon={icon.component} />
        ))}
      </Marquee>

      {/* Gradient für Fade-Effekt */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
