import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Malone’s Pub | Downtown Fort Worth",
  description:
    "Malone’s Pub is a locally owned Irish pub and neighborhood dive bar in Downtown Fort Worth near Sundance Square. Cold drinks, Guinness on draft, craft beer, wine, and bar bites.",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  name: "Malone’s Pub",
  url: "https://malonespub.com",
  telephone: "(817) 332-5330",
  priceRange: "$$",
  servesCuisine: ["Irish Pub", "Bar Food", "Beer", "Wine"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "1303 Calhoun Street",
    addressLocality: "Fort Worth",
    addressRegion: "TX",
    postalCode: "76102",
    addressCountry: "US",
  },
  menu: "https://malonespub.com/menu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        <Script
          id="malones-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(structuredData)}
        </Script>

        <Nav />
        <main className="pb-24 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}

