"use client";

import Image from "next/image";
import Header from "@/components/(header)/Header";
import StatuePic from "@/images/statuePic.png";
import { FaTicketAlt } from "react-icons/fa";
import Price from "@/components/(basket)/Price";
import useCartStore from "@/app/store/cartStore";
import ButtonSecondary from "@/components/ButtonSecondary";
import Popup from "@/components/Popup";
import { updateTickets } from "@/api/events";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Basket = () => {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const handleBuyClick = async () => {
    if (items.length === 0) {
      setPopupMessage("Du har ikke valgt nogen billetter!");
      return;
    }

    if (!name || !email || !address) {
      setPopupMessage("Udfyld venligst navn, e-mail og adresse.");
      return;
    }

    try {
      for (const item of items) {
        const qty = Number(item.quantity) || 0;
        await updateTickets({
          id: item.eventId,
          tickets: qty,
        });
      }

      const totalTickets = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

      const receiptData = {
        items,
        totalTickets: totalTickets,
        name,
        email,
        address,
        timestamp: new Date().toISOString(),
      };

      // Gem kvittering
      sessionStorage.setItem("receipt", JSON.stringify(receiptData));

      // Ryd kurv efter kvittering er gemt
      if (typeof clearCart === "function") {
        clearCart();
      }

      // Gå til kvitteringsside
      router.push("/receipt");
    } catch (error) {
      alert("Der skete en fejl under købet. Prøv igen.");
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* MOBIL: baggrundsbillede */}
      <div className="absolute inset-0 md:hidden z-0">
        <Image src={StatuePic} alt="Statue" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-white opacity-70" />
      </div>

      <div className="relative z-10">
        <Header />

        {/* Wrapper i main for layout – fordi main styres af global.css */}
        <main className="py-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* VENSTRE kolonne – billede (kun på md+) */}
            <div className="hidden md:block">
              <Image src={StatuePic} alt="Statue billede" width={600} height={800} className="w-full h-full object-cover" />
            </div>

            {/* HØJRE kolonne – tekst og funktionalitet */}
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-2xl sm:text-3xl font-semibold">Eventbilletter</h1>

              <p className="text-sm sm:text-base font-light text-left max-w-xl">Du modtager eventbilletten med det samme efter bestilling på din e-mail. (Modtager du ikke en mail indenfor 5 minutter, så tjek dit SPAM-filter). Børn under 18 år kommer gratis ind til events.</p>

              <div className="h-1 bg-[#C4FF00] w-full my-6 sm:my-10" />

              <div className="flex items-center gap-4">
                <FaTicketAlt className="text-[#C4FF00] text-4xl sm:text-5xl" />
                <h2 className="text-lg sm:text-xl font-light">Billetter</h2>
              </div>

              {items.length === 0 ? <p className="text-gray-600">Du har ikke valgt nogle billetter...</p> : <Price />}

              <div className="space-y-3 mt-6">
                <h4 className="font-bold">Dine informationer</h4>
                <label className="text-sm font-medium">Navn</label>
                <input type="text" placeholder="Navn" className="w-full border px-3 py-2 " value={name} onChange={(e) => setName(e.target.value)} required />

                <label className="text-sm font-medium">E-mail</label>
                <input type="email" placeholder="E-mail" className="w-full border px-3 py-2 " value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label className="text-sm font-medium">Adresse</label>
                <input type="text" placeholder="Adresse" className="w-full border px-3 py-2 " value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>

              <div className="pt-6 ml-auto">
                <ButtonSecondary onClick={handleBuyClick}>Køb billetter</ButtonSecondary>
              </div>
            </div>
          </div>
        </main>
        {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage("")} />}
      </div>
    </div>
  );
};

export default Basket;
