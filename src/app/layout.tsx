import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Sidebar from "@/components/layout/sidebar/sidebarMain/SidebarMain";
import ChooseTrack from "@/components/layout/chooseTrack/ChooseTrack";
import { QueryClientProvider } from "@tanstack/react-query";
import { ProviderQueryClient } from "@/providers/ProviderQueryClient";
import ClientUserLoader from "@/components/layout/clientUserLayout/ClientUserLayout";

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
        <ProviderQueryClient>
          <ClientUserLoader />
          {children}
        </ProviderQueryClient>
      </body>
    </html>
  );
}
