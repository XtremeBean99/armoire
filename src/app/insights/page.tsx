"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useWardrobe, wardrobeStore } from "@/lib/wardrobe-store/instance";
import { computeInsights } from "@/lib/insights/insights";
import { GARMENTS } from "@/lib/graphics/registry";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const AXIS = { fill: "#a1a1aa", fontSize: 12 };

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-surface p-6">
      <h2 className="mb-5 font-serif text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export default function InsightsPage() {
  const items = useWardrobe((s) => s.items);
  useEffect(() => {
    void wardrobeStore.getState().load();
  }, []);
  const data = useMemo(() => computeInsights(items), [items]);
  const totalWears = items.reduce((a, i) => a + i.timesWorn, 0);

  return (
    <div className="py-16 sm:py-20">
      <Reveal>
        <p className="label-text mb-5">Insights</p>
        <h1 className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          What you actually wear
        </h1>
      </Reveal>

      <div className="mt-12">
        {items.length === 0 || totalWears === 0 ? (
          <EmptyState
            title="No wear data yet"
            hint="Add items and mark a few outfits as worn — your most-worn colours, cost-per-wear and unworn pieces will appear here."
            action={
              <Link
                href="/add"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-surface-hover"
              >
                Add an item
              </Link>
            }
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <Panel title="Most-worn colours">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={data.colorDistribution.slice(0, 8)}>
                    <XAxis dataKey="hueFamily" tick={AXIS} tickLine={false} axisLine={{ stroke: "#27272a" }} />
                    <YAxis allowDecimals={false} tick={AXIS} tickLine={false} axisLine={{ stroke: "#27272a" }} />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      contentStyle={{
                        background: "#111113",
                        border: "1px solid #27272a",
                        borderRadius: 8,
                        color: "#fafafa",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {data.colorDistribution.slice(0, 8).map((_, i) => (
                        <Cell key={i} fill="#fafafa" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Panel>
            </Reveal>

            <Reveal delay={0.06}>
              <Panel title="Cost per wear">
                {data.costPerWear.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Add prices to your items to see value over time.</p>
                ) : (
                  <ul className="divide-y divide-border-subtle text-sm">
                    {data.costPerWear.slice(0, 8).map(({ item, cpw }) => (
                      <li key={item.id} className="flex items-center justify-between py-2.5">
                        <span className="flex items-center gap-2 text-foreground">
                          <span
                            className="inline-block h-3 w-3 rounded-full border border-white/10"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          {item.color.colorName} {GARMENTS[item.garmentType]?.label ?? item.garmentType}
                        </span>
                        <span className="tabular-nums text-muted-foreground">${cpw.toFixed(2)} / wear</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
            </Reveal>

            <Reveal delay={0.12}>
              <Panel title="Most-worn pieces">
                <ul className="divide-y divide-border-subtle text-sm">
                  {data.mostWorn.slice(0, 6).map(({ item, timesWorn }) => (
                    <li key={item.id} className="flex items-center justify-between py-2.5">
                      <span className="text-foreground">
                        {item.color.colorName} {GARMENTS[item.garmentType]?.label ?? item.garmentType}
                      </span>
                      <span className="tabular-nums text-muted-foreground">{timesWorn}×</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>

            <Reveal delay={0.18}>
              <Panel title={`Never worn (${data.orphans.length})`}>
                {data.orphans.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Every piece has been worn — no wardrobe orphans.</p>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {data.orphans.map((i) => (
                      <li
                        key={i.id}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {i.color.colorName} {GARMENTS[i.garmentType]?.label ?? i.garmentType}
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
            </Reveal>
          </div>
        )}
      </div>
    </div>
  );
}
