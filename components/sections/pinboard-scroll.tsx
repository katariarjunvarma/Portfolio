"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { certifications } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const TAPE_COLORS = ["hsl(217 91% 53%)", "#E85D4A", "#F5C842", "#6C3FC5", "#2BAC76", "#1A1A1A"];
const ROTATIONS  = [-2.5, 1.8, -1.2, 2.2, -3, 1.5, -2, 2.8];

// ── Certificate lightbox modal ─────────────────────────────────────────────────
function CertModal({ title, image, onClose }: { title: string; image?: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl bg-card">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {image ? (
          <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
            <Image src={image} alt={title} fill sizes="(max-width:768px) 100vw,768px" className="object-contain" priority />
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">No image available</div>
        )}
        <div className="px-5 py-3 border-t border-border">
          <p className="font-heading font-semibold text-sm text-foreground">{title}</p>
        </div>
      </div>
    </div>
  );
}

// ── Pinboard card ──────────────────────────────────────────────────────────────
function PinboardCard({ title, issuer, date, description, image, index, onView }: {
  title: string; issuer: string; date: string; description: string;
  image?: string; index: number; onView: () => void;
}) {
  const rotation  = ROTATIONS[index % ROTATIONS.length];
  const tapeColor = TAPE_COLORS[index % TAPE_COLORS.length];
  const tapeAngle = (index % 2 === 0 ? -8 : 6) + (index % 3 === 0 ? 3 : 0);

  return (
    <div
      className="pinboard-card flex-shrink-0 relative"
      style={{ width: "clamp(220px, 22vw, 280px)", transform: `rotate(${rotation}deg)`, transformOrigin: "center center" }}
    >
      <div className="absolute left-1/2 -top-3 z-10 rounded-sm"
        style={{ width: "clamp(48px,7vw,68px)", height: "20px", background: tapeColor, transform: `translateX(-50%) rotate(${tapeAngle}deg)`, opacity: 0.9 }}
      />
      <div className="bg-card rounded-[12px] overflow-hidden shadow-[0_8px_40px_-8px_rgba(0,0,0,0.18)] border border-border/40 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl">
        {/* Image area — click handled here, stopPropagation so drag wrapper doesn't swallow it */}
        <div
          className="group relative w-full bg-white"
          style={{ aspectRatio: "4/3", cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); onView(); }}
        >
          {image ? (
            <Image src={image} alt={title} fill sizes="(max-width:768px) 90vw,280px" className="object-contain p-2" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,hsl(217 91% 94%),hsl(220 60% 88%))" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-20">
                <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
              View
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-[0.18em] text-primary font-semibold">{issuer}</span>
            <span className="text-[10px] text-muted-foreground">{date}</span>
          </div>
          <h3 className="font-heading font-bold text-sm leading-tight text-foreground mb-1.5">{title}</h3>
          <p className="text-xs text-muted-foreground leading-snug line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────────
export function PinboardScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [activeCert, setActiveCert] = useState<{ title: string; image?: string } | null>(null);

  const xPos       = useRef(0);
  const halfWidth  = useRef(0);
  const isHovering = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragMoved  = useRef(0); // total px moved during this pointer-down session
  const SPEED      = 1.2;       // px per frame

  // Keep ticker fn in ref so we can remove it
  const tickerFn = useRef<(() => void) | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header  = headerRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    if (header) {
      gsap.fromTo(header, { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", immediateRender: false,
          scrollTrigger: { trigger: section, start: "top 80%", once: true, scroller: document.documentElement } });
    }
    gsap.fromTo(track.querySelectorAll(".pinboard-card"),
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.07, ease: "power3.out", immediateRender: false,
        scrollTrigger: { trigger: section, start: "top 75%", once: true, scroller: document.documentElement } });

    const t = setTimeout(() => {
      halfWidth.current = track.scrollWidth / 2;
      gsap.set(track, { x: 0 });
      xPos.current = 0;

      tickerFn.current = () => {
        if (isHovering.current || isDragging.current) return;
        xPos.current -= SPEED;
        if (xPos.current <= -halfWidth.current) xPos.current += halfWidth.current;
        gsap.set(track, { x: xPos.current });
      };
      gsap.ticker.add(tickerFn.current);
    }, 250);

    return () => {
      clearTimeout(t);
      if (tickerFn.current) gsap.ticker.remove(tickerFn.current);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Arrow navigation — scroll by one card width with smooth animation
  const scrollBy = useCallback((dir: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const CARD_STEP = 292; // card width + gap
    xPos.current += dir === "right" ? CARD_STEP : -CARD_STEP;
    if (xPos.current > 0) xPos.current -= halfWidth.current;
    if (xPos.current < -halfWidth.current) xPos.current += halfWidth.current;
    gsap.to(track, { x: xPos.current, duration: 0.5, ease: "power2.out",
      onUpdate: () => { xPos.current = gsap.getProperty(track, "x") as number; }
    });
  }, []);

  // Hover
  const onMouseEnter = useCallback(() => { isHovering.current = true; }, []);
  const onMouseLeave = useCallback(() => { isHovering.current = false; isDragging.current = false; }, []);

  // Drag
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Don't start drag on button clicks (arrows)
    if ((e.target as HTMLElement).closest("button")) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragMoved.current  = 0;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.clientX - dragStartX.current;
    dragMoved.current += Math.abs(dx);
    dragStartX.current = e.clientX;
    xPos.current += dx;
    if (xPos.current > 0) xPos.current -= halfWidth.current;
    if (xPos.current < -halfWidth.current) xPos.current += halfWidth.current;
    gsap.set(trackRef.current, { x: xPos.current });
  }, []);

  const onPointerUp = useCallback(() => { isDragging.current = false; }, []);

  const allCards = certifications.map((c) => ({
    title: c.title, issuer: c.issuer, date: c.date,
    description: (c as { description?: string }).description ?? "",
    image: (c as { image?: string }).image,
  }));

  return (
    <>
      <section ref={sectionRef} id="showcase" className="pinboard-section bg-[hsl(0_0%_96%)] dark:bg-[hsl(0_0%_6%)] py-10">

        {/* Header */}
        <div ref={headerRef} className="text-center pb-10 px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">Certifications</p>
          <h2 className="font-heading font-bold tracking-tight" style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}>
            Credentials &amp; Certificates
          </h2>
        </div>

        {/* Marquee + arrow controls */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scrollBy("right")}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            aria-label="Scroll left"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scrollBy("left")}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            aria-label="Scroll right"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Scrolling track */}
          <div
            className="overflow-hidden select-none cursor-grab active:cursor-grabbing"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div
              ref={trackRef}
              className="flex items-center gap-12 px-8 pb-14 pt-6"
              style={{ width: "max-content", willChange: "transform" }}
            >
              {[...allCards, ...allCards].map((card, i) => (
                <PinboardCard
                  key={i}
                  index={i % allCards.length}
                  title={card.title}
                  issuer={card.issuer}
                  date={card.date}
                  description={card.description}
                  image={card.image}
                  onView={() => {
                    // Only open modal when it's a real click (< 8px movement)
                    if (dragMoved.current < 8) {
                      setActiveCert({ title: card.title, image: card.image });
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeCert && (
        <CertModal title={activeCert.title} image={activeCert.image} onClose={() => setActiveCert(null)} />
      )}
    </>
  );
}
