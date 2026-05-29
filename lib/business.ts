export const SITE_URL = "https://malonespub.com";

export const BUSINESS = {
  name: "Malone's Pub",
  phone: "(817) 332-5330",
  phoneHref: "tel:+18173325330",
  address: {
    street: "1303 Calhoun St",
    city: "Fort Worth",
    region: "TX",
    postalCode: "76102",
    country: "US",
    formatted: "1303 Calhoun St, Fort Worth, TX 76102",
  },
  mapsUrl: "https://www.google.com/maps?q=1303+Calhoun+St,+Fort+Worth,+TX+76102",
  instagramUrl: "https://www.instagram.com/malonespubfw/",
  facebookUrl: "",
  googleBusinessUrl: "",
  googleReviewUrl: "https://www.google.com/search?q=Malone%27s+Pub+Fort+Worth+TX+reviews",
  description:
    "Downtown Fort Worth Irish pub and neighborhood dive bar with Guinness, pool, darts, Golden Tee, Big Lebowski pinball, jukebox, and bar food.",
  hours: {
    weekday: "Mon-Fri: 3pm-2am",
    weekend: "Sat-Sun: 12pm-2am",
  },
} as const;

export const mainImages = {
  hero: "/photos/hero.webp",
  exterior: "/photos/malones-pub-exterior-downtown-fort-worth.webp",
  interior: "/photos/inside.webp",
  pool: "/photos/malones-pub-pool-table-fort-worth.webp",
  darts: "/photos/malones-pub-darts-downtown-fort-worth.webp",
  goldenTee: "/photos/malones-pub-golden-tee-fort-worth.webp",
  pinball: "/photos/malones-pub-big-lebowski-pinball.webp",
  patio: "/photos/patio.webp",
  bar: "/photos/bar.webp",
} as const;
