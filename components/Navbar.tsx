"use client";

import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import { useParams } from "next/navigation";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const params = useParams<{ tag: string; item: string }>();
  const pathname = usePathname(); // Hook to get the current pathname

  // Check if the current path is the homepage
  const isOnSearch = pathname === '/';
  const isOnChat = pathname === '/chat';
  const isOnInnovate = pathname === '/innovate';
  const isOnAccount = pathname === '/account';

  console.log(params);
  return (
    <>
      <div>
        <nav className="flex justify-between mx-10 my-8 text-muted-foreground">
          <ul>
            <div className="flex gap-4">
              <li className={`hover:text-foreground transition-all ${isOnSearch ? 'border rounded-lg px-1 py-0.5 border-muted-foreground border-2 -mt-1 hover:border-foreground' : ''}`}>
                <Link href="/">SEARCH</Link>
              </li>
              <li className={`hover:text-foreground transition-all ${isOnChat ? 'border rounded-lg px-1 py-0.5 border-muted-foreground border-2 -mt-1 hover:border-foreground' : ''}`}>
                <Link href="/chat">CHAT</Link>
              </li>
              <li className={`hover:text-foreground transition-all ${isOnInnovate ? 'border rounded-lg px-1 py-0.5 border-muted-foreground border-2 -mt-1 hover:border-foreground' : ''}`}>
                <Link href="/innovate">INNOVATE</Link>
              </li>
            </div>
          </ul>
          <div className={`flex gap-2 hover:text-foreground transition-all cursor-pointer ${isOnAccount ? 'border rounded-lg px-1.5 py-0.5 border-muted-foreground border-2 -mt-1 hover:border-foreground' : ''}`}>
            <Link href="/account">YOUR ACCOUNT</Link>
            <CircleUserRound className="h-6 w-6" />
          </div>
        </nav>
      </div>
    </>
  );
}
