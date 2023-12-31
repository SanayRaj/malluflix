"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function BlurImage({
  src,
  alt,
  className,
  ...props
}: ImageProps) {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      className={cn(
        // @ts-ignore
        className,
        "group-hover:opacity-75 duration-700 ease-in-out animate-loading",
        isLoading
          ? "grayscale blur-2xl scale-110"
          : "grayscale-0 blur-0 scale-100"
      )}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}
