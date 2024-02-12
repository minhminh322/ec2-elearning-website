"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

type LogoProps = "default" | "full_brand";
export const Logo = ({ logoType, size }: { logoType: LogoProps, size: number }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (size === undefined) size = 100;
  let default_src, full_brand_src;
  switch (resolvedTheme) {
    case "light":
      default_src = "/EC2_Logo_Light.png";
      full_brand_src = "/EC2_Full_Brand_Light.png";
      break;
    case "dark":
      default_src = "/EC2_Logo_Dark.png";
      full_brand_src = "/EC2_Full_Brand_Dark.png";
      break;
    default:
      default_src = "/EC2_Logo_Dark.png";
      full_brand_src = "/EC2_Full_Brand_Light.png";
      break;
  }
  return (
    <>
      {logoType === "default" ? (
        <Image src={default_src} alt="Logo" width={size} height={size} />
      ) : (
        <Image src={full_brand_src} alt="Logo" width={size} height={size} />
      )}
    </>
  );
};
