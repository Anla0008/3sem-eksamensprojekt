"use client";
import Image from "next/image";
import { SignIn, useUser } from "@clerk/nextjs";
import logoLime from "@/logos/smk_logo_lime.png";
import logoBlack from "@/logos/smk_logo_sort.png";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Header = ({ variant = "lime" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  // Farve-logik
  const isLime = variant === "lime";
  const textColor = isLime ? "text-[#C4FF00]" : "text-black";
  const lineColor = isLime ? "bg-[#C4FF00]" : "bg-black";

  const signInRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (signInRef.current && !signInRef.current.contains(event.target)) {
        setShowSignIn(false);
      }
    };

    if (showSignIn) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSignIn]);

  return (
    <nav className="mb-4 relative z-50 flex sm:flex-row items-center justify-between mt-space-m px-4">
      {/* Logo */}
      <Link href="/">
        <Image src={isLime ? logoLime : logoBlack} width={200} height={200} alt="SMK logo" />
      </Link>

      {/* Desktop menu */}
      <DesktopMenu user={user} pathname={pathname} router={router} textColor={textColor} setShowSignIn={setShowSignIn} variant={variant} />

      {/* Burger menu */}
      <div className="relative sm:hidden">
        <button className="flex flex-col justify-between w-8 h-6 sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          <span className={`h-0.75 w-full ${lineColor} transition-transform duration-200 ease-linear ${isOpen ? "rotate-45 translate-y-2.5" : ""}`} />
          <span className={`h-0.75 w-full ${lineColor} transition-opacity duration-100 ease-linear ${isOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`h-0.75 w-full ${lineColor} transition-transform duration-200 ease-linear ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </button>

        <MobileMenu
          isOpen={isOpen}
          user={user}
          setIsOpen={setIsOpen}
          textColor={textColor}
          setShowSignIn={setShowSignIn}
          variant={variant} // ✅ Tilføjet
        />
      </div>

      {/* Login popup */}
      {showSignIn && (
        <div ref={signInRef} className="absolute top-full right-4 mt-4 bg-white shadow-lg border border-gray-200 z-50 p-4 rounded-xl">
          <SignIn routing="hash" />
        </div>
      )}
    </nav>
  );
};

export default Header;
