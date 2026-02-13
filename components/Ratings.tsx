import Card from "@/components/Card";
import ButtonLink from "@/components/ButtonLink";
import ratings from "@/content/ratings.json";
import site from "@/content/site.json";

function Stars({ value }: { value: number }) {
  // Render 5 stars with partial fill based on rating
  const full = Math.floor(value);
  const remainder = value - full;

  return (
    <div className="flex items-center gap-1" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const idx = i + 1;
        const isFull = idx <= full;
        const isHalf = !isFull && idx === full + 1 && remainder >= 0.25 && remainder < 0.75;

        return (
          <span
            key={i}
            className={[
              "text-lg",
              isFull ? "text-yellow-400" : "text-neutral-600",
            ].join(" ")}
          >
            {isHalf ? "★" : "★"}
          </span>
        );
      })}
    </div>
  );
}

export default function Ratings() {
  const ratingValue = Number(ratings.rating || 0);
  const reviewCount = Number(ratings.reviewCount || 0);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Summary */}
        <Card className="md:col-span-1">
          <div className="text-sm text-neutral-400">{ratings.sourceLabel} rating</div>

          <div className="mt-2 flex items-end gap-3">
            <div className="text-4xl font-extrabold tracking-tight">
              {ratingValue ? ratingValue.toFixed(1) : "—"}
            </div>
            <div className="pb-1">
              {ratingValue ? <Stars value={ratingValue} /> : null}
              <div className="mt-1 text-sm text-neutral-400">
                {reviewCount ? `${reviewCount.toLocaleString()} reviews` : "Reviews"}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href={site.googleMapsUrl} external>
              Read Reviews
            </ButtonLink>

            <ButtonLink
              href={`${site.googleMapsUrl}&hl=en`}
              external
              variant="ghost"
            >
              Leave a Review
            </ButtonLink>
          </div>

          <div className="mt-4 text-xs text-neutral-500">
            Social proof matters — reviews help people find us.
          </div>
        </Card>

        {/* Highlights */}
        <div className="md:col-span-2 grid gap-4 md:grid-cols-3">
          {ratings.highlights.map((r) => (
            <Card key={r.name} className="transition hover:border-neutral-700">
              <div className="text-sm text-neutral-400">{r.name}</div>
              <div className="mt-2 text-sm text-neutral-300">“{r.quote}”</div>
              <div className="mt-3 text-xs text-neutral-500">{r.detail}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
