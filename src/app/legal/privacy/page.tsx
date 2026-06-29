import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Armoire privacy policy - how your data stays on your device, with no accounts, no tracking, and no uploads.",
};

export default function PrivacyPage() {
  return (
    <div className="prose prose-neutral mx-auto max-w-prose py-16 dark:prose-invert sm:py-20">
      <p className="label-text mb-3">Legal</p>
      <h1>Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">Effective date: 29 June 2026</p>

      <h2>1. Overview</h2>
      <p>
        Armoire is a local-first wardrobe builder. This Privacy Policy explains what data the app
        handles and how it stays private. I am committed to transparency and compliance with the
        Australian Privacy Act 1988 (Cth).
      </p>

      <h2>2. Information collected</h2>
      <p>Armoire does not collect, transmit, or store any personal information on any server.</p>
      <ul>
        <li>No accounts are required and none exist.</li>
        <li>The app does not ask for your name, email address, or any identifying details.</li>
        <li>No IP address, browser fingerprint, or device identifier is logged.</li>
        <li>No cookies, tracking pixels, or analytics scripts are used (beyond anonymous,
        aggregated Vercel Speed Insights, which does not use cookies and does not identify you).</li>
      </ul>

      <h2>3. Local data</h2>
      <p>
        Your wardrobe - garments, colours, outfits, and insights - is stored entirely in your
        browser using IndexedDB. That data never leaves your device. You can delete it at any
        time by clearing your browser data for this site.
      </p>

      <h2>4. Weather</h2>
      <p>
        The optional weather feature makes a request to a public weather API using only your
        approximate city name (no GPS coordinates). This request does not include any personal
        data or wardrobe data. If you do not use the weather feature, no request is made.
      </p>

      <h2>5. Third parties</h2>
      <p>
        No third-party services receive your wardrobe data. The app is hosted on Vercel; Vercel
        may collect anonymous infrastructure metrics as part of their platform operation, as
        described in their own privacy policy.
      </p>

      <h2>6. Your rights</h2>
      <p>
        Because Armoire stores no data about you on any server, there is no account to access,
        correct, or delete - all the data is already under your control on your own device. You
        may contact me with any questions at the address below.
      </p>

      <h2>7. Contact</h2>
      <p>
        Privacy enquiries:{" "}
        <a href="mailto:ahmedyhussain07@gmail.com">ahmedyhussain07@gmail.com</a>
      </p>
    </div>
  );
}
