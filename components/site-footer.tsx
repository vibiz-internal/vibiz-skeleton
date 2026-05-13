import Link from "next/link";
import { Github, Sparkles, Twitter } from "lucide-react";

const FOOTER_COLS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
      { href: "#", label: "Cookies" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-foreground flex size-6 items-center justify-center rounded-md">
              <Sparkles className="text-background size-3.5" />
            </div>
            <span className="font-semibold">Acme</span>
          </Link>
          <p className="text-muted-foreground max-w-xs text-sm">
            Replace this tagline with what your product actually does.
          </p>
          <div className="flex gap-3">
            <Link
              href="#"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="size-4" />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="size-4" />
            </Link>
          </div>
        </div>

        {FOOTER_COLS.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <p className="text-sm font-medium">{col.title}</p>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t">
        <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Acme, Inc. All rights reserved.</p>
          <p>Built with Next.js, Tailwind, and shadcn/ui.</p>
        </div>
      </div>
    </footer>
  );
}
