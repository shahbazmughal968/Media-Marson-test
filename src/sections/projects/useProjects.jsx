"use client";

import * as React from "react";

export function useProjects({ limit = 24 } = {}) {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const run = React.useCallback(async () => {
    setLoading(true);
    setError("");

    const ac = new AbortController();
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=${limit}`, {
        cache: "no-store",
        signal: ac.signal,
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();

      const next = (data?.products ?? []).map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        avatarUrl: p.thumbnail,
        tag: p.category ?? "Project",
      }));
      setProjects(next);
    } catch (e) {
      if (e?.name === "AbortError") return;
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }

    return () => ac.abort();
  }, [limit]);

  React.useEffect(() => {
    let cleanup;
    run().then((c) => {
      cleanup = c;
    });
    return () => cleanup?.();
  }, [run]);

  return { projects, loading, error, refetch: run };
}
