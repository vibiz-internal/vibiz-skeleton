"use client";

import * as React from "react";
import Link from "next/link";
import { LayoutDashboard, LogOut, Menu, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

type Props = {
  user: { id: string; email?: string | null } | null;
  signOutAction?: () => Promise<void>;
};

export function SiteHeader({ user, signOutAction }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-foreground flex size-6 items-center justify-center rounded-md">
            <Sparkles className="text-background size-3.5" />
          </div>
          <span className="font-semibold">Acme</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-6 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="size-9 rounded-full p-0 font-medium"
                >
                  {(user.email ?? "?").slice(0, 1).toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium">Signed in as</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user.email ?? user.id}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {signOutAction && (
                  <form action={signOutAction}>
                    <button
                      type="submit"
                      className="hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none [&_svg]:size-4"
                    >
                      <LogOut /> Sign out
                    </button>
                  </form>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                {!user && (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors sm:hidden"
                  >
                    Sign in
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
