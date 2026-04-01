"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { keyMetrics } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);


export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const sec = sectionRef.current;

    // Section label — char stagger
    const label = sec.querySelector(".about-label");
    if (label) {
      const chars = label.textContent!.split("").map((c) => {
        const s = document.createElement("span");
        s.style.display = "inline-block";
        s.textContent = c === " " ? "\u00A0" : c;
        return s;
      });
      label.textContent = "";
      chars.forEach((c) => label.appendChild(c));
      gsap.fromTo(
        chars,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: sec, start: "top 82%", once: true },
        }
      );
    }

    // Heading clip-reveal word by word
    const heading = sec.querySelector<HTMLElement>(".about-heading");
    if (heading) {
      const words = heading.textContent!.trim().split(" ");
      heading.innerHTML = words.map((w) =>
        `<span class="word-outer"><span class="word-inner">${w}</span></span>`
      ).join(" ");
      gsap.fromTo(
        heading.querySelectorAll(".word-inner"),
        { y: "100%", clipPath: "inset(0 0 100% 0)" },
        {
          y: "0%", clipPath: "inset(0 0 0% 0)",
          duration: 0.9, stagger: 0.07,
          ease: "cubic-bezier(0.76, 0, 0.24, 1)",
          immediateRender: false,
          scrollTrigger: { trigger: heading, start: "top 85%", once: true },
        }
      );
    }

    // Body paragraphs — slide + skew reveal (Amit Sharma style)
    sec.querySelectorAll(".about-para").forEach((para, i) => {
      gsap.fromTo(
        para,
        { y: 50, opacity: 0, skewY: 1.5 },
        {
          y: 0, opacity: 1, skewY: 0,
          duration: 0.95, ease: "power3.out",
          delay: i * 0.13,
          immediateRender: false,
          scrollTrigger: { trigger: sec, start: "top 78%", once: true },
        }
      );
    });

    // Large faint background text that slides up while scrolling
    const bgText = sec.querySelector<HTMLElement>(".about-bg-text");
    if (bgText) {
      gsap.fromTo(
        bgText,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.4, ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: sec, start: "top 90%", once: true },
        }
      );
    }

    // Photo — clip wipe from bottom
    const photo = sec.querySelector(".about-photo");
    if (photo) {
      gsap.fromTo(
        photo,
        { clipPath: "inset(100% 0 0 0)", scale: 1.05 },
        {
          clipPath: "inset(0% 0 0 0)", scale: 1,
          duration: 1.1, ease: "expo.inOut",
          immediateRender: false,
          scrollTrigger: { trigger: photo, start: "top 85%", once: true },
        }
      );
    }

    // Stats — count up
    sec.querySelectorAll<HTMLElement>(".stat-number").forEach((el) => {
      const target = parseInt(el.dataset.value || "0", 10);
      const suffix = el.dataset.suffix || "";
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target, duration: 1.8, ease: "power3.out",
        immediateRender: false,
        onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    // Divider line
    const line = sec.querySelector(".stat-line");
    if (line) {
      gsap.fromTo(line,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.out", transformOrigin: "left",
          immediateRender: false,
          scrollTrigger: { trigger: line, start: "top 90%", once: true } }
      );
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden">

      {/* ── Content + photo row — photo bleeds to right edge ── */}
      <div className="relative overflow-hidden">

        {/* Photo: full height of text panel, bleeds to right edge */}
        <div
          className="about-photo hidden lg:block absolute top-0 right-0 bottom-0 w-[42%]"
          style={{ clipPath: "inset(0 0 0 0)" }}
        >
          <Image
            src="/photos/about.jpg"
            alt="Arjun Varma"
            fill
            sizes="42vw"
            className="object-cover object-[center_15%]"
            priority
          />
          {/* Gradient fade on left */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          {/* Gradient fade on bottom */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>

        {/* Text content — left half */}
        <div className="max-w-[1320px] mx-auto px-6 pt-[100px] pb-[100px] lg:pt-[140px] lg:pb-[130px] relative" style={{ zIndex: 1 }}>
          <p className="about-label text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-5">
            About
          </p>
          <h2 className="about-heading font-heading text-4xl lg:text-6xl font-bold tracking-tight mb-8 overflow-hidden pb-2">
            Know me better
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="about-para text-lg text-muted-foreground leading-[1.8]">
                I&apos;m a CSE student specialising in AI/ML at LPU — with an obsession for pushing every
                system to its absolute limit.
              </p>
              <p className="about-para text-lg text-muted-foreground leading-[1.8]">
                I&apos;m the kind of engineer who doesn&apos;t stop at understanding: I run the
                model, break it on purpose, rebuild it better, and ship.
              </p>
              <p className="about-para text-lg text-muted-foreground leading-[1.8]">
                My process has stayed the same since day one — find a hard problem, understand it
                fully, then apply every intelligent tool available until something ships. I use AI
                through every layer of that process, because figuring things out slowly was never
                something I had patience for.
              </p>
            </div>
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="max-w-[1320px] mx-auto px-6 pb-[60px] lg:pb-[80px]">
        <div className="stat-line h-px bg-border mb-8" style={{ transformOrigin: "left", transform: "scaleX(0)" }} />
        <div className="grid grid-cols-3 gap-8">
          {keyMetrics.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="stat-number font-heading text-5xl lg:text-6xl font-bold text-foreground mb-2"
                data-value={stat.value}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
