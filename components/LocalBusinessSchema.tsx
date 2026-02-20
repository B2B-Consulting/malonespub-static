import site from "@/content/site.json";
import ratings from "@/content/ratings.json";

export default function LocalBusinessSchema({ siteUrl }: { siteUrl: string }) {
  const ratingValue =
    typeof ratings.rating === "number" ? ratings.rating : Number(ratings.rating);
  const reviewCount =
    typeof ratings.reviewCount === "number"
      ? ratings.reviewCount
      : Number(ratings.reviewCount);

  const hasValidRating =
    Number.isFinite(ratingValue) &&
    Number.isFinite(reviewCount) &&
    ratingValue > 0 &&
    reviewCount > 0;

  const jsonLd: any = {
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
      site.googleMapsUrl, // your Maps share link (maps.app.goo.gl/...)
      site.instagramUrl,
    ].filter(Boolean),
  };

  // Add AggregateRating ONLY if numbers are valid
  if (hasValidRating) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: Number(ratingValue.toFixed(1)),
      reviewCount: Math.round(reviewCount),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}