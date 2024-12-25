"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image, { ImageProps, StaticImageData } from "next/image";

// Fallback image URL - replace with your actual fallback image
import FallbackImage from "../../../public/assets/fallbackImage/fallbackimage.png"
const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: Omit<ImageProps, "src"> & { src?: string | StaticImageData }) => {
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(src || FallbackImage);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (src) {
      setImageSrc(src);
      setError(false);
    } else {
      setImageSrc(FallbackImage);
    }
  }, [src]);

  const handleImageError = () => {
    console.error("Image failed to load:", src);
    setImageSrc(FallbackImage);
    setError(true);
  };

  return (
    <Image
      className={cn("transition duration-300", error ? "opacity-50" : "", className)}
      src={imageSrc}
      width={width}
      height={height}
      alt={alt || "Image"}
      onError={handleImageError}
      {...rest}
    />
  );
};

export default BlurImage;

