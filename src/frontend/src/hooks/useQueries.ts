import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BlogPost, Lead, Testimonial } from "../backend.d";
import { useActor } from "./useActor";

// ─── Blog ──────────────────────────────────────────────────────────────────

export function useGetPublishedPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["publishedPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["allPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPostBySlug(slug: string) {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost | null>({
    queryKey: ["post", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPostBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      slug: string;
      content: string;
      excerpt: string;
      author: string;
      isPublished: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createPost(
        data.title,
        data.slug,
        data.content,
        data.excerpt,
        data.author,
        data.isPublished,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["publishedPosts"] });
      void queryClient.invalidateQueries({ queryKey: ["allPosts"] });
    },
  });
}

export function useUpdatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      slug: string;
      content: string;
      excerpt: string;
      author: string;
      isPublished: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updatePost(
        data.id,
        data.title,
        data.slug,
        data.content,
        data.excerpt,
        data.author,
        data.isPublished,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["publishedPosts"] });
      void queryClient.invalidateQueries({ queryKey: ["allPosts"] });
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deletePost(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["publishedPosts"] });
      void queryClient.invalidateQueries({ queryKey: ["allPosts"] });
    },
  });
}

// ─── Testimonials ──────────────────────────────────────────────────────────

export function useGetVisibleTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["visibleTestimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVisibleTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      quote: string;
      name: string;
      role: string;
      organization: string;
      isVisible: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createTestimonial(
        data.quote,
        data.name,
        data.role,
        data.organization,
        data.isVisible,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["visibleTestimonials"] });
    },
  });
}

export function useUpdateTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      quote: string;
      name: string;
      role: string;
      organization: string;
      isVisible: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateTestimonial(
        data.id,
        data.quote,
        data.name,
        data.role,
        data.organization,
        data.isVisible,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["visibleTestimonials"] });
    },
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteTestimonial(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["visibleTestimonials"] });
    },
  });
}

// ─── Leads ─────────────────────────────────────────────────────────────────

export function useGetLeads() {
  const { actor, isFetching } = useActor();
  return useQuery<Lead[]>({
    queryKey: ["leads"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeads();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitLead() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      orgType: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.submitLead(
        data.name,
        data.phone,
        data.orgType,
        data.message,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
  });
}

// ─── Admin ─────────────────────────────────────────────────────────────────

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInitializeAdmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (secret: string) => {
      if (!actor) throw new Error("Not connected");
      await actor._initializeAccessControlWithSecret(secret);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
    },
  });
}
