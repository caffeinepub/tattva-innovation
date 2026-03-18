import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { useImageUpload } from "@/hooks/useImageUpload";
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
  ImageIcon,
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
  Upload,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
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

// ─── ImageUploadField ───────────────────────────────────────────────────────

function ImageUploadField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  label: string;
}) {
  const { upload, isUploading } = useImageUpload();
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setProgress(0);
      const url = await upload(file, (pct) => setProgress(pct));
      onChange(url);
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-foreground">{label}</Label>

      {/* Preview */}
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="preview"
            className="h-20 w-32 object-cover rounded-lg border border-border"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Upload button */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="gap-2"
          data-ocid="admin.upload_button"
        >
          {isUploading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5" />
          )}
          {isUploading ? `Uploading ${progress}%` : "Upload Image"}
        </Button>
        {!value && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            No image set
          </span>
        )}
      </div>

      {/* Progress bar */}
      {isUploading && (
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* URL input */}
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">Or paste URL</Label>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="text-sm"
          data-ocid="admin.input"
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
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
            <Label>Slug</Label>
            <Input
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="url-friendly-slug"
            />
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
          <p>No leads yet. They&apos;ll appear here when submitted.</p>
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
                    <TableCell className="text-sm text-muted-foreground">
                      {lead.phone || "-"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {lead.orgType || "-"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
                      <span className="line-clamp-2">
                        {lead.message || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
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

// Simple field definitions for non-solution-page sections
type SimpleField = {
  key: string;
  label: string;
  multiline?: boolean;
  placeholder: string;
  isImage?: boolean;
};

type SimpleSection = {
  id: string;
  title: string;
  fields: SimpleField[];
};

const simpleSections: SimpleSection[] = [
  {
    id: "hero",
    title: "Hero",
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
      {
        key: "hero_image",
        label: "Hero Background Image",
        placeholder: "https://...",
        isImage: true,
      },
    ],
  },
  {
    id: "navigation",
    title: "Navigation",
    fields: [
      {
        key: "nav_logo",
        label: "Logo / Brand Name",
        placeholder: "Tattva Innovation",
      },
      {
        key: "nav_cta",
        label: "Nav CTA Button Label",
        placeholder: "Book Demo",
      },
    ],
  },
  {
    id: "products",
    title: "Products",
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
    title: "Solutions",
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
    title: "Why Tattva / Stats",
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
    title: "Pricing",
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
        placeholder: "7 AI Modules|Advanced Analytics|Priority Support|5 Users",
      },
      {
        key: "plan_enterprise_name",
        label: "Enterprise Plan Name",
        placeholder: "Enterprise",
      },
      {
        key: "plan_enterprise_price",
        label: "Enterprise Price Label",
        placeholder: "Custom",
      },
      {
        key: "plan_enterprise_features",
        label: "Enterprise Features (pipe-separated)",
        multiline: true,
        placeholder:
          "Unlimited AI Modules|Custom Integrations|Dedicated Support|Unlimited Users",
      },
    ],
  },
  {
    id: "demo",
    title: "Demo",
    fields: [
      {
        key: "demo_title",
        label: "Section Title",
        placeholder: "See Tattva AI in Action",
      },
      {
        key: "demo_subtitle",
        label: "Subtitle",
        multiline: true,
        placeholder: "Live demonstrations of our AI products.",
      },
      { key: "demo_cta", label: "CTA Label", placeholder: "Book a Live Demo" },
    ],
  },
  {
    id: "contact",
    title: "Contact / Lead Capture",
    fields: [
      {
        key: "contact_title",
        label: "Section Title",
        placeholder: "Strategic Consultation",
      },
      {
        key: "contact_subtitle",
        label: "Subtitle",
        multiline: true,
        placeholder:
          "Speak with our team to explore how Tattva AI can serve your organisation.",
      },
      {
        key: "contact_email",
        label: "Contact Email",
        placeholder: "contact@tattvainnovation.in",
      },
      {
        key: "contact_phone",
        label: "Contact Phone",
        placeholder: "+91 9822422123",
      },
      {
        key: "contact_hours",
        label: "Hours of Operation",
        placeholder: "Mon–Sat, 9am–7pm IST",
      },
    ],
  },
];

// ─── Solution page defaults (mirror what SolutionDetailPage uses) ───────────

const SOL_DEFAULTS = {
  1: {
    label: "Solution 1 – Political",
    headline: "Political Campaign Technology",
    tagline: "End-to-end digital infrastructure for modern political campaigns",
    slides: [
      {
        title: "Voter Intelligence Dashboard",
        subtitle: "Real-time voter analytics & segmentation",
        desc: "Centralise your voter database with AI-powered segmentation.",
        features:
          "AI voter segmentation|Real-time field updates|Demographic heat maps|Outreach history tracking",
      },
      {
        title: "Field Operations Command",
        subtitle: "Coordinate ground teams at scale",
        desc: "Assign tasks, monitor canvassing progress, and communicate with field workers.",
        features:
          "Task assignment & tracking|Live canvassing map|Team performance metrics|Two-way field communication",
      },
      {
        title: "Campaign Analytics Suite",
        subtitle: "Data-driven strategy decisions",
        desc: "Convert raw campaign data into strategic intelligence.",
        features:
          "Win-probability modelling|Message A/B testing|Sentiment tracking|Multi-channel ROI reports",
      },
    ],
  },
  2: {
    label: "Solution 2 – Business",
    headline: "Business Automation",
    tagline:
      "Intelligent systems that automate operations and accelerate growth",
    slides: [
      {
        title: "Process Automation Hub",
        subtitle: "Eliminate repetitive workflows",
        desc: "Map, automate, and monitor every business process from a single hub.",
        features:
          "Visual workflow builder|AI bottleneck detection|Cross-department automation|Real-time process monitoring",
      },
      {
        title: "Document Intelligence",
        subtitle: "Smart document processing at scale",
        desc: "Extract, classify, and route documents automatically.",
        features:
          "OCR + AI extraction|Auto-classification|ERP / CRM integration|Audit trail & compliance",
      },
      {
        title: "Sales Intelligence",
        subtitle: "AI-powered revenue acceleration",
        desc: "Predict deal outcomes and optimise your pipeline with AI.",
        features:
          "Lead scoring|Pipeline forecasting|Automated follow-ups|Revenue analytics",
      },
    ],
  },
  3: {
    label: "Solution 3 – Enterprise",
    headline: "Enterprise AI Systems",
    tagline:
      "Custom AI platforms for government institutions and large enterprises",
    slides: [
      {
        title: "Enterprise AI Control",
        subtitle: "Centralised AI governance",
        desc: "Deploy, monitor, and govern multiple AI models from a single control plane.",
        features:
          "Multi-model orchestration|Audit & compliance|Role-based access|SLA monitoring",
      },
      {
        title: "Data Intelligence Hub",
        subtitle: "Unified data & insights",
        desc: "Connect all your data sources and get unified intelligence in real time.",
        features:
          "Data connectors|Real-time pipelines|Custom dashboards|Anomaly detection",
      },
      {
        title: "Security & Compliance",
        subtitle: "Enterprise-grade protection",
        desc: "End-to-end encryption, access control, and compliance automation.",
        features:
          "Zero-trust architecture|Compliance reporting|Threat detection|Data sovereignty",
      },
    ],
  },
} as const;

// ─── SolutionSubTab ──────────────────────────────────────────────────────────

type SolFields = Record<string, string>;

function SolutionSubTab({
  solIdx,
  contentMap,
}: {
  solIdx: 1 | 2 | 3;
  contentMap: Map<string, string>;
}) {
  const defaults = SOL_DEFAULTS[solIdx];
  const prefix = `sol_page_${solIdx}_`;

  const rawSlideCount = contentMap.get(`${prefix}slide_count`);
  const initialSlideCount = rawSlideCount
    ? Math.min(5, Math.max(1, Number.parseInt(rawSlideCount, 10)))
    : defaults.slides.length;

  // Build initial values for page-level fields
  const pageFields: SimpleField[] = [
    {
      key: `${prefix}bg`,
      label: "Background CSS",
      placeholder: "linear-gradient(135deg, #0A0F1F 0%, #131A2B 100%)",
    },
    {
      key: `${prefix}headline`,
      label: "Headline",
      placeholder: defaults.headline,
    },
    {
      key: `${prefix}tagline`,
      label: "Tagline",
      placeholder: defaults.tagline,
    },
    {
      key: `${prefix}desc`,
      label: "Description",
      multiline: true,
      placeholder: "",
    },
    {
      key: `${prefix}demo_link`,
      label: "Demo Link",
      placeholder: "https://demo.tattvainnovation.ai/",
    },
    {
      key: `${prefix}demo_label`,
      label: "Demo Button Label",
      placeholder: "View Live Demo",
    },
    {
      key: `${prefix}img_caption`,
      label: "Image Caption",
      placeholder: "Dashboard",
    },
  ];

  const allKeys: string[] = [...pageFields.map((f) => f.key)];
  // Add slide keys for max 5 slides
  for (let s = 1; s <= 5; s++) {
    allKeys.push(
      `${prefix}slide_${s}_title`,
      `${prefix}slide_${s}_subtitle`,
      `${prefix}slide_${s}_desc`,
      `${prefix}slide_${s}_features`,
      `${prefix}slide_${s}_img`,
    );
  }
  allKeys.push(`${prefix}slide_count`);

  const buildInitial = () => {
    const init: SolFields = {};
    for (const key of allKeys) {
      init[key] = contentMap.get(key) ?? "";
    }
    // Set slide_count if not yet stored
    if (!init[`${prefix}slide_count`]) {
      init[`${prefix}slide_count`] = String(initialSlideCount);
    }
    return init;
  };

  const [values, setValues] = useState<SolFields>(buildInitial);
  const [saving, setSaving] = useState(false);
  const setSiteContent = useSetSiteContent();

  const slideCount = Math.min(
    5,
    Math.max(
      1,
      Number.parseInt(
        values[`${prefix}slide_count`] || String(initialSlideCount),
        10,
      ),
    ),
  );

  const handleChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const entries = Object.entries(values).filter(([, v]) => v !== "");
      await Promise.all(
        entries.map(([key, value]) =>
          setSiteContent.mutateAsync({ key, value }),
        ),
      );
      toast.success(`Solution ${solIdx} saved`);
    } catch {
      toast.error(`Failed to save Solution ${solIdx}`);
    } finally {
      setSaving(false);
    }
  };

  const addSlide = async () => {
    if (slideCount >= 5) return;
    const newCount = slideCount + 1;
    const countKey = `${prefix}slide_count`;
    setValues((prev) => ({ ...prev, [countKey]: String(newCount) }));
    try {
      await setSiteContent.mutateAsync({
        key: countKey,
        value: String(newCount),
      });
      toast.success(`Slide ${newCount} added`);
    } catch {
      toast.error("Failed to add slide");
    }
  };

  const removeLastSlide = async () => {
    if (slideCount <= 1) return;
    const newCount = slideCount - 1;
    const countKey = `${prefix}slide_count`;
    setValues((prev) => ({ ...prev, [countKey]: String(newCount) }));
    try {
      await setSiteContent.mutateAsync({
        key: countKey,
        value: String(newCount),
      });
      toast.success(`Slide ${slideCount} removed`);
    } catch {
      toast.error("Failed to remove slide");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page-level fields */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">
            Page Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pageFields.map((field) => (
            <div key={field.key} className="space-y-1.5">
              <Label className="text-sm font-medium text-foreground">
                {field.label}
                <span className="ml-2 text-xs font-normal text-muted-foreground font-mono">
                  {field.key}
                </span>
              </Label>
              {field.multiline ? (
                <Textarea
                  value={values[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  className="resize-y text-sm"
                />
              ) : (
                <Input
                  value={values[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="text-sm"
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Slides */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-foreground text-sm">
            Slides ({slideCount} / 5)
          </h4>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={removeLastSlide}
              disabled={slideCount <= 1}
              className="gap-1 text-xs"
              data-ocid="admin.secondary_button"
            >
              Remove Last
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSlide}
              disabled={slideCount >= 5}
              className="gap-1 text-xs"
              data-ocid="admin.primary_button"
            >
              <Plus className="w-3.5 h-3.5" /> Add Slide
            </Button>
          </div>
        </div>

        {Array.from({ length: slideCount }, (_, i) => i + 1).map((s) => {
          const defSlide = defaults.slides[s - 1];
          return (
            <Card key={s} className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                    {s}
                  </span>
                  Slide {s}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Slide Title</Label>
                    <Input
                      value={values[`${prefix}slide_${s}_title`] ?? ""}
                      onChange={(e) =>
                        handleChange(
                          `${prefix}slide_${s}_title`,
                          e.target.value,
                        )
                      }
                      placeholder={defSlide?.title ?? `Slide ${s} Title`}
                      className="text-sm"
                      data-ocid="admin.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Subtitle</Label>
                    <Input
                      value={values[`${prefix}slide_${s}_subtitle`] ?? ""}
                      onChange={(e) =>
                        handleChange(
                          `${prefix}slide_${s}_subtitle`,
                          e.target.value,
                        )
                      }
                      placeholder={defSlide?.subtitle ?? `Slide ${s} Subtitle`}
                      className="text-sm"
                      data-ocid="admin.input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Description</Label>
                  <Textarea
                    value={values[`${prefix}slide_${s}_desc`] ?? ""}
                    onChange={(e) =>
                      handleChange(`${prefix}slide_${s}_desc`, e.target.value)
                    }
                    placeholder={defSlide?.desc ?? "Slide description..."}
                    rows={3}
                    className="resize-y text-sm"
                    data-ocid="admin.textarea"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">
                    Features (pipe-separated)
                  </Label>
                  <Textarea
                    value={values[`${prefix}slide_${s}_features`] ?? ""}
                    onChange={(e) =>
                      handleChange(
                        `${prefix}slide_${s}_features`,
                        e.target.value,
                      )
                    }
                    placeholder={
                      defSlide?.features ?? "Feature 1|Feature 2|Feature 3"
                    }
                    rows={2}
                    className="resize-y text-sm"
                    data-ocid="admin.textarea"
                  />
                </div>
                <ImageUploadField
                  label="Slide Image"
                  value={values[`${prefix}slide_${s}_img`] ?? ""}
                  onChange={(url) =>
                    handleChange(`${prefix}slide_${s}_img`, url)
                  }
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="pt-2">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="gap-2 font-semibold"
          data-ocid="admin.save_button"
        >
          {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {saving ? "Saving..." : `Save Solution ${solIdx}`}
        </Button>
      </div>
    </div>
  );
}

// ─── SimpleSectionPanel ──────────────────────────────────────────────────────

function SimpleSectionPanel({
  section,
  contentMap,
}: {
  section: SimpleSection;
  contentMap: Map<string, string>;
}) {
  const [localValues, setLocalValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const field of section.fields) {
      init[field.key] = contentMap.get(field.key) ?? "";
    }
    return init;
  });
  const [saving, setSaving] = useState(false);
  const setSiteContent = useSetSiteContent();

  const handleChange = (key: string, val: string) => {
    setLocalValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all(
        section.fields
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
      toast.success(`${section.title} saved`);
    } catch {
      toast.error(`Failed to save ${section.title}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 py-2">
      {section.fields.map((field) => (
        <div key={field.key} className="space-y-1.5">
          <Label className="text-sm font-semibold text-foreground">
            {field.label}
            <span className="ml-2 text-xs font-normal text-muted-foreground font-mono">
              {field.key}
            </span>
          </Label>
          {field.isImage ? (
            <ImageUploadField
              label=""
              value={localValues[field.key] ?? ""}
              onChange={(url) => handleChange(field.key, url)}
            />
          ) : field.multiline ? (
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
          disabled={saving}
          size="sm"
          className="gap-2 font-semibold"
          data-ocid="admin.save_button"
        >
          {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {saving ? "Saving..." : `Save ${section.title}`}
        </Button>
      </div>
    </div>
  );
}

// ─── SiteContentTab ──────────────────────────────────────────────────────────

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
      <div className="mb-6">
        <h2 className="font-display font-bold text-foreground text-xl">
          Site Content
        </h2>
        <p className="text-muted-foreground text-sm mt-0.5">
          Edit all visible text and images on the website. Leave a field empty
          to use the built-in default.
        </p>
      </div>

      <Accordion type="multiple" defaultValue={["hero"]} className="space-y-2">
        {simpleSections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="border border-border rounded-xl px-4 overflow-hidden"
          >
            <AccordionTrigger className="font-semibold text-foreground hover:no-underline py-4">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <SimpleSectionPanel section={section} contentMap={contentMap} />
            </AccordionContent>
          </AccordionItem>
        ))}

        {/* Solution Detail Pages */}
        <AccordionItem
          value="solution_pages"
          className="border border-border rounded-xl px-4 overflow-hidden"
        >
          <AccordionTrigger className="font-semibold text-foreground hover:no-underline py-4">
            Solution Detail Pages
          </AccordionTrigger>
          <AccordionContent>
            <div className="py-2">
              <Tabs defaultValue="sol1">
                <TabsList className="mb-6 flex-wrap h-auto gap-1">
                  <TabsTrigger value="sol1" data-ocid="admin.tab">
                    Solution 1 – Political
                  </TabsTrigger>
                  <TabsTrigger value="sol2" data-ocid="admin.tab">
                    Solution 2 – Business
                  </TabsTrigger>
                  <TabsTrigger value="sol3" data-ocid="admin.tab">
                    Solution 3 – Enterprise
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="sol1">
                  <SolutionSubTab solIdx={1} contentMap={contentMap} />
                </TabsContent>
                <TabsContent value="sol2">
                  <SolutionSubTab solIdx={2} contentMap={contentMap} />
                </TabsContent>
                <TabsContent value="sol3">
                  <SolutionSubTab solIdx={3} contentMap={contentMap} />
                </TabsContent>
              </Tabs>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
              data-ocid="admin.primary_button"
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
                  data-ocid="admin.primary_button"
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
                        data-ocid="admin.input"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full font-semibold"
                      disabled={initializeAdmin.isPending}
                      data-ocid="admin.submit_button"
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
                data-ocid="admin.secondary_button"
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

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between py-8">
            <div>
              <h1 className="font-display font-bold text-foreground text-3xl">
                Admin Panel
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Tattva Innovation — Manage your content
              </p>
            </div>
            <Button
              variant="outline"
              onClick={clear}
              className="gap-2 text-sm"
              data-ocid="admin.secondary_button"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </Button>
          </div>

          <Tabs defaultValue="posts">
            <TabsList className="mb-8 gap-1 flex-wrap h-auto">
              <TabsTrigger
                value="posts"
                className="gap-2"
                data-ocid="admin.tab"
              >
                <FileText className="w-4 h-4" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger
                value="testimonials"
                className="gap-2"
                data-ocid="admin.tab"
              >
                <Star className="w-4 h-4" />
                Testimonials
              </TabsTrigger>
              <TabsTrigger
                value="leads"
                className="gap-2"
                data-ocid="admin.tab"
              >
                <Inbox className="w-4 h-4" />
                Leads
              </TabsTrigger>
              <TabsTrigger
                value="site-content"
                className="gap-2"
                data-ocid="admin.tab"
              >
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
