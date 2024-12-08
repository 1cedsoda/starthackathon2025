import Image from "next/image";

export function AccountSwitcher() {
  const toggleUser = () => {
    const username = window.localStorage.getItem("username");
    if (username === "Marcus") {
      window.localStorage.setItem("username", "Carol");
    } else {
      window.localStorage.setItem("username", "Marcus");
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
