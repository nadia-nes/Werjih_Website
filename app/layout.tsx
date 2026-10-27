import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans_Ethiopic,
  Cormorant_Garamond,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Navbar from "@/components/Navbar";
import ScrollThumb from "@/components/ScrollToTop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ethiopic = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "The Werjih Society",
    description: "Ancient Heritage & Legacy",
    // Prevents mobile auto-translate engines from interfering with next-intl
    other: {
      google: "notranslate",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0c0a09",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      translate="no"
      className={`${geistSans.variable} ${geistMono.variable} ${ethiopic.variable} ${cormorant.variable} notranslate h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0c0a09] text-white notranslate">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <ScrollThumb />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}