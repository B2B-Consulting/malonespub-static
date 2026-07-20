import { mainImages } from "@/lib/business";
import type { FaqItem } from "@/components/SeoFaq";

export type SeoLandingPage = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  image: string;
  imageAlt: string;
  sections: { heading: string; body: string[] }[];
  faqs: FaqItem[];
  related: string[];
};

const evergreen = {
  address:
    "Malone's Pub is at 1303 Calhoun St in Downtown Fort Worth, close to Sundance Square, the Fort Worth Convention Center, and Texas A&M Fort Worth.",
  vibe:
    "The room is dark, casual, and no-frills in the right way: cold drinks, regulars, bar games, music, and a neighborhood dive-bar feel without the polished chain-restaurant routine.",
  basics:
    "You can expect Guinness, cold beer, cocktails, simple bar food, pool, darts, Golden Tee, Big Lebowski pinball, jukebox, and free street parking nearby.",
};

export const seoPages: Record<string, SeoLandingPage> = {
  "irish-pub-fort-worth": {
    slug: "irish-pub-fort-worth",
    title: "Irish Pub Fort Worth",
    metaTitle: "Irish Pub Fort Worth",
    description:
      "Looking for an Irish pub in Fort Worth? Malone's Pub is a long-running Downtown Fort Worth Irish pub and neighborhood dive bar with Guinness, games, bar food, and a laid-back local crowd.",
    eyebrow: "Irish Pub Fort Worth",
    h1: "Irish Pub in Downtown Fort Worth",
    intro:
      "Malone's Pub is a no-frills Irish pub and neighborhood dive bar in Downtown Fort Worth with Guinness, cold beer, pool, darts, Golden Tee, pinball, jukebox, and bar food.",
    image: mainImages.exterior,
    imageAlt: "Malone's Pub exterior in Downtown Fort Worth",
    related: ["menu", "photos", "guinness-fort-worth", "dive-bar-fort-worth"],
    sections: [
      {
        heading: "A Downtown Fort Worth Irish Pub Without the Fuss",
        body: [
          "Malone's Pub has been part of Downtown Fort Worth since 2000, serving as the kind of Irish pub people find once and keep coming back to. It is not trying to be a polished restaurant concept or a glossy nightlife lounge. It is a local pub with Guinness, cold beer, games, regulars, and enough character to feel lived in.",
          evergreen.address,
          "If you are searching for an Irish pub Fort Worth locals actually use, Malone's fits the search because it combines the pub basics with a dive-bar mood: friendly bartenders, simple bar food, and a room built for hanging out instead of hurrying through.",
        ],
      },
      {
        heading: "Guinness, Games, and Local Regulars",
        body: [
          evergreen.basics,
          "The bar works for an after-work pint, a low-key night near Sundance Square, a stop before or after an event at the Convention Center, or a late-night drink downtown. The Irish pub identity is part Guinness, part neighborhood, and part not overthinking things.",
          evergreen.vibe,
        ],
      },
    ],
    faqs: [
      {
        question: "Is Malone's Pub an Irish pub in Fort Worth?",
        answer:
          "Yes. Malone's Pub is a Downtown Fort Worth Irish pub and neighborhood dive bar with Guinness, cold beer, games, and bar food.",
      },
      {
        question: "Does Malone's Pub serve Guinness?",
        answer:
          "Yes. Malone's serves Guinness Pub Draught along with domestic beer, imports, craft beer, cocktails, wine, and non-alcoholic beer.",
      },
      {
        question: "Where is Malone's Pub located?",
        answer:
          "Malone's Pub is at 1303 Calhoun St, Fort Worth, TX 76102 in Downtown Fort Worth near Sundance Square.",
      },
      {
        question: "Is Malone's Pub casual?",
        answer:
          "Yes. Malone's has a laid-back, no-frills Irish pub and dive-bar feel.",
      },
      {
        question: "Does Malone's Pub have games?",
        answer:
          "Yes. Malone's has pool, darts, Golden Tee, Big Lebowski pinball, and a jukebox.",
      },
    ],
  },
  "dive-bar-fort-worth": {
    slug: "dive-bar-fort-worth",
    title: "Dive Bar Fort Worth",
    metaTitle: "Dive Bar Fort Worth",
    description:
      "Malone's Pub is a Downtown Fort Worth dive bar and Irish pub with cold beer, Guinness, pool, darts, Golden Tee, pinball, bar food, and a laid-back local atmosphere.",
    eyebrow: "Dive Bar Fort Worth",
    h1: "Dive Bar in Downtown Fort Worth",
    intro:
      "If you want a real Fort Worth dive bar instead of something dressed up to look like one, Malone's Pub keeps it simple: cold drinks, games, regulars, and a downtown address.",
    image: mainImages.bar,
    imageAlt: "Behind the bar at Malone's Pub Fort Worth",
    related: ["irish-pub-fort-worth", "downtown-fort-worth-bar", "late-night-bar-fort-worth", "photos"],
    sections: [
      {
        heading: "A Neighborhood Dive Bar Downtown",
        body: [
          "Malone's Pub is the kind of Downtown Fort Worth bar that feels local because it is local. Established in 2000, it has the bones of an Irish pub and the attitude of a neighborhood dive bar: low-key, dark, friendly, and built around cold drinks rather than scene-making.",
          evergreen.address,
          "For people searching dive bar Fort Worth, the appeal is straightforward. You can grab Guinness, beer, cocktails, or a simple bite, play pool or darts, put a game on, and settle into a bar that does not feel corporate.",
        ],
      },
      {
        heading: "No-Frills Drinks and Games",
        body: [
          evergreen.basics,
          "Malone's works well before or after downtown plans, but it also stands on its own for late-night drinks and casual bar games. It is near Sundance Square without feeling like a tourist trap, and near the Convention Center without feeling like a hotel lobby bar.",
          evergreen.vibe,
        ],
      },
    ],
    faqs: [
      {
        question: "Is Malone's Pub a dive bar?",
        answer:
          "Yes. Malone's Pub is a casual neighborhood dive bar and Irish pub in Downtown Fort Worth.",
      },
      {
        question: "What makes Malone's a dive bar?",
        answer:
          "It has a no-frills local atmosphere, cold drinks, bar games, regulars, and a laid-back downtown feel.",
      },
      {
        question: "Does Malone's Pub have food?",
        answer:
          "Yes. Malone's offers simple bar food and bar bites such as pizza, chips, beef jerky, and nuts.",
      },
      {
        question: "Is Malone's near Sundance Square?",
        answer:
          "Yes. Malone's is in Downtown Fort Worth near Sundance Square on Calhoun Street.",
      },
      {
        question: "How late is Malone's open?",
        answer:
          "Malone's Pub closes at 2am every night.",
      },
    ],
  },
  "downtown-fort-worth-bar": {
    slug: "downtown-fort-worth-bar",
    title: "Downtown Fort Worth Bar",
    metaTitle: "Downtown Fort Worth Bar",
    description:
      "Malone's Pub is a Downtown Fort Worth bar near Sundance Square and the Fort Worth Convention Center with Guinness, pool, darts, Golden Tee, pinball, bar food, and late-night hours.",
    eyebrow: "Downtown Fort Worth Bar",
    h1: "Downtown Fort Worth Bar Near Sundance Square",
    intro:
      "Malone's Pub is a Downtown Fort Worth bar on Calhoun Street with Irish pub roots, neighborhood dive-bar character, cold drinks, games, and free street parking nearby.",
    image: mainImages.exterior,
    imageAlt: "Malone's Pub exterior in Downtown Fort Worth",
    related: ["contact", "menu", "late-night-bar-fort-worth", "photos"],
    sections: [
      {
        heading: "A Bar in the Middle of Downtown Fort Worth",
        body: [
          "Malone's Pub sits at 1303 Calhoun St, putting it close to Sundance Square, the Fort Worth Convention Center, Texas A&M Fort Worth, hotels, offices, and downtown events. It is easy to use as a meeting point because the bar is simple: walk in, order a drink, find a spot, and stay awhile.",
          "The bar has been around since 2000, which matters in a downtown that keeps changing. Malone's still feels like a neighborhood place, even with the skyline around it.",
          evergreen.basics,
        ],
      },
      {
        heading: "Good for After Work, Late Night, and Downtown Plans",
        body: [
          "If you are downtown for work, a show, a convention, a game, or just a night out, Malone's gives you a casual place that does not ask you to dress up or make a reservation.",
          "The mix is Irish pub, dive bar, and local hangout: Guinness at the bar, pool and darts nearby, Golden Tee and pinball for games, and a crowd that feels more Fort Worth than flashy.",
          evergreen.vibe,
        ],
      },
    ],
    faqs: [
      {
        question: "Where is Malone's Pub in Downtown Fort Worth?",
        answer:
          "Malone's Pub is at 1303 Calhoun St, Fort Worth, TX 76102.",
      },
      {
        question: "Is Malone's Pub near the Fort Worth Convention Center?",
        answer:
          "Yes. Malone's is in Downtown Fort Worth and is convenient to the Fort Worth Convention Center.",
      },
      {
        question: "Is there parking near Malone's Pub?",
        answer:
          "Malone's notes free street parking nearby.",
      },
      {
        question: "Does Malone's Pub have bar games?",
        answer:
          "Yes. Malone's has pool, darts, Golden Tee, pinball, and a jukebox.",
      },
      {
        question: "Is Malone's Pub open late?",
        answer:
          "Yes. Malone's Pub closes at 2am every night.",
      },
    ],
  },
  "pool-darts-fort-worth": {
    slug: "pool-darts-fort-worth",
    title: "Pool & Darts Fort Worth",
    metaTitle: "Pool & Darts Fort Worth",
    description:
      "Looking for a Fort Worth bar with pool and darts? Malone's Pub in Downtown Fort Worth has pool, darts, Guinness, Golden Tee, pinball, bar food, and late-night hours.",
    eyebrow: "Pool & Darts Fort Worth",
    h1: "Bar with Pool and Darts in Downtown Fort Worth",
    intro:
      "Malone's Pub is a Downtown Fort Worth bar with pool, darts, Golden Tee, pinball, Guinness, cold beer, and a laid-back neighborhood crowd.",
    image: mainImages.pool,
    imageAlt: "Pool table at Malone's Pub near Sundance Square",
    related: ["pool-tournament", "golden-tee-fort-worth", "pinball-fort-worth", "photos"],
    sections: [
      {
        heading: "Pool, Darts, and a Real Pub Atmosphere",
        body: [
          "A lot of people search for a bar with pool Fort Worth or darts Fort Worth because they want something to do while they drink. Malone's Pub keeps that part simple. There is a pool table, dart boards, Golden Tee, pinball, and a jukebox, all inside a casual Downtown Fort Worth Irish pub and dive bar.",
          evergreen.address,
          "It is the kind of place where the games are part of the room rather than a gimmick. You can come in for Guinness, play a few rounds, meet friends, or stay late without turning the night into a production.",
        ],
      },
      {
        heading: "Pool Tournament and Casual Games",
        body: [
          "Malone's also has a pool tournament page with double-elimination 8-ball rules for players who want something more structured. Casual players can still use the bar the normal way: grab a drink, wait your turn, and play.",
          "The downtown location makes Malone's useful before or after plans around Sundance Square, the Fort Worth Convention Center, or Texas A&M Fort Worth.",
          evergreen.vibe,
        ],
      },
    ],
    faqs: [
      {
        question: "Where can I play pool in Downtown Fort Worth?",
        answer:
          "Malone's Pub has a pool table in Downtown Fort Worth near Sundance Square.",
      },
      {
        question: "Does Malone's Pub have darts?",
        answer:
          "Yes. Malone's Pub has dart boards along with pool, Golden Tee, pinball, and a jukebox.",
      },
      {
        question: "Does Malone's host pool tournaments?",
        answer:
          "Malone's has a pool tournament page with double-elimination 8-ball rules.",
      },
      {
        question: "Can beginners play pool at Malone's?",
        answer:
          "Yes. Malone's is a casual bar, and beginners can play when the table is available.",
      },
      {
        question: "What else can I play at Malone's?",
        answer:
          "Malone's also has Golden Tee, Big Lebowski pinball, darts, and a jukebox.",
      },
    ],
  },
  "golden-tee-fort-worth": {
    slug: "golden-tee-fort-worth",
    title: "Golden Tee Fort Worth",
    metaTitle: "Golden Tee Fort Worth",
    description:
      "Play Golden Tee at Malone's Pub in Downtown Fort Worth. Cold beer, Guinness, pool, darts, pinball, bar food, and a casual dive-bar atmosphere near Sundance Square.",
    eyebrow: "Golden Tee Fort Worth",
    h1: "Golden Tee Bar in Downtown Fort Worth",
    intro:
      "Malone's Pub has Golden Tee in a casual Downtown Fort Worth bar with Guinness, cold beer, pool, darts, pinball, jukebox, and bar bites.",
    image: mainImages.goldenTee,
    imageAlt: "Golden Tee machine at Malone's Pub in Downtown Fort Worth",
    related: ["pool-darts-fort-worth", "pinball-fort-worth", "menu", "photos"],
    sections: [
      {
        heading: "Golden Tee at a Downtown Fort Worth Dive Bar",
        body: [
          "Golden Tee works best in a bar that does not take itself too seriously. Malone's Pub gives you that setting: a Downtown Fort Worth Irish pub and neighborhood dive bar where you can play a round, order a drink, and keep the night casual.",
          evergreen.address,
          "For people searching Golden Tee Fort Worth, Malone's is a useful answer because the game sits alongside the rest of the bar's regular attractions: pool, darts, Big Lebowski pinball, jukebox, Guinness, and cold beer.",
        ],
      },
      {
        heading: "More Than One Game to Play",
        body: [
          "If Golden Tee is busy, there are other ways to pass the time. Play pool, throw darts, put a few songs on the jukebox, or check out the pinball machine.",
          "The bar is also near Sundance Square and the Fort Worth Convention Center, so it can be a downtown stop before or after whatever brought you out.",
          evergreen.vibe,
        ],
      },
    ],
    faqs: [
      {
        question: "Does Malone's Pub have Golden Tee?",
        answer:
          "Yes. Malone's Pub has a Golden Tee machine in Downtown Fort Worth.",
      },
      {
        question: "Where can I play Golden Tee in Fort Worth?",
        answer:
          "You can play Golden Tee at Malone's Pub at 1303 Calhoun St in Downtown Fort Worth.",
      },
      {
        question: "Does Malone's have other games?",
        answer:
          "Yes. Malone's has pool, darts, Big Lebowski pinball, and a jukebox.",
      },
      {
        question: "Can I get Guinness at Malone's?",
        answer:
          "Yes. Malone's serves Guinness Pub Draught.",
      },
      {
        question: "Is Malone's open late?",
        answer:
          "Yes. Malone's closes at 2am every night.",
      },
    ],
  },
  "pinball-fort-worth": {
    slug: "pinball-fort-worth",
    title: "Pinball Fort Worth",
    metaTitle: "Pinball Bar Fort Worth",
    description:
      "Looking for a pinball bar in Fort Worth? Malone's Pub has Big Lebowski pinball, Golden Tee, pool, darts, Guinness, bar food, and a Downtown Fort Worth dive-bar feel.",
    eyebrow: "Pinball Bar Fort Worth",
    h1: "Pinball Bar in Downtown Fort Worth",
    intro:
      "Malone's Pub has Big Lebowski pinball inside a Downtown Fort Worth Irish pub and dive bar with Guinness, pool, darts, Golden Tee, jukebox, and bar bites.",
    image: mainImages.pinball,
    imageAlt: "Big Lebowski pinball machine at Malone's Pub Fort Worth",
    related: ["golden-tee-fort-worth", "pool-darts-fort-worth", "photos", "menu"],
    sections: [
      {
        heading: "Big Lebowski Pinball at Malone's",
        body: [
          "Malone's Pub gives Fort Worth pinball fans a casual downtown place to play. The Big Lebowski pinball machine fits the room: a little weird, a little old-school, and exactly right for a no-frills bar.",
          evergreen.address,
          "This is not an arcade pretending to be a bar. It is an Irish pub and dive bar with a real local crowd, Guinness, cold beer, and enough games to keep a night moving.",
        ],
      },
      {
        heading: "Pinball, Pool, Darts, and Golden Tee",
        body: [
          evergreen.basics,
          "If you are searching pinball Fort Worth or pinball bar Fort Worth, Malone's is worth knowing because it combines pinball with other bar games and late-night hours.",
          evergreen.vibe,
        ],
      },
    ],
    faqs: [
      {
        question: "Does Malone's Pub have pinball?",
        answer:
          "Yes. Malone's Pub has a Big Lebowski pinball machine.",
      },
      {
        question: "Where is Malone's Pub?",
        answer:
          "Malone's Pub is at 1303 Calhoun St in Downtown Fort Worth.",
      },
      {
        question: "Does Malone's have other games?",
        answer:
          "Yes. Malone's has pool, darts, Golden Tee, pinball, and a jukebox.",
      },
      {
        question: "Is Malone's Pub a dive bar?",
        answer:
          "Yes. Malone's is a casual neighborhood dive bar and Irish pub.",
      },
      {
        question: "Does Malone's serve food?",
        answer:
          "Malone's serves simple bar food and bar bites.",
      },
    ],
  },
  "guinness-fort-worth": {
    slug: "guinness-fort-worth",
    title: "Guinness Fort Worth",
    metaTitle: "Guinness Fort Worth",
    description:
      "Looking for Guinness in Fort Worth? Malone's Pub is a Downtown Fort Worth Irish pub and dive bar serving Guinness Pub Draught with pool, darts, Golden Tee, pinball, and bar food.",
    eyebrow: "Guinness Fort Worth",
    h1: "Guinness at Malone's Pub in Fort Worth",
    intro:
      "Malone's Pub serves Guinness Pub Draught in Downtown Fort Worth, alongside cold beer, cocktails, pool, darts, Golden Tee, Big Lebowski pinball, and bar bites.",
    image: mainImages.bar,
    imageAlt: "Behind the bar at Malone's Pub Fort Worth",
    related: ["irish-pub-fort-worth", "menu", "downtown-fort-worth-bar", "photos"],
    sections: [
      {
        heading: "Guinness at a Downtown Fort Worth Irish Pub",
        body: [
          "If you are searching Guinness Fort Worth, Malone's Pub is the kind of bar that makes sense: an Irish pub and neighborhood dive bar with Guinness on the menu, not a polished restaurant trying to borrow pub atmosphere for the weekend.",
          evergreen.address,
          "Guinness fits the place because Malone's is already built around a pub rhythm: regulars, cold drinks, games, and a downtown location that works before, after, or instead of bigger plans.",
        ],
      },
      {
        heading: "More Than a Pint",
        body: [
          "The menu also includes draft beer, domestic bottles, imports, craft bottles and cans, wine, non-alcoholic beer, and simple bar bites.",
          evergreen.basics,
          "Come for a Guinness, stay for pool, darts, Golden Tee, pinball, jukebox, and the kind of low-pressure Fort Worth bar night that is getting harder to fake.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does Malone's Pub serve Guinness?",
        answer:
          "Yes. Malone's Pub serves Guinness Pub Draught.",
      },
      {
        question: "Is Malone's an Irish pub?",
        answer:
          "Yes. Malone's is a Downtown Fort Worth Irish pub and neighborhood dive bar.",
      },
      {
        question: "Does Malone's serve non-alcoholic beer?",
        answer:
          "Yes. The menu includes Guinness 0.0, Heineken 0.0, and Athletic Brewing.",
      },
      {
        question: "Can I see the drink menu online?",
        answer:
          "Yes. The Malone's Pub drink menu is available on the Menu page.",
      },
      {
        question: "Where is Malone's Pub located?",
        answer:
          "Malone's Pub is at 1303 Calhoun St, Fort Worth, TX 76102.",
      },
    ],
  },
  "late-night-bar-fort-worth": {
    slug: "late-night-bar-fort-worth",
    title: "Late Night Bar Fort Worth",
    metaTitle: "Late Night Bar Fort Worth",
    description:
      "Malone's Pub is a late-night bar in Downtown Fort Worth open until 2am every night with Guinness, cold beer, pool, darts, Golden Tee, pinball, bar food, and a casual local crowd.",
    eyebrow: "Late Night Bar Fort Worth",
    h1: "Late Night Bar in Downtown Fort Worth",
    intro:
      "Malone's Pub is open until 2am every night, making it a late-night Downtown Fort Worth bar for Guinness, cold beer, pool, darts, Golden Tee, pinball, and bar bites.",
    image: mainImages.interior,
    imageAlt: "Interior of Malone's Pub near Sundance Square",
    related: ["downtown-fort-worth-bar", "dive-bar-fort-worth", "menu", "contact"],
    sections: [
      {
        heading: "Open Until 2am Every Night",
        body: [
          "When people search late night bar Fort Worth, they usually want simple information fast: where is it, is it open, and what kind of place is it? Malone's Pub answers all three. The bar is in Downtown Fort Worth, open until 2am every night, and built for casual drinks rather than upscale production.",
          evergreen.address,
          "Weekday hours start at 3pm, weekend hours start at 12pm, and closing time is 2am. That makes Malone's useful for after-work drinks, late-night meetups, post-event stops, or one more round downtown.",
        ],
      },
      {
        heading: "Late Night Without the Nightclub Feel",
        body: [
          "Malone's is a neighborhood dive bar and Irish pub, so the late-night energy stays grounded: Guinness, beer, cocktails, pool, darts, Golden Tee, pinball, jukebox, and simple bar food.",
          "The bar is close to Sundance Square, the Fort Worth Convention Center, and Texas A&M Fort Worth, but it keeps the mood local and low-key.",
          evergreen.vibe,
        ],
      },
    ],
    faqs: [
      {
        question: "What time does Malone's Pub close?",
        answer:
          "Malone's Pub closes at 2am every night.",
      },
      {
        question: "Is Malone's Pub open late on weekends?",
        answer:
          "Yes. Malone's is open Saturday and Sunday from 12pm to 2am.",
      },
      {
        question: "Is Malone's a late-night bar in Downtown Fort Worth?",
        answer:
          "Yes. Malone's is a Downtown Fort Worth bar open late with drinks, games, and bar food.",
      },
      {
        question: "Does Malone's have food late at night?",
        answer:
          "Malone's offers simple bar food and bar bites.",
      },
      {
        question: "Does Malone's have games?",
        answer:
          "Yes. Malone's has pool, darts, Golden Tee, pinball, and a jukebox.",
      },
    ],
  },
};

export function getSeoPage(slug: string) {
  return seoPages[slug];
}
