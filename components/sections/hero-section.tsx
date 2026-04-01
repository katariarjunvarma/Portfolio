"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface HeroSectionProps {
  preloaderDone: boolean;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 3  && h < 12) return "Good morning,";   // 3 AM – 11:59 AM
  if (h >= 12 && h < 16) return "Good afternoon,"; // 12 PM – 3:59 PM
  if (h >= 16 && h < 20) return "Good evening,";   // 4 PM – 7:59 PM
  return "Hello,";                                  // 8 PM – 2:59 AM
}

// Replace src with real photo paths once images are added to /public/photos/
const PHOTOS: { src: string | null; alt: string; gradient: string }[] = [
  {
    src: "/photos/photo-2.jpg",
    alt: "Arjun Varma — smart casual",
    gradient: "linear-gradient(135deg, hsl(250 80% 93%) 0%, hsl(255 60% 86%) 100%)",
  },
  {
    src: "/photos/photo-1.jpg",
    alt: "Arjun Varma — professional",
    gradient: "linear-gradient(135deg, hsl(217 91% 92%) 0%, hsl(220 60% 85%) 100%)",
  },
  {
    src: "/photos/photo-3.jpg",
    alt: "Arjun Varma — workspace",
    gradient: "linear-gradient(135deg, hsl(200 70% 92%) 0%, hsl(205 55% 85%) 100%)",
  },
];

export function HeroSection({ preloaderDone }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const [greeting] = useState(getGreeting);

  // -1 = none hovered, 0/1/2 = card index hovered
  const [hovered, setHovered] = useState(-1);

  // ── Entrance animation ──────────────────────────────────────────────────
  useEffect(() => {
    if (!preloaderDone || !sectionRef.current) return;
    const sec   = sectionRef.current;
    const lines = sec.querySelectorAll<HTMLElement>(".hero-greet-line");
    const bio   = sec.querySelector<HTMLElement>(".hero-bio");
    const scrollT = sec.querySelector<HTMLElement>(".hero-scroll-invite");
    const scrollI = sec.querySelector<HTMLElement>(".hero-scroll");
    const deck  = sec.querySelector<HTMLElement>(".hero-deck");

    const tl = gsap.timeline({ delay: 0.05 });

    // Card deck rises up
    if (deck) {
      tl.fromTo(
        deck,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        0,
      );
    }

    // Greeting lines clip in
    if (lines.length) {
      tl.fromTo(
        lines,
        { y: "105%", clipPath: "inset(0 0 100% 0)" },
        {
          y: "0%", clipPath: "inset(0 0 0% 0)",
          duration: 1.1, stagger: 0.08,
          ease: "cubic-bezier(0.76, 0, 0.24, 1)",
        },
        "-=0.9",
      );
    }

    if (bio) {
      tl.fromTo(bio, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }
    if (scrollT) {
      tl.fromTo(scrollT, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }
    if (scrollI) {
      tl.fromTo(scrollI, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloaderDone]);

  const greetWords = greeting.split(" ");

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-28 lg:py-0">

        {/* ── LEFT — greeting + bio ──────────────────────────────────── */}
        <div className="min-w-0">
          <h1
            className="font-heading font-bold tracking-tight mb-8 lg:mb-10"
            style={{ fontSize: "clamp(3rem, 5.5vw, 6.5rem)", lineHeight: 0.94, letterSpacing: "-0.03em" }}
          >
            {greetWords.map((word, i) => (
              <span key={i} className="block overflow-hidden leading-[1.0]">
                <span className="hero-greet-line block">{word}</span>
              </span>
            ))}
          </h1>

          <p className="hero-bio text-lg lg:text-xl text-muted-foreground leading-[1.75] max-w-[520px] mb-10 opacity-0">
            I&apos;m <strong className="text-foreground font-semibold">Arjun Varma</strong> — an AI-first engineer.
            I don&apos;t wait for the future; I build it. Every project I touch is driven by one question:{" "}
            <strong className="text-primary font-semibold">how far can we actually push this?</strong>
          </p>

          <p className="hero-scroll-invite text-sm text-muted-foreground opacity-0 flex items-center gap-2">
            <span>Scroll</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
            </svg>
            <span>to view my projects, built just for you.</span>
          </p>
        </div>

        {/* ── RIGHT — 3-photo accordion ────────────────────────────────── */}
        <div className="flex items-center justify-center lg:justify-end py-10 lg:py-0">
          <div
            ref={deckRef}
            className="hero-deck relative opacity-0 flex gap-2"
            style={{ height: "clamp(340px, 46vw, 520px)", width: "100%" }}
          >
            {PHOTOS.map((photo, cardIdx) => (
              <div
                key={cardIdx}
                onMouseEnter={() => setHovered(cardIdx === 0 ? 0 : cardIdx === 1 ? 1 : 2)}
                onMouseLeave={() => setHovered(-1)}
                style={{
                  flex: hovered === cardIdx ? "3 1 0%" : "1 1 0%",
                  transition: "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderRadius: "18px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  boxShadow: hovered === cardIdx
                    ? "0 24px 64px -12px rgba(0,0,0,0.28)"
                    : "0 8px 32px -8px rgba(0,0,0,0.14)",
                }}
              >
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 80vw, 40vw"
                    className="object-cover object-center"
                    priority={cardIdx === 0}
                    style={{
                      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: hovered === cardIdx ? "scale(1.04)" : "scale(1.0)",
                    }}
                  />
                ) : (
                  <div className="w-full h-full" style={{ background: photo.gradient }} />
                )}

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

              </div>
            ))}

          </div>
        </div>
      </div>

    </section>
  );
}
