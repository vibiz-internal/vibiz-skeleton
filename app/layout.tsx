import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { VibizEditorOverlay } from "./_vibiz/EditorOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo Atleti",
  description:
    "Web app di task management pensata per atleti individuali, con focus su allenamento, recupero, nutrizione e priorita' di oggi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#040706] text-white">
        {children}
        <VibizEditorOverlay />
      </body>
    </html>
  );
}
