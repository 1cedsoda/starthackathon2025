"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { AccountSwitcher } from "./AccountSwitcher";

export default function Navbar() {
  const params = useParams<{ tag: string; item: string }>();
  const pathname = usePathname(); // Hook to get the current pathname

  // Check if the current path is the homepage
  const isOnSearch = pathname === "/";
  const isOnChat = pathname === "/chat";
  const isOnInnovate = pathname === "/innovate";

  console.log(params);
  return (
    <>
      <div>
        <nav className="flex justify-between mx-10 my-8 text-muted-foreground">
          <ul>
            <div className="flex gap-4">
              <li
                className={`hover:text-foreground transition-all ${
                  isOnSearch
                    ? "border rounded-lg px-1 py-0.5 border-muted-foreground border-2 -mt-1 hover:border-foreground"
                    : ""
                }`}
              >
                <Link href="/">SEARCH</Link>
              </li>
              <li
                className={`hover:text-foreground transition-all ${
                  isOnChat
                    ? "border rounded-lg px-1 py-0.5 border-muted-foreground border-2 -mt-1 hover:border-foreground"
                    : ""
                }`}
              >
                <Link href="/chat">CHAT</Link>
              </li>
              <li
                className={`hover:text-foreground transition-all ${
                  isOnInnovate
                    ? "border rounded-lg px-1 py-0.5 border-muted-foreground border-2 -mt-1 hover:border-foreground"
                    : ""
                }`}
              >
                <Link href="/innovate">INNOVATE</Link>
              </li>
            </div>
          </ul>
          <AccountSwitcher />
        </nav>
      </div>
    </>
  );
}
