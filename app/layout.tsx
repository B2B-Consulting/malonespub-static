import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

const SITE_URL = "https://malonespub.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Malone's Pub | Irish Pub & Dive Bar in Downtown Fort Worth",
    template: "%s | Malone's Pub Fort Worth",
  },
  description:
    "Malone's Pub is Downtown Fort Worth's longest-running Irish pub and neighborhood dive bar. Cold drinks, Guinness, pool, darts, Golden Tee, pinball, bar food, and a laid-back local crowd near Sundance Square.",
  keywords: [
    "Malone's Pub",
    "Malone's Pub Fort Worth",
    "Irish pub Fort Worth",
    "Irish pub downtown Fort Worth",
    "dive bar Fort Worth",
    "dive bar downtown Fort Worth",
    "downtown Fort Worth bar",
    "Fort Worth pub",
    "bar near Sundance Square",
    "bar near me Fort Worth",
    "pub near me Fort Worth",
    "late night bar Fort Worth",
    "pool bar Fort Worth",
    "darts bar Fort Worth",
    "Golden Tee Fort Worth",
    "pinball bar Fort Worth",
    "Guinness Fort Worth",
    "bar food Fort Worth",
    "World Cup bar Fort Worth",
    "watch World Cup Fort Worth",
    "soccer bar Fort Worth",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Malone's Pub | Irish Pub & Dive Bar in Downtown Fort Worth",
    description:
      "Downtown Fort Worth's longest-running Irish pub and neighborhood dive bar. Guinness, pool, darts, Golden Tee, bar food, pinball, and free street parking near Sundance Square.",
    siteName: "Malone's Pub",
    locale: "en_US",
    images: [
      {
        url: "/photos/hero.webp",
        width: 1200,
        height: 630,
        alt: "Malone's Pub exterior sign in Downtown Fort Worth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Malone's Pub | Irish Pub & Dive Bar in Downtown Fort Worth",
    description:
      "Cold drinks, Guinness, pool, darts, Golden Tee, pinball, and free street parking in Downtown Fort Worth near Sundance Square.",
    images: ["/photos/hero.webp"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "food & drink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-89XCC9JFW5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-89XCC9JFW5');
          `}
        </Script>
        <Nav />
        <main className="pb-24 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyBar />
        <LocalBusinessSchema siteUrl={SITE_URL} />
      </body>
    </html>
  );
}
