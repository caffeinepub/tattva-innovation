import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

// ─── Query: Get All Site Content ────────────────────────────────────────────

export function useGetAllSiteContent() {
  const { actor, isFetching } = useActor();
  return useQuery<[string, string][]>({
    queryKey: ["siteContent"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSiteContent();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ─── Mutation: Set Site Content ──────────────────────────────────────────────

export function useSetSiteContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.setSiteContent(key, value);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["siteContent"] });
    },
  });
}

// ─── Mutation: Delete Site Content ──────────────────────────────────────────

export function useDeleteSiteContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (key: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteSiteContent(key);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["siteContent"] });
    },
  });
}

// ─── Hook: useSiteText ───────────────────────────────────────────────────────
// Returns backend value if set, otherwise the fallback default.
// Uses the data from useGetAllSiteContent() — call this at the page/section level.

export function useSiteText(
  contentMap: Map<string, string> | undefined,
  key: string,
  fallback: string,
): string {
  if (!contentMap) return fallback;
  return contentMap.get(key) ?? fallback;
}

// ─── Hook: useSiteContentMap ─────────────────────────────────────────────────
// Convenience hook that returns a Map built from all site content entries.

export function useSiteContentMap(): Map<string, string> | undefined {
  const { data } = useGetAllSiteContent();
  if (!data) return undefined;
  return new Map(data);
}
