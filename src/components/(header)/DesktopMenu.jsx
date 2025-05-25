import Link from "next/link";
import BasketIcon from "./BasketIcon";
import { UserButton } from "@clerk/nextjs";

const DesktopMenu = ({ user, pathname, router, textColor, setShowSignIn, variant }) => (
  <div className="hidden sm:flex gap-space-l items-center place-self-end">
    {!user ? (
      <Link href="/events" className={`desktop_header_font_size hover:underline hover:underline-offset-10 hover:decoration-3 ${textColor} ${pathname === "/events" ? "underline underline-offset-10 decoration-3" : ""}`} onClick={() => router.push("/events")}>
        Events
      </Link>
    ) : (
      <Link href="/dashboard" className={`desktop_header_font_size hover:underline hover:underline-offset-10 hover:decoration-3 ${textColor} ${pathname === "/dashboard" ? "underline underline-offset-10 decoration-3" : ""}`} onClick={() => router.push("/dashboard")}>
        Dashboard
      </Link>
    )}

    {!user && (
      <button onClick={() => setShowSignIn(true)} className={`desktop_header_font_size hover:cursor-pointer hover:underline hover:underline-offset-10 hover:decoration-3 ${textColor}`}>
        Log ind
      </button>
    )}

    <Link href="/basket">
      <BasketIcon variant={variant} />
    </Link>

    <UserButton showName />
  </div>
);

export default DesktopMenu;
