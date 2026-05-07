"use client";

import { useState } from "react";
import { ImageLightbox } from "@/components/shared/image-lightbox";

export function TaskImageGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images.length) return null;

  const heroImage = images[selectedImage];
  const thumbnails = images;

  return (
    <div className="space-y-4">
      {/* Hero Image - Zoomed/Large */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-muted">
        <div className="relative aspect-[4/3] w-full">
          <ImageLightbox
            src={heroImage}
            alt={`Gallery image ${selectedImage + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            imageClassName="object-cover"
            intrinsicWidth={1440}
            intrinsicHeight={1080}
            priority
          />
        </div>
      </div>

      {/* Thumbnail Gallery - Small */}
      {thumbnails.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {thumbnails.map((src, index) => (
            <button
              key={`${src}-${index}`}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === index
                  ? "border-primary scale-105"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <ImageLightbox
                src={src}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 100px"
                imageClassName="object-cover"
                intrinsicWidth={1440}
                intrinsicHeight={1080}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
