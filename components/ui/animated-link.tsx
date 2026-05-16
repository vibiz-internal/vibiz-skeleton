"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

// Link with an underline that grows from left to right on hover.
// Pure CSS via pseudo-element + transform-origin — no motion package
// needed. Drop-in replacement for next/link when you want the
// micro-interaction.

type Props = ComponentProps<typeof Link>;

export function AnimatedLink({ className, children, ...props }: Props) {
  return (
    <Link
      {...props}
      className={cn(
        "relative inline-block text-foreground font-medium",
        "after:absolute after:left-0 after:bottom-[-2px] after:h-[1.5px] after:w-full",
        "after:origin-left after:scale-x-0 after:bg-current",
        "after:transition-transform after:duration-300 after:ease-out",
        "hover:after:scale-x-100",
        className,
      )}
    >
      {children}
    </Link>
  );
}
