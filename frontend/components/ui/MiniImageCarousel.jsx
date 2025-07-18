"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MiniImageCarousel({
  images = [],
  alt = "Property",
  width = 60,
  height = 40,
  interval = 2500,
}) {
  // Filter out any falsy or empty image URLs
  const validImages = Array.isArray(images)
    ? images.filter(
        (src) => !!src && typeof src === "string" && src !== "/placeholder.svg"
      )
    : [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!validImages || validImages.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % validImages.length);
    }, interval);
    return () => clearInterval(timer);
  }, [validImages, interval]);

  // Only use placeholder if there are truly no valid images
  const src =
    validImages && validImages.length > 0
      ? validImages[index]
      : "/placeholder.svg";

  return (
    <div style={{ width, height, position: "relative" }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded object-cover border"
        style={{ width: "100%", height: "100%" }}
      />
      {validImages && validImages.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: 2,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 2,
          }}
        >
          {validImages.map((_, i) => (
            <span
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: i === index ? "#3b82f6" : "#d1d5db",
                display: "inline-block",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
