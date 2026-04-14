"use client";

import * as React from "react";

function scoreFromUser(u) {
  const base = (u.age ?? 0) * 37 + (u.height ?? 0) * 2 + (u.weight ?? 0);
  const bonus = (u.id ?? 0) * 11 + (u.company?.address?.postalCode?.length ?? 0) * 7;
  return Math.round(800 + ((base + bonus) % 2400));
}

function starsFromScore(score) {
  if (score >= 3000) return 5;
  if (score >= 2600) return 4;
  if (score >= 2200) return 3;
  if (score >= 1600) return 2;
  return 1;
}

export function useLeaderboard({ limit = 30 } = {}) {
  const [leaders, setLeaders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const run = React.useCallback(async () => {
    setLoading(true);
    setError("");

    const ac = new AbortController();
    try {
      const res = await fetch(`https://dummyjson.com/users?limit=${limit}`, {
        cache: "no-store",
        signal: ac.signal,
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();

      const mapped = (data?.users ?? []).map((u) => {
        const username = u.username ?? `${u.firstName ?? ""}${u.lastName ?? ""}`.trim();
        const score = scoreFromUser(u);
        return {
          id: u.id,
          name: `${u.firstName} ${u.lastName}`,
          username: username || `user${u.id}`,
          score,
          stars: starsFromScore(score),
          avatarUrl: u.image,
        };
      });

      mapped.sort((a, b) => b.score - a.score);
      setLeaders(mapped.map((x, i) => ({ ...x, rank: i + 1 })));
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

  return { leaders, loading, error, refetch: run };
}

