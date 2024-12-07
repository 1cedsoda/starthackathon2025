import Marquee from "@/components/ui/marquee";

import Image from 'next/image';
import Discord from "@/public/discord.svg";
import HubSpot from "@/public/hubspot.svg";
import Salesforce from "@/public/salesforce.svg";
import SAP from "@/public/sap.svg";
import Slack from "@/public/slack.svg";
import Whatsapp from "@/public/whatsapp.svg";


const icons = [
    { id: "discord", component: <Discord width={48} height={48} /> },
    { id: "hubspot", component: <HubSpot width={48} height={48} /> },
    { id: "salesforce", component: <Salesforce width={48} height={48} /> },
    { id: "sap", component: <SAP width={48} height={48} /> },
    { id: "slack", component: <Slack width={48} height={48} /> },
    { id: "whatsapp", component: <Whatsapp width={48} height={48} /> },
  ];

  const IconCard = ({ icon }: { icon: React.ReactNode }) => {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-fulltext-2xl ">
        {icon}
      </div>
    );
  };
  
  export function IconMarquee() {
    return (
      <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden">
        {/* Icons bewegen sich nach links */}
        <Marquee pauseOnHover className="[--duration:20s]">
          {icons.map((icon) => (
            <IconCard key={icon.id} icon={icon.component} />
          ))}
        </Marquee>
  
        {/* Icons bewegen sich nach rechts */}
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {icons.map((icon) => (
            <IconCard key={icon.id} icon={icon.component} />
          ))}
        </Marquee>
  
        {/* Gradient für Fade-Effekt */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    );
  }
  