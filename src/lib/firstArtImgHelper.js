import artPlaceholder from "@/images/artPlaceholder.png";
import { getArtDetails } from "@/api/smk";

export const isValidUrl = (url) => typeof url === "string" && url.startsWith("http") && url.length > 30 && !url.includes("/thumbnail/PD");

export function resolveImageUrl(thumbnail) {
  return typeof thumbnail === "object" && thumbnail?.src ? thumbnail.src : thumbnail;
}

export async function firstArtImgHelper(artworkIds) {
  if (!artworkIds?.length) return artPlaceholder.src || artPlaceholder;

  const firstArtworkId = artworkIds[0];
  if (!firstArtworkId) return artPlaceholder.src || artPlaceholder;

  const art = await getArtDetails(firstArtworkId);
  if (isValidUrl(art?.image_thumbnail)) {
    return resolveImageUrl(art.image_thumbnail);
  }

  return artPlaceholder.src || artPlaceholder;
}
