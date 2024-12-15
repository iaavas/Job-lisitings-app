import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobBoard",
  description: "Find your next great job",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} pt-[var(--navbar-height)] min-h-screen`}
        style={
          {
            "--navbar-height": "4rem",
          } as React.CSSProperties
        }
      >
        <Navbar />
        <main className="container mx-auto px-4 py-3">{children}</main>
      </body>
    </html>
  );
}
