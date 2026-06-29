import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Armoire terms of use — a free, no-AI, local-first wardrobe builder. Copyright, prohibited uses, and liability.",
};

export default function TermsPage() {
  return (
    <div className="prose prose-neutral mx-auto max-w-prose py-16 dark:prose-invert sm:py-20">
      <p className="label-text mb-3">Legal</p>
      <h1>Terms of Use</h1>
      <p className="text-sm text-muted-foreground">Effective date: 29 June 2026</p>

      <h2>1. Acceptance</h2>
      <p>
        By using Armoire (&ldquo;the App&rdquo;), you agree to these Terms of Use. If you do not
        agree, do not use the App.
      </p>

      <h2>2. Intellectual property</h2>
      <p>
        All content and code in Armoire, including text, design, layout, graphics, SVG
        silhouettes, colour algorithms, and pattern logic, is the intellectual property of Ahmed
        Hussain and is protected by Australian and international copyright law.
      </p>
      <p>Copyright &copy; Ahmed Hussain. All rights reserved.</p>

      <h2>3. Prohibited uses</h2>
      <p>You expressly agree that you will not, without prior written permission:</p>
      <ul>
        <li>Scrape, crawl, or otherwise automatically extract content from the App</li>
        <li>
          Use any content from the App to train, fine-tune, or otherwise develop artificial
          intelligence or machine learning models
        </li>
        <li>
          Ingest any content into vector databases, embedding stores, or similar retrieval
          systems for AI purposes
        </li>
        <li>Reproduce, redistribute, or republish content without attribution and permission</li>
        <li>Create derivative works based on content from the App</li>
        <li>
          Use the App in any manner that could interfere with its operation or impose an
          unreasonable load on its infrastructure
        </li>
      </ul>

      <h2>4. AI and automated systems</h2>
      <p>
        All content in the App is copyrighted and may not be reproduced, redistributed, scraped,
        indexed for AI training, used in machine learning datasets, or incorporated into
        generative AI systems without prior written permission from Ahmed Hussain.
      </p>
      <p>
        Operators of AI crawlers and large language model training pipelines are on notice that
        access to the App for the purpose of data collection is prohibited. This prohibition is
        reflected in the App&apos;s robots.txt file and HTTP response headers.
      </p>

      <h2>5. No warranty</h2>
      <p>
        The App is provided &ldquo;as is&rdquo; without warranty of any kind. While I make
        reasonable efforts to ensure it works correctly, I make no representations as to its
        suitability, reliability, or availability.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the extent permitted by law, Ahmed Hussain excludes all liability for loss or damage
        of any kind arising from your use of the App or reliance on its content.
      </p>

      <h2>7. Governing law</h2>
      <p>
        These Terms are governed by the laws of the Australian Capital Territory, Australia. Any
        dispute arising from these Terms will be subject to the jurisdiction of the courts of the
        ACT.
      </p>

      <h2>8. Contact</h2>
      <p>
        For permissions or queries regarding these Terms, contact:{" "}
        <a href="mailto:ahmedyhussain07@gmail.com">ahmedyhussain07@gmail.com</a>
      </p>
    </div>
  );
}
