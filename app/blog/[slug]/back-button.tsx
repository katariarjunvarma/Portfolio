"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  useEffect(() => {
    // If the blog post tab was refreshed (not navigated to from the portfolio),
    // redirect to the homepage instead of staying on the isolated blog page.
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === "reload") {
      router.replace("/");
    }
  }, [router]);

  const handleBack = () => {
    window.close();
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      Back
    </button>
  );
}
