"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { sectionLinks } from "@/lib/site";
import gsap from "gsap";

// ── CV Gate Modal ─────────────────────────────────────────────────────────────
function CVGateModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);

    // Open CV immediately — must be synchronous to avoid popup blocker
    window.open("/resume", "_blank", "noopener,noreferrer");
    onClose();

    // Send notification in background (non-blocking)
    const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" });
    fetch("/api/cv-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, time: now }),
    }).catch(() => {/* silent */});
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 200, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm mx-4 shadow-2xl">
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-bold mb-1">One quick step</h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Drop your email to view the CV.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            autoFocus
          />
          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={sending}
              className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {sending ? "Opening…" : "Open CV →"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
        <p className="text-xs text-muted-foreground/60 mt-4 text-center">
          Your email is only used to notify me — never shared.
        </p>
      </div>
    </div>
  );
}

// ── Theme Toggle ──────────────────────────────────────────────────────────────
function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button onClick={toggle} className="theme-toggle-btn" aria-label="Toggle theme">
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cvGateOpen, setCvGateOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(link.id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      const links = mobileMenuRef.current.querySelectorAll(".mobile-menu-link");
      gsap.fromTo(links, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out", delay: 0.1 });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${scrolled ? "nav-glass py-3" : "py-5 bg-transparent"}`}
        style={{ zIndex: 80 }}
      >
        <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between">
          <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="font-heading font-bold text-lg text-foreground tracking-tight">
            Arjun Varma
          </a>

          <div className="hidden md:flex items-center gap-8">
            {sectionLinks.filter((l) => l.id !== "hero").map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`nav-link text-sm font-medium ${activeSection === link.id ? "active" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCvGateOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200"
            >
              View CV
            </button>
            <ThemeToggle />
            <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <span className="w-6 h-0.5 bg-foreground rounded-full" />
              <span className="w-6 h-0.5 bg-foreground rounded-full" />
              <span className="w-4 h-0.5 bg-foreground rounded-full" />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div ref={mobileMenuRef} className="mobile-menu" style={{ zIndex: 90 }}>
          <button onClick={() => setMobileOpen(false)} className="absolute top-5 right-6 p-2" aria-label="Close menu">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {sectionLinks.map((link) => (
            <a key={link.id} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="mobile-menu-link font-heading">
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setMobileOpen(false); setCvGateOpen(true); }}
            className="mobile-menu-link font-heading text-left"
          >
            View CV
          </button>
        </div>
      )}

      {cvGateOpen && <CVGateModal onClose={() => setCvGateOpen(false)} />}
    </>
  );
}
