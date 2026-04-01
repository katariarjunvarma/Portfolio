"use client";

import { siteConfig } from "@/lib/site";

export default function ResumePage() {
  const handleClose = () => {
    // If opened as a new tab, close it; otherwise go home
    if (window.history.length <= 1) {
      window.close();
    } else {
      window.close();
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background" style={{ zIndex: 200 }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-card border-b border-border flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Close
          </button>
          <span className="text-border">|</span>
          <span className="font-heading font-semibold text-sm text-foreground">
            Resume — Katari Arjun Varma
          </span>
        </div>
        <a
          href={siteConfig.resumePath}
          download="Arjun-Varma-Resume.pdf"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download
        </a>
      </div>

      {/* PDF viewer */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src={siteConfig.resumePath}
          className="w-full h-full border-0"
          title="Arjun Varma Resume"
        />
      </div>
    </div>
  );
}
