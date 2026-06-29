import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Armoire is a local-first, offline, no-AI wardrobe builder for men's clothing. Here's how it works and why it's different.",
};

const PRINCIPLES = [
  {
    title: "No AI",
    body: "Colours come from deterministic colour science (CIE Lab + ΔE2000); outfits from explainable colour-theory rules - complementary, analogous and neutral pairings, matched on formality and season. Every suggestion can show why it works.",
  },
  {
    title: "Works offline",
    body: "After the first load, adding items, generating outfits and insights all run with no network. The only online feature is an optional weather check, and it fails silently when you're offline.",
  },
  {
    title: "Free",
    body: "No accounts, no API costs, no subscription. Your wardrobe lives on your device in the browser - nothing is uploaded.",
  },
];

const STEPS = [
  "Pick the colour from the index and select the garment type - formality and season are set automatically based on what you choose.",
  "Optionally add a price and any custom notes — formality and season are already dialled in.",
  "Generate colour-coherent outfits. Mark one worn and its pieces drop out of rotation for two generations.",
  "Watch your insights: most-worn colours, cost-per-wear, and the pieces you never reach for.",
];

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-20">
      <Reveal>
        <p className="label-text mb-5">About</p>
        <h1 className="mb-5 max-w-3xl text-balance font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          A wardrobe stylist with nothing up its sleeve.
        </h1>
        <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">
          Armoire is a wardrobe builder for men&apos;s clothing that digitises what you own and
          builds outfits from it - without any AI, fully offline, and free.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="rounded-lg border border-border bg-surface p-6">
              <h2 className="mb-3 font-serif text-xl font-semibold text-foreground">{p.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mt-16 max-w-prose">
          <p className="label-text mb-6">How it works</p>
          <ol className="space-y-5">
            {STEPS.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-border text-sm text-muted-foreground">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </div>
  );
}
