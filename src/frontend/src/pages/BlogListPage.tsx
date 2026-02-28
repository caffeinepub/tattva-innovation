import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublishedPosts } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarDays, User } from "lucide-react";
import { motion } from "motion/react";
import type { BlogPost } from "../backend.d";

function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-border space-y-4">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const date = post.publishedAt
    ? new Date(Number(post.publishedAt) / 1_000_000).toLocaleDateString(
        "en-IN",
        { year: "numeric", month: "long", day: "numeric" },
      )
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group block bg-white rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-3">
            <Badge
              variant="secondary"
              className="text-xs bg-accent text-primary border-0"
            >
              Article
            </Badge>
          </div>
          <h2 className="font-display font-bold text-foreground text-lg leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-[#374151] text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
            {post.excerpt || `${post.content.slice(0, 140)}...`}
          </p>
          <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {post.author && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {post.author}
                </span>
              )}
              {date && (
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  {date}
                </span>
              )}
            </div>
            <span className="flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all">
              Read <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Seed articles to show when backend has no posts yet
const seedPosts: BlogPost[] = [
  {
    id: BigInt(1),
    title:
      "How Voter Management Software is Transforming Political Campaigns in India",
    slug: "voter-management-software-india",
    content:
      "Political campaigns in India are becoming increasingly data-driven. With millions of voters and complex constituency management, campaign teams need reliable digital tools...",
    excerpt:
      "Discover how modern voter management software is helping political campaigns across India run more efficient, targeted outreach programs.",
    author: "Tattva Innovation Team",
    publishedAt: BigInt(Date.now() * 1_000_000),
    isPublished: true,
  },
  {
    id: BigInt(2),
    title: "5 Signs Your Office Needs a Digital Visitor Management System",
    slug: "office-visitor-management-system",
    content:
      "Still maintaining paper visitor registers? If your office has more than 20 daily visitors, you're losing time and creating security risks...",
    excerpt:
      "Paper-based visitor registers create security gaps and inefficiencies. Here are 5 clear signs it's time to go digital.",
    author: "Tattva Innovation Team",
    publishedAt: BigInt((Date.now() - 86400000 * 3) * 1_000_000),
    isPublished: true,
  },
  {
    id: BigInt(3),
    title:
      "Affordable Website Development for Small Businesses in India: A Complete Guide",
    slug: "affordable-website-small-businesses-india",
    content:
      "Every small business in India deserves a professional online presence. The myth that websites are expensive is exactly that — a myth...",
    excerpt:
      "A step-by-step guide for Indian small business owners looking to get a professional website without breaking the bank.",
    author: "Tattva Innovation Team",
    publishedAt: BigInt((Date.now() - 86400000 * 7) * 1_000_000),
    isPublished: true,
  },
  {
    id: BigInt(4),
    title: "AI Automation for Indian SMEs: Where to Start and What to Expect",
    slug: "ai-automation-indian-smes",
    content:
      "Artificial Intelligence is no longer just for large corporations. Indian small and medium enterprises are now leveraging AI to automate repetitive tasks...",
    excerpt:
      "Learn how Indian SMEs are using AI automation to save time, cut costs, and compete with larger organizations.",
    author: "Tattva Innovation Team",
    publishedAt: BigInt((Date.now() - 86400000 * 14) * 1_000_000),
    isPublished: true,
  },
];

export function BlogListPage() {
  const { data: backendPosts, isLoading } = useGetPublishedPosts();
  const posts =
    backendPosts && backendPosts.length > 0 ? backendPosts : seedPosts;

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-12 md:py-16 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Insights & Resources
          </h1>
          <p className="text-[#374151] text-lg max-w-2xl mx-auto">
            Expert articles on digital transformation, software solutions, and
            technology trends for organizations across India.
          </p>
        </motion.div>

        {/* Posts grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-[#374151] text-lg">
              No blog posts published yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={String(post.id)} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
