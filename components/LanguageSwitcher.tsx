import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_Ethiopic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Navbar from "@/components/Navbar";
import ScrollThumb from "@/components/ScrollToTop";
import "./globals.css";

// FORCE DYNAMIC: Prevents Vercel from caching static HTML at the edge,
// ensuring the server reads the NEXT_LOCALE cookie fresh on every request.
export const dynamic = 'force-dynamic';

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

export const metadata: Metadata = {
  title: "The Werjih Society",
  description: "Ancient Heritage & Legacy",
};

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
      className={`${geistSans.variable} ${geistMono.variable} ${ethiopic.variable} h-full antialiased`}
    >
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0c0a09] text-white">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <ScrollThumb />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}