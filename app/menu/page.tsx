import type { Metadata } from "next";
import Section from "@/components/Section";
import menu from "@/content/menu.json";

type MenuSection = {
  category: string;
  items?: string[];
  groups?: { name: string; items: string[] }[];
};

export const metadata: Metadata = {
  title: "Drink Menu",
  description:
    "View the drink menu at Malone's Pub in downtown Fort Worth. Draft beer, Guinness, craft bottles, imports, non-alcoholic beer, wine, and simple bar bites near Sundance Square.",
  alternates: {
    canonical: "https://malonespub.com/menu",
  },
};

export default function MenuPage() {
  return (
    <>
      <div className="relative h-[400px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/bar-back.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
          <div>
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Malone&apos;s Pub Menu
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-200">
              Drinks are the main event: Guinness, draft beer, imports, craft
              bottles and cans, wine, non-alcoholic beer, and simple bar bites.
            </p>
          </div>
        </div>
      </div>

      {(menu as MenuSection[]).map((section) => (
        <Section key={section.category} title={section.category}>
          {section.items ? <MenuList items={section.items} /> : null}

          {section.groups?.map((group) => (
            <div key={group.name}>
              <MenuSubheading title={group.name} />
              <MenuList items={group.items} />
            </div>
          ))}
        </Section>
      ))}
    </>
  );
}

function MenuList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-2 text-neutral-300 md:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="border-b border-neutral-800 pb-1">
          {item}
        </li>
      ))}
    </ul>
  );
}

function MenuSubheading({ title }: { title: string }) {
  return <h3 className="mb-3 mt-6 text-lg font-semibold text-white">{title}</h3>;
}
