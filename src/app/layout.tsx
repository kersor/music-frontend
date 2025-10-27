import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import ChooseTrack from "@/components/layout/chooseTrack/ChooseTrack";

const inter = Inter()

export const metadata: Metadata = {
  title: "Svolochyo Музыка - собираем качественную музыку",
  description: "Svolochyo Музыка - собираем качественную музыку",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
