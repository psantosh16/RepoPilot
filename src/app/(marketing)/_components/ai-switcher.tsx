"use client";

import { Intelligence } from "@/types/intelligence";
import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";

export const Switcher = () => {
  const [enabled, setEnabled] = useState<Intelligence>(Intelligence.DEEPSEEK);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("agent", enabled);
      // console.log("Switched to", enabled);
    }, 300);

    return () => clearTimeout(timeoutId);
  },[enabled]);

  return (
    <div className="flex gap-x-4 items-center justify-center">
      <h3 className={enabled === Intelligence.DEEPSEEK ? "text-black font-semibold" : "text-black/40"}>
        DeepSeek R1
      </h3>
      <Switch
        checked={enabled === Intelligence.MISTRAL}
        onChange={() => {
          setEnabled((prev) => {
            const newValue = prev === Intelligence.DEEPSEEK ? Intelligence.MISTRAL : Intelligence.DEEPSEEK;
            return newValue;
          });
        }}
        className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-black/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-black data-[checked]:bg-black"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block h-5 w-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
        />
      </Switch>
      <h3 className={enabled === Intelligence.MISTRAL ? "text-black font-semibold" : "text-black/40"}>
        Mistral s24B
      </h3>
    </div>
  );
};
