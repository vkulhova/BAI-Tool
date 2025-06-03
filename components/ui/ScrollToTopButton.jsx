import React from "react";
import ArrowUp from "@/public/icons/ArrowUp";

const ScrollToTopButton = () => {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
      className="cursor-pointer p-1 fixed bottom-10 right-10 rounded-full group transition-all duration-200 hover:scale-120 hover:bg-white bg-orange-500 border-2 border-orange-500 dark:border-violet dark:bg-violet"
    >
      <ArrowUp
        className={
          "group-hover:fill-orange-500 dark:group-hover:fill-violet fill-white"
        }
      />
    </button>
  );
};

export default ScrollToTopButton;
