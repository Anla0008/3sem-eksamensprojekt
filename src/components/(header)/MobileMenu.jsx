import Link from "next/link";
import BasketIcon from "./BasketIcon";
import { useRouter } from "next/navigation";

const MobileMenu = ({ isOpen, user, setIsOpen, textColor, setShowSignIn, variant = "lime" }) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 bg-[#bab0bc] flex flex-col gap-4 z-10 py-4 px-10 items-center ">
      {!user && (
        <Link
          href="/events"
          className={`mobile_header_font_size ${textColor}`}
          onClick={() => {
            setIsOpen(false);
            router.push("/events");
          }}
        >
          Events
        </Link>
      )}

      {user && (
        <Link
          href="/dashboard"
          className={`mobile_header_font_size ${textColor}`}
          onClick={() => {
            setIsOpen(false);
            router.push("/dashboard");
          }}
        >
          Dashboard
        </Link>
      )}

      {!user && (
        <button
          className={`mobile_header_font_size ${textColor}`}
          onClick={() => {
            setShowSignIn(true);
            setIsOpen(false);
          }}
        >
          Log ind
        </button>
      )}

      <Link href="/basket">
        <BasketIcon variant={variant} />
      </Link>
    </div>
  );
};

export default MobileMenu;
