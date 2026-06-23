import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import CallToActionBar from "@/components/CallToActionBar";
import { SITE_URL } from "@/lib/business";

export const metadata: Metadata = {
  title: "Malone's Pub Merch | Shirts & Pub Gear",
  description:
    "Shop Malone's Pub shirts and merch from Downtown Fort Worth's longest-running pub.",
  alternates: { canonical: `${SITE_URL}/merch` },
};

const products = [
  {
    name: "Malone's Pub Logo Tee - Heather Green",
    description: "Soft heather green tee with the Malone's Pub front logo.",
    price: "$30",
    image: "/images/merch/malones-shirt-green.webp",
    alt: "Heather green Malone's Pub logo tee",
  },
  {
    name: "Malone's Pub Logo Tee - Maroon",
    description: "Maroon tee with the Malone's Pub front logo.",
    price: "$30",
    image: "/images/merch/malones-shirt-maroon.webp",
    alt: "Maroon Malone's Pub logo tee",
  },
  {
    name: "Malone's Pub Logo Tee - Dark Blue",
    description: "Dark blue tee with the Malone's Pub front logo.",
    price: "$30",
    image: "/images/merch/malones-shirt-dark-blue.webp",
    alt: "Dark blue Malone's Pub logo tee",
  },
];

const sizes = ["S", "M", "L", "XL", "2XL"];

export default function MerchPage() {
  return (
    <>
      <Section title="Malone's Pub Merch">
        <div className="space-y-8">
          <div className="max-w-3xl space-y-4 leading-8 text-neutral-300">
            <h1 className="text-3xl font-black text-white">
              Malone&apos;s Shirts Are Getting Ready
            </h1>
            <p>
              Malone&apos;s Pub logo tees are staged for launch in classic bar
              colors. Online checkout is not live yet, but the shirt lineup is
              ready to preview before you stop by Downtown Fort Worth.
            </p>
            <p>
              Until online ordering is ready, ask the bartender about current
              availability when you stop in. You can also check the photos page,
              look over the drink menu, or contact Malone&apos;s before coming
              downtown.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="text-green-300 hover:text-green-200" href="/photos">
                See photos
              </Link>
              <Link className="text-green-300 hover:text-green-200" href="/menu">
                View menu
              </Link>
              <Link className="text-green-300 hover:text-green-200" href="/contact">
                Contact Malone&apos;s
              </Link>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.image}
                className="flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-neutral-900/70 shadow-sm"
              >
                <div className="relative aspect-[4/5] bg-neutral-950">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-1 flex-col gap-3">
                    <h2 className="text-xl font-black leading-tight text-white">
                      {product.name}
                    </h2>
                    <p className="leading-7 text-neutral-300">
                      {product.description}
                    </p>
                    <div className="text-lg font-black text-green-300">
                      {product.price}
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                        Sizes
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {sizes.map((size) => (
                          <span
                            key={`${product.image}-${size}`}
                            className="inline-flex h-8 min-w-8 items-center justify-center rounded border border-white/15 bg-black/30 px-2 text-sm font-bold text-neutral-200"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled
                    className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-neutral-300"
                  >
                    Available Soon
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
      <CallToActionBar label="Ask about Malone's merch at the bar" />
    </>
  );
}
