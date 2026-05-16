"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

// Input con label flottante: la label vive sopra l'input, scende al
// centro quando il campo è vuoto e non in focus, sale + rimpicciolisce
// quando il campo è in focus o ha contenuto. Pattern Material Design
// classico, reso con un singolo elemento + animazioni CSS — niente
// JS-state nel padre (lo stato `filled` deriva dal value dell'input).
//
// Drop-in replacement per shadcn <Input> + <Label>: invece di
//   <Label htmlFor="email">Email</Label><Input id="email" />
// fai
//   <FloatingInput id="email" label="Email" />
// La <Label> visiva è dentro il componente; mantieni una <Label
// htmlFor=... className="sr-only"> esterna se vuoi l'accessibility
// label esplicita per screen reader.

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const FloatingInput = forwardRef<HTMLInputElement, Props>(
  function FloatingInput({ label, className, id, onChange, ...props }, ref) {
    const [filled, setFilled] = useState(
      Boolean(props.defaultValue ?? props.value),
    );

    return (
      <div className="relative">
        <input
          ref={ref}
          id={id}
          {...props}
          onChange={(e) => {
            setFilled(e.target.value.length > 0);
            onChange?.(e);
          }}
          placeholder=" "
          className={cn(
            "peer h-12 w-full rounded-md border border-input bg-background px-3 pt-4 pb-1 text-sm",
            "transition-all duration-200 ease-out",
            "focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/10",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        />
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground",
            "transition-all duration-200 ease-out",
            // Float up + shrink when focused OR filled. Using peer-*
            // covers focus; we track `filled` via state for the "has
            // a value but blurred" case.
            "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:font-medium peer-focus:text-foreground",
            filled && "top-2 translate-y-0 text-[10px] font-medium text-foreground",
          )}
        >
          {label}
        </label>
      </div>
    );
  },
);
