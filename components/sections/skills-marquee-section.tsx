"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { techStackStrip } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function SkillsMarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current, {
      opacity: 0, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 90%" },
    });
  }, { scope: sectionRef });

  const half = Math.ceil(techStackStrip.length / 2);
  const row1 = techStackStrip.slice(0, half);
  const row2 = techStackStrip.slice(half);

  return (
    <section ref={sectionRef} id="skills" className="py-[60px] lg:py-[80px] overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6 mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4 text-center">
          SKILLS
        </p>
        <h2 className="font-heading text-4xl lg:text-5xl font-bold tracking-tight text-center">
          Tech Stack
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-4">
        <div className="marquee-track marquee-track-left">
          {[...row1, ...row1].map((skill, i) => (
            <div key={i} className="skill-chip">{skill}</div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div>
        <div className="marquee-track marquee-track-right">
          {[...row2, ...row2].map((skill, i) => (
            <div key={i} className="skill-chip">{skill}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
