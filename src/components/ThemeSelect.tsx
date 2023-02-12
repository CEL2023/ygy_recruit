import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

function ThemeSelect() {
  const { setTheme, systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <button onClick={() => setTheme(currentTheme == "dark" ? "light" : "dark")}>
      <Image
        width={28}
        height={28}
        className="rounded-full"
        src={currentTheme == "light" ? "/light-mode.svg" : "dark-mode.svg"}
        alt=""
      />
    </button>
  );
}

export default ThemeSelect;
