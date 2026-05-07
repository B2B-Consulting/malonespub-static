import site from "@/content/site.json";
import ratings from "@/content/ratings.json";

const openingHours = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "15:00", closes: "02:00" },
  { days: ["Saturday", "Sunday"], opens: "14:00", closes: "02:00" },
];

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

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: site.name,
    url: siteUrl,
    image: [`${siteUrl}/photos/hero.webp`, `${siteUrl}/photos/exterior.webp`],
    description:
      "Malone's Pub is Downtown Fort Worth's longest-running Irish pub and neighborhood dive bar with Guinness, cold beer, pool tables, darts, Golden Tee, Big Lebowski pinball, jukebox, simple bar food, and free street parking near Sundance Square.",
    telephone: "+18173325330",
    priceRange: "$",
    servesAlcohol: true,
    servesCuisine: "Bar bites",
    hasMenu: `${siteUrl}/menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1303 Calhoun St",
      addressLocality: "Fort Worth",
      addressRegion: "TX",
      postalCode: "76102",
      addressCountry: "US",
    },
    areaServed: "Fort Worth, TX",
    openingHoursSpecification: openingHours.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Pool tables", value: true },
      { "@type": "LocationFeatureSpecification", name: "Darts", value: true },
      { "@type": "LocationFeatureSpecification", name: "Golden Tee", value: true },
      { "@type": "LocationFeatureSpecification", name: "Pinball", value: true },
      { "@type": "LocationFeatureSpecification", name: "Jukebox", value: true },
      { "@type": "LocationFeatureSpecification", name: "Bar food", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free street parking", value: true },
    ],
    sameAs: [site.googleMapsUrl, site.instagramUrl].filter(Boolean),
  };

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
