import Section from "@/components/Section";
import Card from "@/components/Card";
import drinks from "@/content/drinks.json";

function List({ items }: { items: { name: string; price?: string }[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i.name} className="flex items-center justify-between gap-4">
          <span className="text-neutral-100">{i.name}</span>
          <span className="text-sm text-neutral-400">{i.price || ""}</span>
        </li>
      ))}
    </ul>
  );
}

export default function DrinksPage() {
  return (
    <Section title="Drinks">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <div className="mb-4 text-lg font-semibold">Draft</div>
          <List items={drinks.draft} />
        </Card>
        <Card>
          <div className="mb-4 text-lg font-semibold">Bottles/Cans</div>
          <List items={drinks.bottles} />
        </Card>
        <Card>
          <div className="mb-4 text-lg font-semibold">Wine</div>
          <List items={drinks.wine} />
        </Card>
      </div>

      <div className="mt-8 space-y-1 text-sm text-neutral-400">
        {drinks.notes.map((n) => (
          <div key={n}>• {n}</div>
        ))}
      </div>
    </Section>
  );
}
