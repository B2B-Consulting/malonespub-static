import ButtonLink from "@/components/ButtonLink";
import site from "@/content/site.json";

export default function MobileStickyBar() {
  const tel = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="mx-auto max-w-6xl px-3 pb-3">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950/90 backdrop-blur p-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            <ButtonLink href={site.googleMapsUrl} external>
              Directions
            </ButtonLink>
            <ButtonLink href={tel} variant="ghost">
              Call
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
