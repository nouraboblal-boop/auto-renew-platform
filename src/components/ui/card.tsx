import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,.065),rgba(255,255,255,.018))] shadow-[0_24px_80px_rgba(0,0,0,.28)] backdrop-blur-2xl",
        className
      )}
      {...props}
    />
  );
}
