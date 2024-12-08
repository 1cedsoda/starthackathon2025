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
import Onedrive from "@/public/onedrive.svg";
import Gmail from "@/public/gmail.svg";
import Outlok from "@/public/outlook.svg";
import Teams from "@/public/teams.svg";
import GoogleDrive from "@/public/google-drive.svg";
import Notion from "@/public/notion.svg";
import { useMemo } from "react";

const icons = [
  { id: "discord", component: <Discord width={64} height={64} /> },
  { id: "hubspot", component: <HubSpot width={64} height={64} /> },
  { id: "salesforce", component: <Salesforce width={64} height={64} /> },
  { id: "sap", component: <SAP width={64} height={64} /> },
  { id: "slack", component: <Slack width={64} height={64} /> },
  { id: "whatsapp", component: <Whatsapp width={64} height={64} /> },
  { id: "confluence", component: <Confluence width={64} height={64} /> },
  { id: "jira", component: <Jira width={64} height={64} /> },
  { id: "onedrive", component: <Onedrive width={64} height={64} /> },
  { id: "gmail", component: <Gmail width={64} height={64} /> },
  { id: "outlook", component: <Outlok width={64} height={64} /> },
  { id: "teams", component: <Teams width={64} height={64} /> },
  { id: "google-drive", component: <GoogleDrive width={64} height={64} /> },
  { id: "notion", component: <Notion width={64} height={64} /> },
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
