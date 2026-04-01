"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { blogPosts } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const sec = sectionRef.current;

    gsap.fromTo(sec.querySelector(".blog-label"),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: sec, start: "top 82%", once: true } }
    );

    const heading = sec.querySelector<HTMLElement>(".blog-heading");
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
          duration: 0.9, stagger: 0.08,
          ease: "cubic-bezier(0.76, 0, 0.24, 1)",
          immediateRender: false,
          scrollTrigger: { trigger: heading, start: "top 85%", once: true },
        }
      );
    }

    gsap.fromTo(sec.querySelectorAll(".blog-card"),
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: sec.querySelector(".blog-grid"), start: "top 85%", once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="blog" className="py-[60px] lg:py-[80px]">
      <div className="max-w-[1320px] mx-auto px-6">
        <p className="blog-label text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-5">
          Blog
        </p>
        <h2 className="blog-heading font-heading text-4xl lg:text-6xl font-bold tracking-tight mb-16 overflow-hidden">
          Latest Insights
        </h2>

        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <Link key={i} href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="blog-card group block bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/8 hover:border-primary/20">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="font-heading text-lg font-bold mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3 flex-1">{post.excerpt}</p>
                <span className="text-primary text-sm font-semibold inline-flex items-center gap-1 mt-auto">
                  Read
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className="transition-transform duration-300 group-hover:translate-x-1">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
