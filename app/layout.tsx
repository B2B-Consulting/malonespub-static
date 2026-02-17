import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";

export const metadata = {
  title: "Malone’s Pub | Downtown Fort Worth",
  description:
    "Malone’s Pub is a locally owned Irish pub and neighborhood dive bar in Downtown Fort Worth near Sundance Square. Cold drinks, Guinness on draft, craft beer, wine, and bar bites.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BarOrPub",
              name: "Malone’s Pub",
              image: "https://malonespub.com/photos/hero.jpg",
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
              geo


