import "./globals.css";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";

// IMPORTANT:
// Replace this with your real deployed URL once you have it (Vercel preview URL is fine temporarily).
const SITE_URL = "https://malonespub.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  // Aggressive SEO title + fallback title pattern
  title: {
    default: "Malone’s Pub | Irish Pub & Dive Bar in Downtown Fort Worth",
    template: "%s | Malone’s Pub Fort Worth",
  },

  // Aggressive local + intent keywords
  description:
    "Malone’s Pub is Downtown Fort Worth’s longest-running Irish pub and neighborhood dive bar. Cold drinks, pool tables, darts, Golden Tee, bar food, pinball, and free street parking near Sundance Square.",

  keywords: [
    "Malone's Pub",
    "Malones Pub Fort Worth",
    "Irish pub Fort Worth",
    "dive bar Fort Worth",
    "Downtown Fort Worth bar",
    "bars near Sundance Square",
    "bar near Sundance Square",
    "bars near me downtown Fort Worth",
    "pool table bar Fort Worth",
    "darts bar Fort Worth",
    "Golden Tee Fort Worth",
    "pinball bar Fort Worth",
    "bar food downtown Fort Worth",
    "late night bar Fort Worth",
    "Fort Worth nightlife",
    "76102 bar",
  ],

  // Stronger indexing directives
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

  // OpenGraph for sharing (FB/iMessage/etc.)
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Malone’s Pub | Irish Pub & Dive Bar in Downtown Fort Worth",
    description:
      "Downtown Fort Worth’s longest-running Irish pub and neighborhood dive bar. Pool, darts, Golden Tee, bar food, pinball, and free street parking near Sundance Square.",
    siteName: "Malone’s Pub",
    locale: "en_US",
    images: [
      {
        url: "/photos/hero.webp",
        width: 1200,
        height: 630,
        alt: "Malone’s Pub exterior sign in Downtown Fort Worth",
      },
    ],
  },

  // Twitter card support
  twitter: {
    card: "summary_large_image",
    title: "Malone’s Pub | Irish Pub & Dive Bar in Downtown Fort Worth",
    description:
      "Pool, darts, Golden Tee, bar food, pinball, and free street parking in Downtown Fort Worth near Sundance Square.",
    images: ["/photos/hero.webp"],
  },

  // Helps with canonical + future multi-domain control
  alternates: {
    canonical: SITE_URL,
  },

  // Optional: category hint
  category: "food & drink",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Google Analytics */}
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-89XCC9JFW5`}
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
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        <Nav />
        <main className="pb-24 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyBar />

        {/* Local business schema (aggressive local SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BarOrPub",
              name: "Malone’s Pub",
              url: SITE_URL,
              image: `${SITE_URL}/photos/hero.webp`,
              description:
                "Downtown Fort Worth’s longest-running Irish pub and neighborhood dive bar with pool tables, darts, Golden Tee, pinball, bar food, and free street parking near Sundance Square.",
              telephone: "+18173325330",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "1303 Calhoun St",
                addressLocality: "Fort Worth",
                addressRegion: "TX",
                postalCode: "76102",
                addressCountry: "US",
              },
              areaServed: "Fort Worth, TX",
              // These help Google understand “what this place has”
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Pool tables", value: true },
                { "@type": "LocationFeatureSpecification", name: "Darts", value: true },
                { "@type": "LocationFeatureSpecification", name: "Golden Tee", value: true },
                { "@type": "LocationFeatureSpecification", name: "Pinball", value: true },
                { "@type": "LocationFeatureSpecification", name: "Bar food", value: true },
                { "@type": "LocationFeatureSpecification", name: "Free street parking", value: true },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}