"use client";

import MoonIcon from "@/public/icons/MoonIcon";
import SunIcon from "@/public/icons/SunIcon";
import { useState, useEffect } from "react";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    let value;
    value = localStorage.getItem("theme") || "dark";
    setTheme(value);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="flex w-24 self-end dark:bg-black2 bg-beige2 py-1.5 px-3 rounded-full items-center gap-2 text-darkOrange cursor-pointer dark:text-violet"
    >
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
      {theme === "light" ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeSwitch;
