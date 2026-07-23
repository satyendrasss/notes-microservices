"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme",nextDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        flex w-full items-center gap-3 rounded-lg
        px-2 py-2 text-sm font-medium
        text-zinc-700 transition
        hover:bg-zinc-200
        dark:text-zinc-300
        dark:hover:bg-zinc-800
      "
    >
      {dark ? (
        <Sun size={17} />
      ) : (
        <Moon size={17} />
      )}

      <span>
        {dark ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}