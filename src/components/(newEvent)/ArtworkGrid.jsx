"use client"

import ArtworkCard from "./ArtworkCard";
import { useState } from "react";

export default function ArtworkGrid({ artworks, selectedArtworks, toggleArtwork, location }) {
  if (!artworks.length) {
    return <p className="text-center text-gray-500">Ingen værker fundet i den valgte periode.</p>;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12; //Antal værker pr. side
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArtworks = artworks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(artworks.length / ITEMS_PER_PAGE); //Regner antal sider i alt

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-space-s">
        {currentArtworks.map((artwork) => (
          <ArtworkCard key={artwork.object_number} artwork={artwork} selected={selectedArtworks} onClick={() => toggleArtwork(artwork.object_number)} disableSelect={selectedArtworks.length >= location.maxArtworks}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className={`p-4 disabled:opacity-50 ${currentPage !== 1 ? "cursor-pointer" : "cursor-default"}`}>
          {`<`}
        </button>

        <span className="flex items-center">
          Side {currentPage} af {totalPages}
        </span>

        <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className={`p-4 disabled:opacity-50 ${currentPage !== totalPages ? "cursor-pointer" : "cursor-default"}`}>
          {`>`}
        </button>
      </div>
    </div>
  );
}
