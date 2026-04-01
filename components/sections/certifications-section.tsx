"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { certifications } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const sec = sectionRef.current;

    gsap.fromTo(sec.querySelector(".cert-label"),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: sec, start: "top 82%", once: true } }
    );

    const heading = sec.querySelector<HTMLElement>(".cert-heading");
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

    gsap.fromTo(sec.querySelectorAll(".cert-card"),
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: sec.querySelector(".cert-grid"), start: "top 85%", once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="certifications" className="py-[60px] lg:py-[80px]">
      <div className="max-w-[1320px] mx-auto px-6">
        <p className="cert-label text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-5">
          Certifications
        </p>
        <h2 className="cert-heading font-heading text-4xl lg:text-6xl font-bold tracking-tight mb-16 overflow-hidden">
          Credentials & Certificates
        </h2>

        <div className="cert-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <div key={i}
              className="cert-card group bg-card border border-border rounded-2xl p-7
                         transition-all duration-400 hover:-translate-y-2
                         hover:border-primary/30 hover:shadow-xl hover:shadow-black/6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5
                              transition-colors duration-300 group-hover:bg-primary/15">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="text-primary">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <h3 className="font-heading text-base font-bold mb-1 leading-snug">{cert.title}</h3>
              <p className="text-muted-foreground text-sm mb-1">{cert.issuer}</p>
              <p className="text-muted-foreground text-xs mb-5 font-mono">{cert.date}</p>
              {/* [PLACEHOLDER] — update verify URLs */}
              <a href={cert.verifyUrl}
                className="text-primary text-sm font-semibold inline-flex items-center gap-1
                           opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                Verify
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
