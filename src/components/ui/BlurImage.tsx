"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image, { ImageProps, StaticImageData } from "next/image";

const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: Omit<ImageProps, "src"> & { src: string | StaticImageData }) => {
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(src);

  // Update imageSrc state whenever the src prop changes
  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <Image
      className={cn("transition duration-300", className)}
      src={imageSrc}
      width={width}
      height={height}
      alt={alt || "Image"}
      onError={(e) => {
        console.error("Image failed to load:", e); // Log the error or handle as needed
      }}
      {...rest}
    />
  );
};

export default BlurImage;
