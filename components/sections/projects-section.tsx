"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { workProjects } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

// ── 3D Tilt card ──────────────────────────────────────────────────────────────
type Project = { name: string; tagline: string; description: string; tech: readonly string[] | string[]; repo?: string; demo?: string; period?: string; image?: string | null };
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasDemo = project.demo && project.demo !== "#";

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't trigger if clicking a link/button inside
    if ((e.target as HTMLElement).closest("a, button")) return;
    if (!hasDemo) return;
    const confirmed = window.confirm(`Open "${project.name}"?\n\nThis will open the live project in a new tab.`);
    if (confirmed) window.open(project.demo, "_blank", "noopener,noreferrer");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    gsap.to(card, {
      rotateX: -dy * 6,
      rotateY:  dx * 6,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
    // Image parallax opposite direction
    const img = card.querySelector<HTMLElement>(".project-img-inner");
    if (img) gsap.to(img, { x: dx * -12, y: dy * -12, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    const img = card.querySelector<HTMLElement>(".project-img-inner");
    if (img) gsap.to(img, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
  };

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className="project-card bg-card border border-border rounded-2xl overflow-hidden will-change-transform"
      style={{ transformStyle: "preserve-3d", cursor: hasDemo ? "pointer" : "default" }}
      data-cursor-label={hasDemo ? "VIEW" : "SOON"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image */}
        <div className={`project-img-wrap lg:w-1/2 min-h-[280px] bg-gradient-to-br overflow-hidden relative flex-shrink-0
            ${isEven ? "from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-900/20"
                     : "from-violet-50 to-purple-100 dark:from-violet-950/30 dark:to-purple-900/20"}
            ${!isEven ? "lg:order-last" : ""}`
        }>
          <div className="project-img-inner absolute inset-0 flex items-center justify-center p-6">
            {project.image ? (
              <div className="relative w-full h-full">
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-2 opacity-20">
                  <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <p className="text-xs opacity-30">Screenshot</p>
              </div>
            )}
          </div>
          {/* Hover overlay */}
          <div className="project-overlay absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/5 pointer-events-none" />
        </div>

        {/* Info */}
        <div className="project-info-panel lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
          <span className="project-number text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
            Project {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-heading text-xl lg:text-2xl font-bold mb-1.5 tracking-tight">
            {project.name}
          </h3>
          <p className="text-primary text-sm font-medium mb-3">{project.tagline}</p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t, j) => (
              <span key={j} className="tech-tag px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground border border-border">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            {project.period?.includes("Present") ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Working on it
              </span>
            ) : null}
            {project.repo && project.repo !== "#" && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                GitHub
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="project-link group/link inline-flex items-center gap-2 text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                <span className="link-text relative">Live Demo</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className="transition-transform duration-300 group-hover/link:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const sec = sectionRef.current;

    // Cards — each animates independently
    sec.querySelectorAll(".project-card").forEach((card, idx) => {
      const isEven = idx % 2 === 0;

      // Card fade + slight slide up
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        }
      );

      // ── Image clip-path wipe from bottom (Amit Sharma style) ──
      const imgWrap  = card.querySelector(".project-img-wrap");
      const imgInner = card.querySelector(".project-img-inner");

      if (imgWrap) {
        gsap.fromTo(
          imgWrap,
          { clipPath: "inset(100% 0 0% 0)" },
          {
            clipPath: "inset(0% 0 0% 0)",
            duration: 1.3,
            ease: "expo.inOut",
            immediateRender: false,
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          }
        );
      }

      // Image inner scales down as it reveals — premium depth effect
      if (imgInner) {
        gsap.fromTo(
          imgInner,
          { scale: 1.18 },
          {
            scale: 1,
            duration: 1.5,
            ease: "expo.inOut",
            immediateRender: false,
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          }
        );
      }

      // Info panel slides in from the opposite side
      const infoPanel = card.querySelector(".project-info-panel");
      if (infoPanel) {
        gsap.fromTo(
          infoPanel,
          { x: isEven ? 40 : -40, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.9, ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: card, start: "top 82%", once: true },
          }
        );
      }

      // Tech tags elastic pop
      gsap.fromTo(
        card.querySelectorAll(".tech-tag"),
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5, stagger: 0.045,
          ease: "back.out(1.7)",
          immediateRender: false,
          scrollTrigger: { trigger: card, start: "top 80%", once: true },
        }
      );

      // Project number counter reveal
      const numEl = card.querySelector(".project-number");
      if (numEl) {
        gsap.fromTo(
          numEl,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          }
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="pb-[60px] lg:pb-[80px] pt-6">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="space-y-6">
          {workProjects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
