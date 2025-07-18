import Image from "next/image";
import Link from "next/link";
import { Bed, Bath } from "lucide-react";
import MiniImageCarousel from "@/components/ui/MiniImageCarousel";

// Helper to format price with a single dollar sign
export function formatPrice(price) {
  if (!price) return "N/A";
  if (typeof price === "string") {
    return price.trim().startsWith("$") ? price : `$${price}`;
  }
  return `$${price}`;
}

export default function PropertyCard({
  id,
  image,
  images,
  location,
  price,
  beds,
  baths,
  sqft,
  detailsLink,
  actions,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {Array.isArray(images) && images.length > 0 ? (
        <MiniImageCarousel
          images={images}
          alt={location}
          width={400}
          height={300}
        />
      ) : (
        <Image
          src={image || "/placeholder.svg"}
          alt={location}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{location}</h3>
        <p className="text-2xl font-bold text-blue-600 mb-2">
          {formatPrice(price)}
        </p>
        <div className="flex items-center text-sm text-gray-600 space-x-4">
          <span className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            {beds} Beds
          </span>
          <span className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {baths} Baths
          </span>
          <span>{sqft}</span>
        </div>
        {actions ? (
          <div className="w-full mt-4 flex gap-2">{actions}</div>
        ) : (
          <Link href={detailsLink || `/property/${id}`} passHref legacyBehavior>
            <a className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors block text-center">
              View Details
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
