import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

function ThemeSelect() {
  const { setTheme, systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <button onClick={() => setTheme(currentTheme == "dark" ? "light" : "dark")}>
      {currentTheme == "dark" ? (
        <Image
          width={24}
          height={24}
          className="rounded-full"
          src={"/dark-mode.svg"}
          alt=""
        />
      ) : (
        <Image
          width={24}
          height={24}
          className="rounded-full"
          src={"/light-mode.svg"}
          alt=""
        />
      )}
    </button>
  );
}

export default ThemeSelect;
