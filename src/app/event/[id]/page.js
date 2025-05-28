import Header from "@/components/(header)/Header";
import SingleCard from "@/components/(event)/SingleCard";
import EventArtClient from "@/components/(event)/EventArtClient";
import { getArtDetails } from "@/api/smk";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import Link from "next/link";

const EventSingleView = async ({ params }) => {
  //Denne første del burde vi overveje at flytte til API-side (localhost.js) – meeeen vi kan ikke lige finde ud af hvordan
  const { id } = await params;

  const res = await fetch(`http://localhost:8080/events/${id}`); //https://smk-4l23.onrender.com/events/${id}
  const eventData = await res.json();

  // Hent kunstværkerne fra SMK API (eller specifikke værker baseret på IDs)
  const artworkIds = eventData.artworkIds || [];

  // Hent kun de værker, der matcher de ønskede artworkIds
  const artFetches = artworkIds.map((id) => getArtDetails(id));
  const arts = await Promise.all(artFetches); //Promise.all kører alle API-kald parallelt og returnerer, når alle er færdige.

  return (
    <div className="flex flex-col gap-6">
      <Header></Header>

      <div className="mb-[var(--space-m)] px-4 md:px-8">
        <Link href="/events" className="flex items-center gap-2 text-[#C4FF00] font-semibold hover:underline cursor-pointer">
          <HiOutlineArrowLongLeft className="text-xl" />
          <span>Tilbage</span>
        </Link>
      </div>

      <SingleCard eventData={eventData}></SingleCard>

      <section>
        <h3 className="font-ligth">Oplev disse værker til eventet</h3>
        <div>
          {/* Send de hentede kunstværker til EventArtClient */}
          <EventArtClient artworkIds={artworkIds} arts={arts} />
        </div>
      </section>
    </div>
  );
};

export default EventSingleView;
