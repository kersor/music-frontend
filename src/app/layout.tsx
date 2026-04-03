import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./styles/globals.css";
import Sidebar from "@/components/layout/sidebar/sidebarMain/SidebarMain";
import ChooseTrack from "@/components/layout/chooseTrack/ChooseTrack";
import { QueryClientProvider } from "@tanstack/react-query";
import { ProviderQueryClient } from "@/providers/ProviderQueryClient";
import ClientUserLoader from "@/components/layout/clientUserLayout/ClientUserLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/store/useTheme";
import ThemeProvider from "@/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

const outfit = Outfit({subsets:['latin'],variable:'--font-sans'});

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const inter = Inter({
  subsets: ['cyrillic']
})

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
    <html lang="en" className={cn( jetbrainsMono.variable, "font-sans", outfit.variable, )}>
      <body className={`${inter.className} antialiased min-h-screen` }>
        <ProviderQueryClient>
          <ThemeProvider>
            <SidebarProvider>
              <ClientUserLoader />
              {children}
            </SidebarProvider>
          </ThemeProvider>
        </ProviderQueryClient>
      </body>
    </html>
  );
}
