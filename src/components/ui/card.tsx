import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-800/80 bg-zinc-900/60 shadow-[inset_0_1px_0_rgba(255,255,255,.035),0_28px_90px_rgba(0,0,0,.34)] backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}
