import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <Link href={"/"}>
      <Image
        src={`/ygy-logo-${currentTheme}.jpeg`}
        alt=""
        className="object-fill"
        width={30}
        height={30}
      />
    </Link>
  );
}

export default Logo;
