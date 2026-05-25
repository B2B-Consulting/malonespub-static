import { BUSINESS } from "@/lib/business";

export default function ReviewButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={BUSINESS.googleReviewUrl}
      target="_blank"
      rel="noreferrer"
      className={[
        "inline-flex items-center justify-center rounded-lg border border-white/30 px-4 py-2 text-sm font-bold text-white transition hover:bg-white hover:text-neutral-950",
        className,
      ].join(" ")}
    >
      Leave a Google Review
    </a>
  );
}
