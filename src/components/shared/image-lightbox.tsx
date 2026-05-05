"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ContentImage } from "@/components/shared/content-image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ImageLightboxProps = {
  src: string;
  alt: string;
  triggerClassName?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  intrinsicWidth?: number;
  intrinsicHeight?: number;
};

export function ImageLightbox({
  src,
  alt,
  triggerClassName,
  imageClassName,
  sizes,
  priority,
  fill,
  intrinsicWidth,
  intrinsicHeight,
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative block h-full w-full cursor-zoom-in overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          triggerClassName
        )}
        aria-label={`Open image: ${alt}`}
      >
        <ContentImage
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          priority={priority}
          className={cn("transition duration-500 group-hover:scale-[1.02]", imageClassName)}
          intrinsicWidth={intrinsicWidth}
          intrinsicHeight={intrinsicHeight}
        />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-6xl border-0 bg-black/95 p-0 shadow-none"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20"
            aria-label="Close image popup"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative max-h-[88vh] min-h-[40vh] w-full">
            <ContentImage
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
              intrinsicWidth={intrinsicWidth ?? 1600}
              intrinsicHeight={intrinsicHeight ?? 1200}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
