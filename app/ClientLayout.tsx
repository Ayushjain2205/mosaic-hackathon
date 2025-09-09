"use client";

import type React from "react";
import "./globals.css";
import { Nunito, Quicksand, Cedarville_Cursive } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/custom/Navbar";

// Font setup
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const cederville = Cedarville_Cursive({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-cederville",
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style jsx global>{`
          :root {
            --font-quicksand: ${quicksand.style.fontFamily};
            --font-nunito: ${nunito.style.fontFamily};
            --font-cederville: ${cederville.style.fontFamily};
          }
        `}</style>
      </head>
      <body
        className={`${quicksand.variable} ${nunito.variable} ${cederville.variable} font-sans bg-background`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <div className="pt-2">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
