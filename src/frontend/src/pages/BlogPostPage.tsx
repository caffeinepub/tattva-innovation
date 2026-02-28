import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPostBySlug } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CalendarDays, Clock, User } from "lucide-react";
import { motion } from "motion/react";

// Seed post content
const seedPosts: Record<
  string,
  {
    title: string;
    author: string;
    excerpt: string;
    content: string;
    publishedAt: number;
  }
> = {
  "voter-management-software-india": {
    title:
      "How Voter Management Software is Transforming Political Campaigns in India",
    author: "Tattva Innovation Team",
    excerpt:
      "Discover how modern voter management software is helping political campaigns across India run more efficient, targeted outreach programs.",
    publishedAt: Date.now() - 86400000,
    content: `Political campaigns in India are becoming increasingly data-driven. With millions of voters and complex constituency management, campaign teams need reliable digital tools to stay ahead.

Gone are the days of paper-based voter lists and manual booth management. Modern voter management software allows campaign managers to:

Track voter data at the ward and booth level
Assign and monitor field workers in real time
Send targeted outreach messages to specific voter segments
Analyze polling booth performance and turnout patterns

Why Traditional Methods Fall Short

Managing a constituency of even 50,000 voters manually creates enormous operational challenges. Missed follow-ups, data duplication, and poor coordination between volunteers are common problems that cost campaigns dearly.

What Tattva Innovation's Voter Management Platform Offers

Our platform was built specifically for Indian elections — from Gram Panchayat to Assembly to Parliamentary constituencies. Key features include a secure voter database with search and filter, booth-wise reporting and analytics, volunteer task management, and WhatsApp integration for voter outreach.

The result? Campaign teams using our platform report a 40% improvement in voter contact rates and significantly better booth management on election day.

Getting Started

Ready to modernize your campaign? Our team can have you up and running within 48 hours. Book a free demo to see the platform in action.`,
  },
  "office-visitor-management-system": {
    title: "5 Signs Your Office Needs a Digital Visitor Management System",
    author: "Tattva Innovation Team",
    excerpt:
      "Paper-based visitor registers create security gaps and inefficiencies. Here are 5 clear signs it's time to go digital.",
    publishedAt: Date.now() - 86400000 * 3,
    content: `Still maintaining paper visitor registers? If your office has more than 20 daily visitors, you're losing time and creating security risks. Here are 5 clear signs it's time to upgrade.

Sign 1: You Can't Quickly Find Who Visited Last Month

When management asks "who visited us from XYZ company?" — do you have to flip through pages of handwritten entries? A digital system gives you instant search across months of records.

Sign 2: Your Front Desk is Overwhelmed

Manual check-in slows down your reception and creates queues. Digital visitor management can reduce check-in time from 3–5 minutes to under 30 seconds.

Sign 3: You Have No Proof of Compliance

Many institutions and corporate offices need to demonstrate visitor records for audits, compliance, or security incidents. Paper registers are easily lost, damaged, or tampered with.

Sign 4: You Don't Know Who's in the Building Right Now

In an emergency, can you immediately account for all visitors on premises? A digital system gives you a real-time occupancy dashboard.

Sign 5: Your Competitors Have Already Upgraded

Digital visitor management isn't a luxury anymore — it's expected by professional visitors and clients. It signals that your organization takes security and efficiency seriously.

How Tattva Innovation Can Help

Our Visitor Management System is cloud-based, requires no hardware purchase, and can be deployed in your office within 48 hours. It works on any device and includes a WhatsApp notification feature for host employees.`,
  },
  "affordable-website-small-businesses-india": {
    title:
      "Affordable Website Development for Small Businesses in India: A Complete Guide",
    author: "Tattva Innovation Team",
    excerpt:
      "A step-by-step guide for Indian small business owners looking to get a professional website without breaking the bank.",
    publishedAt: Date.now() - 86400000 * 7,
    content: `Every small business in India deserves a professional online presence. The myth that websites are expensive is exactly that — a myth.

At Tattva Innovation, we've helped hundreds of small businesses get online at prices that make sense for Indian markets.

What Does a Small Business Website Need?

A professional business website doesn't need to be complicated. For most SMEs, the essentials are: a clean homepage that explains what you do, a services or products page, contact information with a WhatsApp button, and basic SEO so customers can find you on Google.

Common Myths About Website Development

Myth: "A good website costs ₹50,000 or more."
Reality: A professional, mobile-friendly website can be built for ₹8,000–₹25,000 depending on complexity.

Myth: "It takes months to build a website."
Reality: A standard business website can go live in 3–7 working days.

Myth: "I need technical knowledge to manage my website."
Reality: Modern CMS platforms and our training means you can update content yourself with zero technical knowledge.

Why Choose a Custom-Built Website Over Templates

Template websites (like Wix or Squarespace) have limitations. Custom-built websites are faster, better optimized for Google search, and can be extended with features specific to your business — like booking forms, catalogs, or payment integration.

Our Website Development Process

Discovery call (30 minutes) → Design wireframes (1 day) → Development (2–5 days) → Review and launch (1 day). Total: 5–7 working days.

Ready to get your business online? Book a free demo and get a website quote within 24 hours.`,
  },
  "ai-automation-indian-smes": {
    title: "AI Automation for Indian SMEs: Where to Start and What to Expect",
    author: "Tattva Innovation Team",
    excerpt:
      "Learn how Indian SMEs are using AI automation to save time, cut costs, and compete with larger organizations.",
    publishedAt: Date.now() - 86400000 * 14,
    content: `Artificial Intelligence is no longer just for large corporations. Indian small and medium enterprises are now leveraging AI to automate repetitive tasks, reduce costs, and make better decisions.

Where Should an SME Start with AI?

The best starting point is identifying your most repetitive, time-consuming tasks. Common wins include: automating data entry from invoices and forms, generating reports from spreadsheet data, automating customer follow-up messages, and streamlining internal approval workflows.

Real Examples from Indian Businesses

A textile trader in Surat automated their inward-outward register and invoice processing, saving 2 hours of manual work per day.

A school in Nagpur automated parent communication — sending fee reminders, attendance updates, and exam schedules automatically via WhatsApp.

A real estate agent network automated lead tracking and follow-up, improving their conversion rate by 30%.

How Much Does AI Automation Cost?

Custom AI automation for SMEs typically costs between ₹15,000 and ₹50,000 depending on complexity. The ROI is usually seen within 2–3 months through time savings and error reduction.

What to Expect from the Implementation

Week 1: Requirement gathering and process mapping.
Week 2: Development and testing.
Week 3: Deployment and training.
Ongoing: Support and refinement.

Getting Started with Tattva Innovation

Book a free consultation and we'll identify the top 3 automation opportunities in your business — at no cost. Our India-based team speaks your language and understands your challenges.`,
  },
};

function PostSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-5 w-full" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="space-y-3 pt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className={`h-4 ${i === 3 ? "w-4/5" : "w-full"}`} />
        ))}
      </div>
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const { data: post, isLoading } = useGetPostBySlug(slug);

  const seedPost = seedPosts[slug];
  const resolvedPost =
    post ??
    (seedPost
      ? {
          id: BigInt(0),
          title: seedPost.title,
          slug,
          content: seedPost.content,
          excerpt: seedPost.excerpt,
          author: seedPost.author,
          publishedAt: BigInt(seedPost.publishedAt * 1_000_000),
          isPublished: true,
        }
      : null);

  const formattedDate = resolvedPost?.publishedAt
    ? new Date(Number(resolvedPost.publishedAt) / 1_000_000).toLocaleDateString(
        "en-IN",
        { year: "numeric", month: "long", day: "numeric" },
      )
    : null;

  const readingTime = resolvedPost
    ? Math.ceil(resolvedPost.content.split(" ").length / 200)
    : 0;

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </motion.div>

          {isLoading ? (
            <PostSkeleton />
          ) : !resolvedPost ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="font-display text-3xl font-bold text-foreground mb-3">
                Post Not Found
              </h1>
              <p className="text-[#374151] mb-8">
                The blog post you're looking for doesn't exist or has been
                removed.
              </p>
              <Button asChild>
                <Link to="/blog">Browse All Posts</Link>
              </Button>
            </motion.div>
          ) : (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                {resolvedPost.title}
              </h1>

              {resolvedPost.excerpt && (
                <p className="text-[#374151] text-lg leading-relaxed mb-6 border-l-4 border-primary pl-4">
                  {resolvedPost.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                {resolvedPost.author && (
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {resolvedPost.author}
                  </span>
                )}
                {formattedDate && (
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4" />
                    {formattedDate}
                  </span>
                )}
                {readingTime > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {readingTime} min read
                  </span>
                )}
              </div>

              {/* Render content as paragraphs */}
              <div className="prose prose-slate max-w-none">
                {resolvedPost.content.split("\n\n").map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    className="text-[#374151] leading-relaxed mb-5"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* CTA at end */}
              <div className="mt-12 p-8 bg-accent rounded-2xl border border-border/50">
                <h3 className="font-display font-bold text-foreground text-xl mb-2">
                  Ready to Get Started?
                </h3>
                <p className="text-[#374151] text-sm mb-5">
                  Book a free demo and see how Tattva Innovation can transform
                  your organization.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    className="bg-primary text-primary-foreground font-semibold"
                  >
                    <Link to="/" hash="contact">
                      Book Free Demo
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href="https://wa.me/9822422123"
                      target="_blank"
                      rel="noreferrer"
                      className="border-brand-whatsapp text-brand-whatsapp hover:bg-brand-whatsapp/10"
                    >
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>
          )}
        </div>
      </div>
    </main>
  );
}
