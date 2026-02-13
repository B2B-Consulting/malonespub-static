import Card from "@/components/Card";
import ButtonLink from "@/components/ButtonLink";
import yelp from "@/content/yelp.json";

export default function YelpRatings() {
  const ratingValue = Number(yelp.rating || 0);
  const reviewCount = Number(yelp.reviewCount || 0);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-10">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Summary */}
        <Card className="md:col-span-1">
          <div className="text-sm text-neutral-400">{yelp.sourceLabel} rating</div>

          <div className="mt-2 flex items-end gap-3">
            <div className="text-4xl font-extrabold tracking-tight">
              {ratingValue ? ratingValue.toFixed(1) : "—"}
            </div>
            <div className="pb-1">
              <div className="text-sm text-neutral-400">
                {reviewCount ? `${reviewCount.toLocaleString()} reviews` : "Reviews"}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href={yelp.yelpUrl} external>
              Read Yelp
            </ButtonLink>

            <ButtonLink href={yelp.yelpUrl} external variant="ghost">
              Leave a Review
            </ButtonLink>
          </div>

          <div className="mt-4 text-xs text-neutral-500">
            Reviews help people decide quickly.
          </div>
        </Card>

        {/* Highlights */}
        <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
          {yelp.highlights.map((r) => (
            <Card key={r.quote} className="transition hover:border-neutral-700">
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
