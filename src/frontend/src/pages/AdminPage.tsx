import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useCreatePost,
  useCreateTestimonial,
  useDeletePost,
  useDeleteTestimonial,
  useGetAllPosts,
  useGetLeads,
  useGetVisibleTestimonials,
  useIsCallerAdmin,
  useUpdatePost,
  useUpdateTestimonial,
} from "@/hooks/useQueries";
import {
  useGetAllSiteContent,
  useSetSiteContent,
} from "@/hooks/useSiteContent";
import {
  FileText,
  Inbox,
  LayoutTemplate,
  Loader2,
  LogIn,
  LogOut,
  Pencil,
  Plus,
  ShieldAlert,
  Star,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { BlogPost, Lead, Testimonial } from "../backend.d";

// ─── Helpers ───────────────────────────────────────────────────────────────

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatDate(ns: bigint) {
  if (!ns) return "-";
  return new Date(Number(ns) / 1_000_000).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ─── Blog Post Modal ────────────────────────────────────────────────────────

type PostFormData = {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  isPublished: boolean;
};

function defaultPostForm(): PostFormData {
  return {
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    author: "",
    isPublished: false,
  };
}

function PostModal({
  open,
  onClose,
  post,
}: {
  open: boolean;
  onClose: () => void;
  post: BlogPost | null;
}) {
  const [form, setForm] = useState<PostFormData>(
    post
      ? {
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          author: post.author,
          isPublished: post.isPublished,
        }
      : defaultPostForm(),
  );

  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const isPending = createPost.isPending || updatePost.isPending;

  const handleTitleChange = (val: string) => {
    setForm((f) => ({
      ...f,
      title: val,
      slug: post ? f.slug : slugify(val),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (post) {
        await updatePost.mutateAsync({ id: post.id, ...form });
        toast.success("Post updated successfully");
      } else {
        await createPost.mutateAsync(form);
        toast.success("Post created successfully");
      }
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save post");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">
            {post ? "Edit Post" : "New Blog Post"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                required
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Post title..."
              />
            </div>
            <div className="space-y-2">
              <Label>Slug *</Label>
              <Input
                required
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: e.target.value }))
                }
                placeholder="auto-generated-from-title"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Author</Label>
            <Input
              value={form.author}
              onChange={(e) =>
                setForm((f) => ({ ...f, author: e.target.value }))
              }
              placeholder="Author name..."
            />
          </div>
          <div className="space-y-2">
            <Label>Excerpt</Label>
            <Textarea
              value={form.excerpt}
              onChange={(e) =>
                setForm((f) => ({ ...f, excerpt: e.target.value }))
              }
              placeholder="Short summary (shown in listing)..."
              rows={2}
              className="resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label>Content *</Label>
            <Textarea
              required
              value={form.content}
              onChange={(e) =>
                setForm((f) => ({ ...f, content: e.target.value }))
              }
              placeholder="Full post content... (use blank lines to separate paragraphs)"
              rows={10}
              className="resize-y"
            />
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={form.isPublished}
              onCheckedChange={(v) =>
                setForm((f) => ({ ...f, isPublished: v }))
              }
            />
            <Label htmlFor="published" className="cursor-pointer">
              Published
            </Label>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {post ? "Update Post" : "Create Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Blog Posts Tab ─────────────────────────────────────────────────────────

function BlogPostsTab() {
  const { data: posts, isLoading } = useGetAllPosts();
  const deletePost = useDeletePost();
  const [modalOpen, setModalOpen] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);

  const handleEdit = (post: BlogPost) => {
    setEditPost(post);
    setModalOpen(true);
  };

  const handleNew = () => {
    setEditPost(null);
    setModalOpen(true);
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deletePost.mutateAsync(id);
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete post");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-foreground text-xl">
          Blog Posts
        </h2>
        <Button onClick={handleNew} className="gap-2">
          <Plus className="w-4 h-4" /> New Post
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : !posts?.length ? (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No posts yet. Create your first post.</p>
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={String(post.id)}>
                  <TableCell className="font-medium max-w-xs truncate">
                    {post.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {post.author || "-"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={post.isPublished ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {post.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(post.publishedAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleEdit(post)}
                        className="p-1.5 rounded hover:bg-accent transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            type="button"
                            className="p-1.5 rounded hover:bg-destructive/10 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-destructive/70" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{post.title}". This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(post.id)}
                              className="bg-destructive text-destructive-foreground"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <PostModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        post={editPost}
      />
    </div>
  );
}

// ─── Testimonials Tab ───────────────────────────────────────────────────────

type TestimonialFormData = {
  quote: string;
  name: string;
  role: string;
  organization: string;
  isVisible: boolean;
};

function defaultTestimonialForm(): TestimonialFormData {
  return { quote: "", name: "", role: "", organization: "", isVisible: true };
}

function TestimonialModal({
  open,
  onClose,
  testimonial,
}: {
  open: boolean;
  onClose: () => void;
  testimonial: Testimonial | null;
}) {
  const [form, setForm] = useState<TestimonialFormData>(
    testimonial
      ? {
          quote: testimonial.quote,
          name: testimonial.name,
          role: testimonial.role,
          organization: testimonial.organization,
          isVisible: testimonial.isVisible,
        }
      : defaultTestimonialForm(),
  );

  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const isPending = createTestimonial.isPending || updateTestimonial.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (testimonial) {
        await updateTestimonial.mutateAsync({ id: testimonial.id, ...form });
        toast.success("Testimonial updated");
      } else {
        await createTestimonial.mutateAsync(form);
        toast.success("Testimonial created");
      }
      onClose();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save testimonial",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">
            {testimonial ? "Edit Testimonial" : "New Testimonial"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Quote *</Label>
            <Textarea
              required
              value={form.quote}
              onChange={(e) =>
                setForm((f) => ({ ...f, quote: e.target.value }))
              }
              placeholder="Customer quote..."
              rows={4}
              className="resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                required
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Full name"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input
                value={form.role}
                onChange={(e) =>
                  setForm((f) => ({ ...f, role: e.target.value }))
                }
                placeholder="e.g. Campaign Manager"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Organization</Label>
            <Input
              value={form.organization}
              onChange={(e) =>
                setForm((f) => ({ ...f, organization: e.target.value }))
              }
              placeholder="Organization name"
            />
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="visible"
              checked={form.isVisible}
              onCheckedChange={(v) => setForm((f) => ({ ...f, isVisible: v }))}
            />
            <Label htmlFor="visible" className="cursor-pointer">
              Visible on website
            </Label>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {testimonial ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function TestimonialsTab() {
  const { data: testimonials, isLoading } = useGetVisibleTestimonials();
  const deleteTestimonial = useDeleteTestimonial();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);

  const handleEdit = (t: Testimonial) => {
    setEditItem(t);
    setModalOpen(true);
  };

  const handleNew = () => {
    setEditItem(null);
    setModalOpen(true);
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteTestimonial.mutateAsync(id);
      toast.success("Testimonial deleted");
    } catch {
      toast.error("Failed to delete testimonial");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-foreground text-xl">
          Testimonials
        </h2>
        <Button onClick={handleNew} className="gap-2">
          <Plus className="w-4 h-4" /> New Testimonial
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : !testimonials?.length ? (
        <div className="text-center py-12 text-muted-foreground">
          <Star className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No testimonials yet. Add your first one.</p>
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Quote</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((t) => (
                <TableRow key={String(t.id)}>
                  <TableCell className="font-medium">
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-xs truncate">
                    {t.organization || "-"}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-xs">
                    <span className="line-clamp-2">"{t.quote}"</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={t.isVisible ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {t.isVisible ? "Visible" : "Hidden"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleEdit(t)}
                        className="p-1.5 rounded hover:bg-accent transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            type="button"
                            className="p-1.5 rounded hover:bg-destructive/10 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-destructive/70" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Testimonial?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the testimonial from{" "}
                              {t.name}. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(t.id)}
                              className="bg-destructive text-destructive-foreground"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <TestimonialModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        testimonial={editItem}
      />
    </div>
  );
}

// ─── Leads Tab ──────────────────────────────────────────────────────────────

function LeadsTab() {
  const { data: leads, isLoading } = useGetLeads();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-foreground text-xl">
          Leads
        </h2>
        <Badge variant="secondary">{leads?.length ?? 0} total</Badge>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : !leads?.length ? (
        <div className="text-center py-12 text-muted-foreground">
          <Inbox className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No leads yet. They'll appear here when submitted.</p>
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Org Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...leads]
                .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
                .map((lead: Lead) => (
                  <TableRow key={String(lead.id)}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        {lead.phone}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {lead.orgType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm max-w-xs">
                      <span className="line-clamp-2">
                        {lead.message || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                      {formatDate(lead.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ─── Site Content Tab ────────────────────────────────────────────────────────

type ContentField = {
  key: string;
  label: string;
  multiline?: boolean;
  placeholder: string;
};

type ContentGroup = {
  id: string;
  title: string;
  fields: ContentField[];
};

const contentGroups: ContentGroup[] = [
  {
    id: "hero",
    title: "Hero Section",
    fields: [
      {
        key: "hero.badge",
        label: "Badge Text",
        placeholder: "Political Technology & AI Automation",
      },
      {
        key: "hero.headline1",
        label: "Headline Part 1",
        placeholder: "Intelligent Political",
      },
      {
        key: "hero.headline2",
        label: "Headline Part 2 (Gold)",
        placeholder: "& AI Systems",
      },
      {
        key: "hero.headline3",
        label: "Headline Part 3",
        placeholder: "Built for Modern Campaigns",
      },
      {
        key: "hero.subheadline",
        label: "Sub-headline",
        multiline: true,
        placeholder:
          "From voter data management to AI-powered automation, Tattva Innovation builds secure, scalable systems that give organizations a measurable strategic advantage.",
      },
      {
        key: "hero.cta_primary",
        label: "Primary CTA Button",
        placeholder: "Book Strategic Demo",
      },
      {
        key: "hero.cta_whatsapp",
        label: "WhatsApp CTA Button",
        placeholder: "Chat on WhatsApp",
      },
    ],
  },
  {
    id: "services",
    title: "Services Section",
    fields: [
      {
        key: "services.section_label",
        label: "Section Label",
        placeholder: "Strategic Solutions",
      },
      {
        key: "services.section_title",
        label: "Section Title",
        placeholder: "Strategic Technology Solutions",
      },
      {
        key: "services.section_subtitle",
        label: "Section Subtitle",
        multiline: true,
        placeholder:
          "Each system is engineered with one objective: giving your organization a measurable, data-backed strategic advantage.",
      },
      {
        key: "services.1.title",
        label: "Service 1 Title",
        placeholder: "Voter Management Software",
      },
      {
        key: "services.1.description",
        label: "Service 1 Description",
        multiline: true,
        placeholder:
          "Structure campaign data, manage field coordination, and track voter outreach through a secure centralized system built for political operations.",
      },
      {
        key: "services.2.title",
        label: "Service 2 Title",
        placeholder: "AI-Powered Workflow Automation",
      },
      {
        key: "services.2.description",
        label: "Service 2 Description",
        multiline: true,
        placeholder:
          "Automate internal processes, eliminate repetitive tasks, and gain actionable insights through intelligent AI systems tailored to your organization.",
      },
      {
        key: "services.3.title",
        label: "Service 3 Title",
        placeholder: "Campaign Data Analytics",
      },
      {
        key: "services.3.description",
        label: "Service 3 Description",
        multiline: true,
        placeholder:
          "Transform raw campaign data into strategic intelligence with real-time dashboards and performance tracking built for modern political teams.",
      },
      {
        key: "services.4.title",
        label: "Service 4 Title",
        placeholder: "Strategic Web Infrastructure",
      },
      {
        key: "services.4.description",
        label: "Service 4 Description",
        multiline: true,
        placeholder:
          "High-performance digital infrastructure built for communication, outreach, and institutional credibility that drives measurable engagement.",
      },
    ],
  },
  {
    id: "data",
    title: "Campaign Intelligence Section",
    fields: [
      {
        key: "data.section_label",
        label: "Section Label",
        placeholder: "Campaign Intelligence",
      },
      {
        key: "data.headline",
        label: "Headline Start",
        placeholder: "Built for",
      },
      {
        key: "data.headline_accent",
        label: "Headline Accent (Blue)",
        placeholder: "Data-Driven",
      },
      {
        key: "data.headline_end",
        label: "Headline End",
        placeholder: "Campaigns",
      },
      {
        key: "data.body",
        label: "Body Text",
        multiline: true,
        placeholder:
          "Modern campaigns run on structured data and intelligent systems. We help political teams organize voter databases, monitor outreach performance, analyze engagement patterns, and make informed strategic decisions.",
      },
    ],
  },
  {
    id: "advantage",
    title: "Strategic Advantage Section",
    fields: [
      {
        key: "advantage.section_label",
        label: "Section Label",
        placeholder: "Strategic Advantage",
      },
      {
        key: "advantage.headline",
        label: "Headline",
        placeholder: "Why Organizations Choose",
      },
      {
        key: "advantage.subtitle",
        label: "Subtitle",
        multiline: true,
        placeholder:
          "Built for institutions that require precision, security, and outcomes — not generic software.",
      },
    ],
  },
  {
    id: "faq",
    title: "FAQ Section",
    fields: [
      {
        key: "faq.1.q",
        label: "Question 1",
        placeholder: "Do you build custom software for small organizations?",
      },
      {
        key: "faq.1.a",
        label: "Answer 1",
        multiline: true,
        placeholder:
          "Yes. We work with political campaign teams, NGOs, and growing organizations of all sizes. Every system is custom-built to your requirements — we do not deploy generic off-the-shelf software.",
      },
      {
        key: "faq.2.q",
        label: "Question 2",
        placeholder: "How long does it take to deploy?",
      },
      {
        key: "faq.2.a",
        label: "Answer 2",
        multiline: true,
        placeholder:
          "Most systems are deployed within 48–72 hours of finalizing requirements. Our structured delivery process ensures speed without compromising security or reliability.",
      },
      {
        key: "faq.3.q",
        label: "Question 3",
        placeholder: "Is our data secure?",
      },
      {
        key: "faq.3.a",
        label: "Answer 3",
        multiline: true,
        placeholder:
          "Security is foundational to our infrastructure. All data is encrypted in transit and at rest. We operate under strict confidentiality standards and do not share client data with any third party.",
      },
      {
        key: "faq.4.q",
        label: "Question 4",
        placeholder: "Do you offer ongoing support?",
      },
      {
        key: "faq.4.a",
        label: "Answer 4",
        multiline: true,
        placeholder:
          "Yes. Post-deployment support and maintenance packages are available. Our India-based team is accessible via WhatsApp and direct communication channels.",
      },
      {
        key: "faq.5.q",
        label: "Question 5",
        placeholder: "Can we request changes after launch?",
      },
      {
        key: "faq.5.a",
        label: "Answer 5",
        multiline: true,
        placeholder:
          "Yes. All systems are built with scalability in mind. We offer structured upgrade and maintenance engagements as your organization's needs evolve.",
      },
    ],
  },
  {
    id: "lead",
    title: "Lead Capture Section",
    fields: [
      {
        key: "lead.section_label",
        label: "Section Label",
        placeholder: "Confidential Consultation",
      },
      {
        key: "lead.headline",
        label: "Headline",
        placeholder: "Gain Strategic Advantage with Intelligent Systems",
      },
      {
        key: "lead.subtext",
        label: "Sub-text",
        multiline: true,
        placeholder:
          "Book a confidential consultation to evaluate how structured data and AI automation can strengthen your operations.",
      },
      {
        key: "lead.cta_button",
        label: "CTA Button Text",
        placeholder: "Book My Strategic Demo",
      },
    ],
  },
];

function ContentGroupCard({
  group,
  contentMap,
}: {
  group: ContentGroup;
  contentMap: Map<string, string>;
}) {
  const [localValues, setLocalValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const field of group.fields) {
      init[field.key] = contentMap.get(field.key) ?? "";
    }
    return init;
  });
  const [savingGroup, setSavingGroup] = useState(false);

  const setSiteContent = useSetSiteContent();

  const handleChange = (key: string, value: string) => {
    setLocalValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSavingGroup(true);
    try {
      await Promise.all(
        group.fields
          .filter(
            (f) =>
              localValues[f.key] !== undefined && localValues[f.key] !== "",
          )
          .map((f) =>
            setSiteContent.mutateAsync({
              key: f.key,
              value: localValues[f.key],
            }),
          ),
      );
      toast.success(`${group.title} saved successfully`);
    } catch {
      toast.error(`Failed to save ${group.title}`);
    } finally {
      setSavingGroup(false);
    }
  };

  return (
    <Card className="border border-border shadow-xs">
      <CardHeader className="pb-4">
        <CardTitle className="font-display text-base font-bold text-foreground">
          {group.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {group.fields.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <Label className="text-sm font-semibold text-foreground">
              {field.label}
              <span className="ml-2 text-xs font-normal text-muted-foreground font-mono">
                {field.key}
              </span>
            </Label>
            {field.multiline ? (
              <Textarea
                value={localValues[field.key] ?? ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                className="resize-y text-sm"
              />
            ) : (
              <Input
                value={localValues[field.key] ?? ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="text-sm"
              />
            )}
          </div>
        ))}

        <div className="pt-2">
          <Button
            onClick={handleSave}
            disabled={savingGroup}
            size="sm"
            className="gap-2 font-semibold"
          >
            {savingGroup && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {savingGroup ? "Saving..." : `Save ${group.title}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SiteContentTab() {
  const { data: rawContent, isLoading } = useGetAllSiteContent();

  const contentMap = new Map<string, string>(rawContent ?? []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-foreground text-xl">
            Site Content
          </h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Edit all visible text on the website. Leave a field empty to use the
            built-in default text.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {contentGroups.map((group) => (
          <ContentGroupCard
            key={group.id}
            group={group}
            contentMap={contentMap}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Admin Page ────────────────────────────────────────────────────────

export function AdminPage() {
  const { login, clear, isLoggingIn, identity, isInitializing } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const principal = identity?.getPrincipal().toString();

  // Still initializing auth
  if (isInitializing || (isAuthenticated && isCheckingAdmin)) {
    return (
      <main className="pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </main>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return (
      <main className="pt-24 pb-20 min-h-screen bg-section-alt">
        <div className="container mx-auto px-4 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-10 shadow-card text-center mt-12"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-5">
              <ShieldAlert className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display font-bold text-foreground text-2xl mb-2">
              Admin Panel
            </h1>
            <p className="text-foreground/60 text-sm mb-8">
              Please log in with Internet Identity to access the admin panel.
            </p>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full gap-2 font-semibold"
              size="lg"
            >
              {isLoggingIn ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              {isLoggingIn ? "Logging in..." : "Login"}
            </Button>
          </motion.div>
        </div>
      </main>
    );
  }

  // Logged in but not admin
  if (!isAdmin) {
    return (
      <main className="pt-24 pb-20 min-h-screen bg-section-alt">
        <div className="container mx-auto px-4 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-10 shadow-card text-center mt-12"
          >
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-5">
              <ShieldAlert className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="font-display font-bold text-foreground text-2xl mb-2">
              Access Denied
            </h1>
            <p className="text-foreground/60 text-sm mb-2">
              Your account does not have admin access.
            </p>
            {principal && (
              <p className="text-xs text-muted-foreground font-mono bg-muted rounded px-3 py-2 mb-6 break-all">
                {principal}
              </p>
            )}
            <Button variant="outline" onClick={clear} className="gap-2">
              <LogOut className="w-4 h-4" />
              Log Out
            </Button>
          </motion.div>
        </div>
      </main>
    );
  }

  // Admin dashboard
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between py-8">
            <div>
              <h1 className="font-display font-bold text-foreground text-3xl">
                Admin Panel
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Tattva Innovation — Manage your content
              </p>
            </div>
            <Button variant="outline" onClick={clear} className="gap-2 text-sm">
              <LogOut className="w-4 h-4" />
              Log Out
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="posts">
            <TabsList className="mb-8 gap-1 flex-wrap h-auto">
              <TabsTrigger value="posts" className="gap-2">
                <FileText className="w-4 h-4" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="gap-2">
                <Star className="w-4 h-4" />
                Testimonials
              </TabsTrigger>
              <TabsTrigger value="leads" className="gap-2">
                <Inbox className="w-4 h-4" />
                Leads
              </TabsTrigger>
              <TabsTrigger value="site-content" className="gap-2">
                <LayoutTemplate className="w-4 h-4" />
                Site Content
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              <BlogPostsTab />
            </TabsContent>
            <TabsContent value="testimonials">
              <TestimonialsTab />
            </TabsContent>
            <TabsContent value="leads">
              <LeadsTab />
            </TabsContent>
            <TabsContent value="site-content">
              <SiteContentTab />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </main>
  );
}
