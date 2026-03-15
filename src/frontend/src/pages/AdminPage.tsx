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
  useClaimOwnerAdmin,
  useCreatePost,
  useCreateTestimonial,
  useDeletePost,
  useDeleteTestimonial,
  useGetAllPosts,
  useGetLeads,
  useGetVisibleTestimonials,
  useInitializeAdmin,
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
        key: "hero_badge",
        label: "Badge Text",
        placeholder: "AI Systems for Businesses, Governments & Campaigns",
      },
      {
        key: "hero_headline",
        label: "Headline",
        multiline: true,
        placeholder: "AI Systems Powering Businesses, Governments & Campaigns",
      },
      {
        key: "hero_subheadline",
        label: "Sub-headline",
        multiline: true,
        placeholder:
          "We build intelligent software that automates operations, analyzes voter data, and drives growth.",
      },
      { key: "hero_cta1", label: "CTA Button 1", placeholder: "View Products" },
      {
        key: "hero_cta2",
        label: "CTA Button 2",
        placeholder: "Book Live Demo",
      },
    ],
  },
  {
    id: "products",
    title: "Products Section",
    fields: [
      {
        key: "products_title",
        label: "Section Title",
        placeholder: "Our AI Product Ecosystem",
      },
      {
        key: "product_1_name",
        label: "Product 1 Name",
        placeholder: "AI Sales Agent",
      },
      {
        key: "product_1_desc",
        label: "Product 1 Description",
        multiline: true,
        placeholder:
          "Automate lead qualification, follow-ups, and deal closing with intelligent AI agents.",
      },
      {
        key: "product_1_link",
        label: "Product 1 Demo Link",
        placeholder: "https://demo.tattvainnovation.ai/sales-agent",
      },
      {
        key: "product_2_name",
        label: "Product 2 Name",
        placeholder: "Election Intelligence Platform",
      },
      {
        key: "product_2_desc",
        label: "Product 2 Description",
        multiline: true,
        placeholder:
          "Manage voter data, track field operations, and analyze campaign performance in real-time.",
      },
      {
        key: "product_2_link",
        label: "Product 2 Demo Link",
        placeholder: "https://demo.tattvainnovation.ai/election-platform",
      },
      {
        key: "product_3_name",
        label: "Product 3 Name",
        placeholder: "Business Automation AI",
      },
      {
        key: "product_3_desc",
        label: "Product 3 Description",
        multiline: true,
        placeholder:
          "Streamline workflows, reduce manual work, and unlock operational efficiency at scale.",
      },
      {
        key: "product_3_link",
        label: "Product 3 Demo Link",
        placeholder: "https://demo.tattvainnovation.ai/business-ai",
      },
      {
        key: "product_4_name",
        label: "Product 4 Name",
        placeholder: "AI Knowledge Assistant",
      },
      {
        key: "product_4_desc",
        label: "Product 4 Description",
        multiline: true,
        placeholder:
          "Instant answers, document intelligence, and organizational knowledge at your fingertips.",
      },
      {
        key: "product_4_link",
        label: "Product 4 Demo Link",
        placeholder: "https://demo.tattvainnovation.ai/knowledge-ai",
      },
    ],
  },
  {
    id: "solutions",
    title: "Solutions Section",
    fields: [
      {
        key: "solutions_title",
        label: "Section Title",
        placeholder: "Solutions We Power",
      },
      {
        key: "solution_1_title",
        label: "Solution 1 Title",
        placeholder: "Political Campaign Technology",
      },
      {
        key: "solution_1_desc",
        label: "Solution 1 Description",
        multiline: true,
        placeholder:
          "End-to-end digital infrastructure for modern political campaigns.",
      },
      {
        key: "solution_2_title",
        label: "Solution 2 Title",
        placeholder: "Business Automation",
      },
      {
        key: "solution_2_desc",
        label: "Solution 2 Description",
        multiline: true,
        placeholder:
          "Intelligent systems that automate operations, reduce costs, and accelerate growth.",
      },
      {
        key: "solution_3_title",
        label: "Solution 3 Title",
        placeholder: "Enterprise AI Systems",
      },
      {
        key: "solution_3_desc",
        label: "Solution 3 Description",
        multiline: true,
        placeholder:
          "Custom AI platforms designed for government institutions and enterprises.",
      },
    ],
  },
  {
    id: "preview",
    title: "Dashboard Preview Section",
    fields: [
      {
        key: "preview_title",
        label: "Section Title",
        placeholder: "See Our Products in Action",
      },
      {
        key: "preview_1_title",
        label: "Tab 1 Title",
        placeholder: "Voter Analytics",
      },
      { key: "preview_2_title", label: "Tab 2 Title", placeholder: "AI Sales" },
      {
        key: "preview_3_title",
        label: "Tab 3 Title",
        placeholder: "Business Automation",
      },
    ],
  },
  {
    id: "stats",
    title: "Why Tattva / Stats Section",
    fields: [
      {
        key: "stats_title",
        label: "Section Title",
        placeholder: "Why Tattva Innovation",
      },
      { key: "stat_1_number", label: "Stat 1 Number", placeholder: "100+" },
      {
        key: "stat_1_label",
        label: "Stat 1 Label",
        placeholder: "AI Features",
      },
      { key: "stat_2_number", label: "Stat 2 Number", placeholder: "10+" },
      {
        key: "stat_2_label",
        label: "Stat 2 Label",
        placeholder: "Automation Modules",
      },
      { key: "stat_3_number", label: "Stat 3 Number", placeholder: "5+" },
      {
        key: "stat_3_label",
        label: "Stat 3 Label",
        placeholder: "Industry Solutions",
      },
      { key: "stat_4_number", label: "Stat 4 Number", placeholder: "48hr" },
      {
        key: "stat_4_label",
        label: "Stat 4 Label",
        placeholder: "Deployment Time",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing Section",
    fields: [
      {
        key: "pricing_title",
        label: "Section Title",
        placeholder: "Simple, Transparent Pricing",
      },
      {
        key: "pricing_toggle_monthly",
        label: "Monthly Toggle Label",
        placeholder: "Monthly",
      },
      {
        key: "pricing_toggle_yearly",
        label: "Yearly Toggle Label",
        placeholder: "Yearly",
      },
      {
        key: "plan_starter_name",
        label: "Starter Plan Name",
        placeholder: "Starter",
      },
      {
        key: "plan_starter_price_monthly",
        label: "Starter Monthly Price",
        placeholder: "₹9,999",
      },
      {
        key: "plan_starter_price_yearly",
        label: "Starter Yearly Price",
        placeholder: "₹7,999",
      },
      {
        key: "plan_starter_features",
        label: "Starter Features (pipe-separated)",
        multiline: true,
        placeholder: "3 AI Modules|Basic Analytics|Email Support|1 User",
      },
      {
        key: "plan_growth_name",
        label: "Growth Plan Name",
        placeholder: "Growth",
      },
      {
        key: "plan_growth_price_monthly",
        label: "Growth Monthly Price",
        placeholder: "₹24,999",
      },
      {
        key: "plan_growth_price_yearly",
        label: "Growth Yearly Price",
        placeholder: "₹19,999",
      },
      {
        key: "plan_growth_features",
        label: "Growth Features (pipe-separated)",
        multiline: true,
        placeholder:
          "All AI Modules|Advanced Analytics|Priority Support|5 Users|Custom Integrations",
      },
      {
        key: "plan_enterprise_name",
        label: "Enterprise Plan Name",
        placeholder: "Enterprise",
      },
      {
        key: "plan_enterprise_price_monthly",
        label: "Enterprise Monthly Price",
        placeholder: "Custom",
      },
      {
        key: "plan_enterprise_price_yearly",
        label: "Enterprise Yearly Price",
        placeholder: "Custom",
      },
      {
        key: "plan_enterprise_features",
        label: "Enterprise Features (pipe-separated)",
        multiline: true,
        placeholder:
          "Unlimited Modules|Full Analytics Suite|Dedicated Support|Unlimited Users|Custom AI Training|SLA Guarantee",
      },
    ],
  },
  {
    id: "demo",
    title: "Demo Section",
    fields: [
      {
        key: "demo_title",
        label: "Section Title",
        placeholder: "See Tattva AI in Action",
      },
      {
        key: "demo_subtitle",
        label: "Subtitle",
        placeholder: "Explore live demos of our AI-powered products",
      },
      {
        key: "demo_1_title",
        label: "Demo 1 Title",
        placeholder: "AI Sales Agent Demo",
      },
      {
        key: "demo_1_link",
        label: "Demo 1 Link",
        placeholder: "https://demo.tattvainnovation.ai/sales-agent",
      },
      {
        key: "demo_2_title",
        label: "Demo 2 Title",
        placeholder: "Election Platform Demo",
      },
      {
        key: "demo_2_link",
        label: "Demo 2 Link",
        placeholder: "https://demo.tattvainnovation.ai/election",
      },
      {
        key: "demo_3_title",
        label: "Demo 3 Title",
        placeholder: "Business Automation Demo",
      },
      {
        key: "demo_3_link",
        label: "Demo 3 Link",
        placeholder: "https://demo.tattvainnovation.ai/business",
      },
    ],
  },
  {
    id: "lead",
    title: "Contact / Lead Capture Section",
    fields: [
      {
        key: "lead_headline",
        label: "Headline",
        placeholder: "Start Working with Tattva AI Today",
      },
      {
        key: "lead_subtext",
        label: "Sub-text",
        multiline: true,
        placeholder:
          "Fill in the form below and our team will reach out within 24 hours to discuss your needs.",
      },
      { key: "lead_cta", label: "CTA Button", placeholder: "Request Demo" },
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

const OWNER_PRINCIPAL =
  "z2iag-7b25t-riplr-gbyrt-qmnky-vat7e-hmzul-yhbll-hpuv6-pzyok-aae";

export function AdminPage() {
  const { login, clear, isLoggingIn, identity, isInitializing } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();
  const initializeAdmin = useInitializeAdmin();
  const claimOwnerAdmin = useClaimOwnerAdmin();
  const [adminSecret, setAdminSecret] = useState("");

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
    const isOwner = principal === OWNER_PRINCIPAL;

    const handleClaimOwner = async () => {
      try {
        await claimOwnerAdmin.mutateAsync();
        toast.success("Admin access granted!");
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to claim admin access.",
        );
      }
    };

    const handleClaimSecretAdmin = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!adminSecret.trim()) {
        toast.error("Please enter the admin secret key.");
        return;
      }
      try {
        await initializeAdmin.mutateAsync(adminSecret.trim());
        toast.success("Admin access granted!");
        setAdminSecret("");
      } catch {
        toast.error("Invalid secret key or admin access already claimed.");
      }
    };

    return (
      <main className="pt-24 pb-20 min-h-screen bg-section-alt">
        <div className="container mx-auto px-4 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-10 shadow-card mt-12"
          >
            {isOwner ? (
              /* ── Owner: one-click claim ── */
              <>
                <div className="w-16 h-16 rounded-2xl bg-[#0B1F3A]/10 flex items-center justify-center mx-auto mb-5">
                  <ShieldAlert className="w-8 h-8 text-[#0B1F3A]" />
                </div>
                <h1 className="font-display font-bold text-foreground text-2xl mb-2 text-center">
                  Claim Admin Access
                </h1>
                <p className="text-foreground/60 text-sm mb-3 text-center">
                  Your principal is recognised as the site owner. Click below to
                  activate full admin access.
                </p>
                {principal && (
                  <p className="text-xs text-muted-foreground font-mono bg-muted rounded px-3 py-2 mb-6 break-all text-center">
                    {principal}
                  </p>
                )}
                <Button
                  onClick={handleClaimOwner}
                  disabled={claimOwnerAdmin.isPending}
                  className="w-full font-semibold gap-2"
                  size="lg"
                  style={{ background: "#C8A951", color: "#0B1F3A" }}
                >
                  {claimOwnerAdmin.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Claiming...
                    </>
                  ) : (
                    "Claim Admin Access"
                  )}
                </Button>
              </>
            ) : (
              /* ── Other principal: secret key form ── */
              <>
                <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-5">
                  <ShieldAlert className="w-8 h-8 text-destructive" />
                </div>
                <h1 className="font-display font-bold text-foreground text-2xl mb-2 text-center">
                  Access Denied
                </h1>
                <p className="text-foreground/60 text-sm mb-2 text-center">
                  Your account does not have admin access.
                </p>
                {principal && (
                  <p className="text-xs text-muted-foreground font-mono bg-muted rounded px-3 py-2 mb-6 break-all text-center">
                    {principal}
                  </p>
                )}

                <div className="border-t border-border pt-6 mt-2">
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Claim Admin Access
                  </p>
                  <p className="text-xs text-foreground/50 mb-4">
                    If you are the site owner, enter your admin secret key to
                    gain access.
                  </p>
                  <form onSubmit={handleClaimSecretAdmin} className="space-y-3">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="admin-secret"
                        className="text-sm font-medium"
                      >
                        Admin Secret Key
                      </Label>
                      <Input
                        id="admin-secret"
                        type="password"
                        placeholder="Enter admin secret key..."
                        value={adminSecret}
                        onChange={(e) => setAdminSecret(e.target.value)}
                        autoComplete="off"
                        className="h-11"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full font-semibold"
                      disabled={initializeAdmin.isPending}
                    >
                      {initializeAdmin.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Claim Admin Access"
                      )}
                    </Button>
                  </form>
                </div>
              </>
            )}

            <div className="border-t border-border pt-4 mt-4 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={clear}
                className="gap-2 text-foreground/50"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </Button>
            </div>
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
