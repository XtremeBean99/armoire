export default function AboutPage() {
  return (
    <main className="space-y-3 p-6">
      <h1 className="text-xl font-semibold">About Armoire</h1>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        <li><strong>No AI.</strong> Colours come from deterministic colour science; outfits from explainable colour-theory rules.</li>
        <li><strong>Works offline.</strong> After first load, everything but the optional weather feature runs with no network.</li>
        <li><strong>Free.</strong> No accounts, no API costs. Your wardrobe stays on your device.</li>
      </ul>
    </main>
  );
}
