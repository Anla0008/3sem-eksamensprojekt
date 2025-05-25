"use client";

// Importer komponenter og funktioner vi skal bruge
import ListeCardClient from "@/components/(events)/ListeCardClient"; // Viser events som kort
import Header from "@/components/(header)/Header";
import { useEffect, useState } from "react"; // React hooks til state og sideeffekter
import { getEvents, getLocations } from "@/api/localhost"; // Funktioner til at hente data fra API
import LocationDropdown from "@/components/(events)/DropdownLocation"; // Dropdown-menu til valg af by
import SortingDropdown from "@/components/(events)/DropDownSorter"; // Dropdown til sortering (ikke ændret her)

// En liste over forkortelser, så forskellige navne på samme by kan genkendes
const cityForkortelse = {
  København: ["københavn", "kbh"],
  Århus: ["århus", "aarhus"],
  Odense: ["odense"],
  Køge: ["køge"],
};

export default function ListeView() {
  // State til at gemme events, lokationer og valgt by
  const [events, setEvents] = useState([]); // Alle events hentet fra API
  const [locations, setLocations] = useState([]); // Alle lokationer hentet fra API
  const [selectedCity, setSelectedCity] = useState(null); // Den by(city) brugeren vælger i dropdown
  const [sortOrder, setSortOrder] = useState(null);

  // useEffect kører kun én gang, når komponenten loader
  // Her henter vi både events og lokationer fra API og gemmer i state
  useEffect(() => {
    const fetchData = async () => {
      const [eventsData, locationsData] = await Promise.all([getEvents(), getLocations()]);
      setEvents(eventsData); //gemmer events
      setLocations(locationsData); //gemmer locations
    };
    fetchData(); // Kald funktionen
  }, []);

  // Find location for event
  // Hjælpefunktion: Find en lokation ud fra et locationId (fra event)
  const getLocationById = (id) => locations.find((loc) => loc.id === id);

  // Filtrerer events baseret på valgt by i dropdown
  // Hvis ingen by er valgt, vises alle events
  // Hvis en by er valgt, tjekker vi om eventets lokation matcher byen via adresse
  const filteredEvents = events.filter((event) => {
    if (!selectedCity) return true; // Ingen filter - vis alle
    const location = getLocationById(event.locationId); // Find lokationen til eventet
    if (!location) return false; // Hvis lokation ikke findes, skjul event
    const forkortelse = cityForkortelse[selectedCity] || [selectedCity.toLowerCase()]; // Find forkortelse for by
    // Tjek om lokationsadressen indeholder et af forkortelse (case-insensitive)
    return forkortelse.some((forkortelse) => location.address.toLowerCase().includes(forkortelse));
  });

  //Vi sortere nu bogsternverne alfabetisk fra a-å.
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOrder === "alphabetical") {
      return a.title.localeCompare(b.title, "da");
    }
    return 0;
  });

  return (
    <div>
      <Header variant="black" />
      <div className="flex justify-end space-x-4">
        {/* Dropdown menu til at vælge by, sender valgt by op via onSelectCity */}
        <LocationDropdown onSelectCity={setSelectedCity} />
        {/* Dropdown til at sortere events */}
        <SortingDropdown onSortChange={setSortOrder} />
      </div>

      {/* Vis events som kort - kun de filtrerede events */}
      <ListeCardClient events={sortedEvents} />
    </div>
  );
}
