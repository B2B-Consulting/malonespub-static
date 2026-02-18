import Section from "@/components/Section";

export const metadata = {
  title: "Drink Menu | Malone’s Pub Fort Worth",
  description:
    "View the full drink menu at Malone’s Pub in downtown Fort Worth. Draft beer, Guinness, craft bottles, imports, wine, and bar bites near Sundance Square.",
};

export default function MenuPage() {
  return (
    <>
      <Section title="Malone’s Pub Menu">
        <p className="mb-6 text-neutral-400">
          Malone’s Pub is a locally owned Irish pub and neighborhood dive bar in
          downtown Fort Worth near Sundance Square. Enjoy draft beer, Guinness,
          craft bottles, domestic favorites, imports, wine, and simple bar
          bites.
        </p>
      </Section>

      <Section title="Draft Beers">
        <MenuList
          items={[
            "Guinness Pub Draught",
            "Community Mosaic IPA",
            "Dos XX Lager",
            "Shiner Bock",
          ]}
        />
      </Section>

      <Section title="Non-Alcoholic">
        <MenuList items={["Guinness 0.5", "Heineken 0.0", "Athletic Brewing 0.5"]} />
      </Section>

      <Section title="Domestic Bottles">
        <MenuList
          items={[
            "Budweiser",
            "Bud Light",
            "Coors",
            "Coors Light",
            "Miller Lite",
            "Lone Star",
            "Michelob Ultra",
            "Miller High Life",
            "Pabst Blue Ribbon",
            "Rolling Rock",
            "Yuengling",
          ]}
        />
      </Section>

      <Section title="Import & Craft Bottles and Cans">
        <MenuList
          items={[
            "Abita Purple Haze",
            "Beck’s",
            "Blue Moon",
            "Corona Extra",
            "Dale’s Pale Ale",
            "Deep Ellum IPA",
            "Heineken",
            "Hoegaarden",
            "Labatt Blue",
            "Martin House Friday IPA",
            "Martin House True Love",
            "Modelo Especial",
            "Molson Canadian",
            "Negro Modelo",
            "Old Chub Scotch Ale",
            "Pacifico",
            "Paulaner Hefe-Weizen",
            "Rahr Adios Pantalones",
            "Red Stripe",
            "Revolver Blood & Honey",
            "Saint Arnold Lawn Mower",
            "Sierra Nevada Pale Ale",
            "Smirnoff Ice",
            "Stella Artois",
            "Stone Delicious IPA",
            "Wild Acre Sundance Wheat",
          ]}
        />
      </Section>

      <Section title="Premium Imports & Specialty">
        <MenuList
          items={[
            "Arrogant Bastard",
            "Chimay Blue Label",
            "Chimay Red Label",
            "Dogfish Head 60 Minute IPA",
            "Dogfish Head 90 Minute IPA",
            "Duvel",
            "Franziskaner",
            "Founders Breakfast Stout",
            "Kronenbourg 1664",
            "La Fin Du Monde",
            "Leffe Blonde",
            "Left Hand Milk Stout",
            "Maredsous Tripel",
            "Smithwick’s Irish Red Ale",
            "Weihenstephaner Hefe",
          ]}
        />
      </Section>

      <Section title="Ciders & Seltzers">
        <MenuList
          items={[
            "Austin Eastciders Seasonal Cider",
            "High Noon Peach",
            "High Noon Watermelon",
            "High Noon Pineapple",
            "Coco Vodka Pineapple",
            "Lone River Ranch Water",
            "Strongbow Dry Cider",
            "Topo Chico Strawberry Guava",
          ]}
        />
      </Section>

      <Section title="Wine">
        <MenuSubheading title="Red & Rosé" />
        <MenuList
          items={[
            "Barefoot Cabernet",
            "Barefoot Merlot",
            "Barefoot Pinot Noir",
            "Josh Rosé",
            "Whispering Angel Rosé",
          ]}
        />

        <MenuSubheading title="White" />
        <MenuList
          items={[
            "Barefoot Chardonnay",
            "Chateau Ste. Michelle Riesling",
            "Ecco Domani Pinot Grigio",
            "Ruffino Prosecco",
            "Shannon Ridge Chardonnay",
            "Oyster Bay Sauvignon Blanc",
          ]}
        />
      </Section>

      <Section title="Bar Bites">
        <MenuList
          items={[
            "Cheese Pizza",
            "Pepperoni Pizza",
            "Chips",
            "Beef Jerky",
            "Nuts",
          ]}
        />
      </Section>
    </>
  );
}

function MenuList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-neutral-300">
      {items.map((item) => (
        <li key={item} className="border-b border-neutral-800 pb-1">
          {item}
        </li>
      ))}
    </ul>
  );
}

function MenuSubheading({ title }: { title: string }) {
  return <h3 className="mt-6 mb-3 text-lg font-semibold text-white">{title}</h3>;
}
