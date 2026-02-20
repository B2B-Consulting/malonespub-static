import site from "@/content/site.json";

export default function LocalBusinessSchema({ siteUrl }: { siteUrl: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: site.name,
    url: siteUrl,
    image: `${siteUrl}/photos/hero.webp`,
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
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Pool tables", value: true },
      { "@type": "LocationFeatureSpecification", name: "Darts", value: true },
      { "@type": "LocationFeatureSpecification", name: "Golden Tee", value: true },
      { "@type": "LocationFeatureSpecification", name: "Pinball", value: true },
      { "@type": "LocationFeatureSpecification", name: "Bar food", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free street parking", value: true },
    ],
    sameAs: [
      site.instagramUrl,
      // You can add Yelp / Facebook later if you want:
      // "https://www.yelp.com/biz/...",
      // "https://www.facebook.com/..."
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}