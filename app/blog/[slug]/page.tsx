import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/site";
import { BackButton } from "./back-button";

// Generate static paths for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Arjun Varma`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Sort all posts by date (newest first) to find prev/next
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentIndex = sorted.findIndex((p) => p.slug === slug);
  const prev = sorted[currentIndex + 1] ?? null;
  const next = sorted[currentIndex - 1] ?? null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-[820px] mx-auto px-6 h-14 flex items-center justify-between">
          <BackButton />
          <span className="text-xs font-medium text-muted-foreground">{post.readTime}</span>
        </div>
      </header>

      {/* ── Article ── */}
      <main className="max-w-[820px] mx-auto px-6 py-14 lg:py-20">

        {/* Meta */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-4">
            {post.category}
          </span>
          <h1 className="font-heading text-3xl lg:text-5xl font-bold tracking-tight leading-tight mb-5">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary/40 pl-5 mb-12 italic">
          {post.excerpt}
        </p>

        {/* Content */}
        <article className="prose-blog space-y-6">
          {post.content.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="font-heading text-xl lg:text-2xl font-bold mt-12 mb-3 text-foreground first:mt-0">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p key={i} className="text-base lg:text-[17px] leading-[1.85] text-foreground/85">
                {block}
              </p>
            );
          })}
        </article>

        {/* Author strip */}
        <div className="mt-16 pt-8 border-t border-border flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-base flex-shrink-0">
            AV
          </div>
          <div>
            <p className="text-sm font-semibold">Arjun Varma</p>
            <p className="text-xs text-muted-foreground">AI & Machine Learning Engineer · LPU</p>
          </div>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 flex flex-col gap-1"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                  Previous
                </span>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{prev.title}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 flex flex-col gap-1 text-right"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                  Next
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </span>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{next.title}</span>
              </Link>
            ) : <div />}
          </div>
        )}

        {/* Back home */}
        <div className="mt-10 text-center">
          <BackButton />
        </div>
      </main>
    </div>
  );
}
