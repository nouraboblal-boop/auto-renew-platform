import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/#top" aria-label="Auto Renew — العودة إلى الرئيسية" className="inline-flex items-center gap-3 shrink-0" dir="ltr">
      <span aria-hidden="true" className={`${compact ? "size-10 text-sm" : "size-11 text-base"} grid place-items-center relative border border-rose-500/80 text-white font-black tracking-tighter leading-none -skew-x-6`}>AR<span className="absolute -bottom-1 -right-1 size-2 bg-rose-500" /></span>
      <span className="flex flex-col gap-1 text-left uppercase leading-none"><strong className="font-display tracking-[0.17em] text-white text-[13px] sm:text-[15px]">AUTO RENEW</strong><small className="text-[8px] tracking-[0.24em] text-zinc-500">AUTOMOTIVE STUDIO</small></span>
    </Link>
  );
}
