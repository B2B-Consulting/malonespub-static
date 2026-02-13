import Section from "@/components/Section";
import Card from "@/components/Card";
import events from "@/content/events.json";

export default function EventsPage() {
  return (
    <Section title="Events">
      <div className="grid gap-4 md:grid-cols-2">
        {events.map((e) => (
          <Card key={e.title}>
            <div className="text-lg font-semibold">{e.title}</div>
            <div className="mt-1 text-neutral-300">{e.when}</div>
            <div className="mt-3 text-sm text-neutral-400">{e.details}</div>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-sm text-neutral-400">
        Want to host something? Hit us up on the Contact page and we’ll get you set up.
      </div>
    </Section>
  );
}
