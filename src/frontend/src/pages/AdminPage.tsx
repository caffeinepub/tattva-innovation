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
  FileText,
  Inbox,
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
            <TabsList className="mb-8 gap-1">
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
          </Tabs>
        </motion.div>
      </div>
    </main>
  );
}
