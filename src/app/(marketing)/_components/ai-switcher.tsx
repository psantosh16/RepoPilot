"use client";

import { Intelligence } from "@/types/intelligence";
import { cn } from "@/utils/cn";
import { Switch } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Switcher = () => {
  const [enabled, setEnabled] = useState<Intelligence>(Intelligence.LLAMA);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("agent", enabled);
      // console.log("Switched to", enabled);
    }, 300);

    return () => clearTimeout(timeoutId);
  },[enabled]);

  return (
    <div className="flex gap-x-4 items-center justify-center">
      <h3 className={cn(enabled === Intelligence.LLAMA ? "text-black font-semibold" : "text-black/40 opacity-60", "flex items-center gap-x-2")}>
        <Image src="/icons/llama.webp"  alt="llama icon" className="w-8 md:w-12"  width={100} height={100}/>
        llama 70b
      </h3>
      <Switch
        checked={enabled === Intelligence.MISTRAL}
        onChange={() => {
          setEnabled((prev) => {
            const newValue = prev === Intelligence.LLAMA ? Intelligence.MISTRAL : Intelligence.LLAMA;
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
      <h3 className={cn(enabled === Intelligence.MISTRAL ? "text-black font-semibold" : "text-black/40 opacity-60", "flex items-center gap-x-2")}>
        Mistral s24B
      <Image src="/icons/mistral.webp"  alt="llama icon" className="w-6 md:w-8 "  width={100} height={100}/>
      </h3>
    </div>
  );
};
