import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, first, accent, description }: { eyebrow: string; first: string; accent: string; description: ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="eyebrow"><span className="h-px w-7 bg-rose-500" />{eyebrow}</p>
        <h2 className="mt-5 text-[clamp(2rem,4.4vw,4.15rem)] leading-[1.28] font-extrabold tracking-tight text-white">{first}<br /><span className="text-zinc-500">{accent}</span></h2>
      </div>
      <p className="max-w-sm text-[13px] leading-8 text-zinc-400 md:pb-2">{description}</p>
    </div>
  );
}
