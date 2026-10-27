import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-[transform,background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090A0F] disabled:pointer-events-none disabled:opacity-45 active:scale-[0.985]",
  {
    variants: {
      variant: {
        default:
          "bg-cyan-300 text-[#061014] shadow-[0_0_32px_rgba(0,240,255,.2)] hover:bg-cyan-200 hover:shadow-[0_0_46px_rgba(0,240,255,.34)]",
        danger:
          "bg-[linear-gradient(135deg,#FF0055,#E11D48)] text-white shadow-[0_0_34px_rgba(255,0,85,.25)] hover:shadow-[0_0_52px_rgba(255,0,85,.42)] hover:brightness-110 focus-visible:ring-rose-400/80",
        outline:
          "border border-white/14 bg-white/[0.035] text-white backdrop-blur-xl hover:border-cyan-300/45 hover:bg-cyan-300/[0.08] hover:text-cyan-100",
        ghost: "text-zinc-300 hover:bg-white/[0.06] hover:text-white"
      },
      size: {
        default: "h-12 px-5",
        sm: "h-10 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-2xl px-7 text-sm"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { buttonVariants };
