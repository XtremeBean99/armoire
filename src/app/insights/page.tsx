"use client";
import { useEffect, useMemo } from "react";
import { useWardrobe, wardrobeStore } from "@/lib/wardrobe-store/instance";
import { computeInsights } from "@/lib/insights/insights";
import { EmptyState } from "@/components/EmptyState";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function InsightsPage() {
  const items = useWardrobe((s) => s.items);
  useEffect(() => { void wardrobeStore.getState().load(); }, []);
  const data = useMemo(() => computeInsights(items), [items]);
  if (items.length === 0) return <main className="p-6"><EmptyState title="No data yet" hint="Add and wear items to see insights." /></main>;

  return (
    <main className="space-y-8 p-6">
      <section>
        <h2 className="mb-2 font-semibold">Most worn colours</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.colorDistribution}>
            <XAxis dataKey="hueFamily" /><YAxis allowDecimals={false} /><Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </section>
      <section>
        <h2 className="mb-2 font-semibold">Cost per wear</h2>
        <ul className="text-sm">
          {data.costPerWear.map(({ item, cpw }) => (
            <li key={item.id}>{item.color.colorName} {item.garmentType}: {cpw.toFixed(2)} / wear</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-2 font-semibold">Never worn ({data.orphans.length})</h2>
        <ul className="text-sm">{data.orphans.map((i) => <li key={i.id}>{i.color.colorName} {i.garmentType}</li>)}</ul>
      </section>
    </main>
  );
}
