"use client";

import { useState, useCallback } from "react";
import { GSAPProvider } from "@/components/gsap-provider";
import { Preloader } from "@/components/preloader";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsMarqueeSection } from "@/components/sections/skills-marquee-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";
import { ScrollMarquee } from "@/components/sections/scroll-marquee";
import { CinematicStatement } from "@/components/sections/cinematic-statement";
import { PinboardScroll } from "@/components/sections/pinboard-scroll";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), []);

  return (
    <GSAPProvider>
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      <main className="relative" style={{ zIndex: 10 }}>
        <HeroSection preloaderDone={preloaderDone} />

        {/* ── Scrub marquee strip after hero ── */}
        <ScrollMarquee
          items={["Machine Learning", "Deep Learning", "NLP", "Computer Vision"]}
          direction="left"
          className="py-6 border-y border-border/40"
        />

        <AboutSection />

        {/* ── Second marquee strip (opposite direction) ── */}
        <ScrollMarquee
          items={["Computer Vision", "NLP", "Research", "Always Learning"]}
          direction="right"
          className="py-6 border-y border-border/40"
        />

        <SkillsMarqueeSection />

        {/* ── Projects anchor wraps heading + cards ── */}
        <div id="projects">
          <CinematicStatement
            lines={["Featured", "Work"]}
            label="Projects"
            accentLast={true}
          />
          <ProjectsSection />
        </div>

        {/* ── Gabe Cagara pinboard horizontal scroll ── */}
        <PinboardScroll />

        {/* ── Statement strip before blog ── */}
        <ScrollMarquee
          items={["Writing", "Blog", "Thoughts", "Insights"]}
          direction="left"
          size="sm"
          className="py-5 border-y border-border/40"
        />

        <BlogSection />
        <ContactSection />
        <Footer />
      </main>
    </GSAPProvider>
  );
}
