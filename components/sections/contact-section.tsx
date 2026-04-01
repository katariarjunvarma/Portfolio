"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/katariarjunvarma",
    fill: true,
    d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/karjunvarma",
    fill: true,
    d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/arjunvarma_k?igsh=eDF3aXgzOGUyeGVn&utm_source=qr",
    fill: false,
    stroke: true,
  },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const sec = sectionRef.current;

    gsap.fromTo(sec.querySelector(".contact-label"),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: sec, start: "top 82%", once: true } }
    );

    const heading = sec.querySelector<HTMLElement>(".contact-heading");
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

    gsap.fromTo(sec.querySelector(".contact-form"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: sec.querySelector(".contact-form"), start: "top 85%", once: true } }
    );
    gsap.fromTo(sec.querySelector(".contact-info"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1,
        immediateRender: false,
        scrollTrigger: { trigger: sec.querySelector(".contact-info"), start: "top 85%", once: true } }
    );
  }, { scope: sectionRef });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSent(true);
        form.reset();
        setTimeout(() => setSent(false), 4000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-[60px] lg:py-[80px]">
      <div className="max-w-[1320px] mx-auto px-6">
        <p className="contact-label text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-5">
          Contact
        </p>
        <h2 className="contact-heading font-heading text-4xl lg:text-6xl font-bold tracking-tight mb-16 overflow-hidden">
          Let&apos;s Work Together
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Form */}
          <form onSubmit={handleSubmit} className="contact-form space-y-6">
            <div className="form-field">
              <input type="text" id="name" name="name" placeholder=" " required className="peer" />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-field">
              <input type="email" id="email" name="email" placeholder=" " required className="peer" />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-field">
              <input type="text" id="subject" name="subject" placeholder=" " className="peer" />
              <label htmlFor="subject">Subject</label>
            </div>
            <div className="form-field">
              <textarea id="message" name="message" rows={5} placeholder=" " required className="peer" />
              <label htmlFor="message">Message</label>
            </div>
            <button type="submit" className="btn-primary w-full sm:w-auto" disabled={sending || sent}>
              {sent ? "Message Sent!" : sending ? "Sending…" : "Send Message"}
              {!sent && !sending && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              )}
            </button>
            {error && (
              <p className="text-sm text-red-500">Something went wrong. Please email me directly at {siteConfig.email}</p>
            )}
          </form>

          {/* Info */}
          <div className="contact-info">
            <p className="text-lg text-muted-foreground mb-10 leading-[1.8]">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities.
              Feel free to reach out through the form or any channel below.
            </p>

            <div className="space-y-6 mb-10">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Email</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-foreground font-medium hover:text-primary transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="10" r="3" />
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-foreground font-medium">Phagwara, Punjab — India</p>
                </div>
              </div>

              {/* Education */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Education</p>
                  <p className="text-foreground font-medium">B.Tech CSE (AI &amp; ML) · LPU</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary hover:-translate-y-1 hover:shadow-lg"
                  aria-label={s.label}
                >
                  {s.label === "Instagram" ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d={s.d} />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
