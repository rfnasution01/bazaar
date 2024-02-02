import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./layouts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bazaar",
  description:
    "Selamat datang di Bazaar - Platform Terbaik untuk Monitoring Koin Crypto Favoritmu!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-[90vh] mt-4">{children}</main>
      </body>
    </html>
  );
}
