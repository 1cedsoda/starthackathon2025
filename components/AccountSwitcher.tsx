import Image from "next/image";

export function AccountSwitcher() {
  const toggleUser = () => {
    const username = window.localStorage.getItem("username");
    if (username === "Bob") {
      window.localStorage.setItem("username", "Alice");
    } else {
      window.localStorage.setItem("username", "Bob");
    }
    window.location.reload();
  };

  const username = window.localStorage.getItem("username");

  return (
    <div className="flex gap-2 hover:text-foreground transition-all cursor-pointer">
      <button onClick={toggleUser}>Hallo, @{username}</button>
      <Image src="/crystal.png" alt="avatar" width={32} height={32} />
    </div>
  );
}
