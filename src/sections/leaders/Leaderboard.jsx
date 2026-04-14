"use client";

import * as React from "react";
import {
  Avatar,
  Box,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { useLeaderboard } from "@/sections/leaders/useLeaderboard";

function initials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export default function Leaderboard() {
  const { leaders, loading, error } = useLeaderboard({ limit: 30 });

  const visible = loading ? Array.from({ length: 6 }) : leaders.slice(0, 10);

  return (
    <Box
      sx={{
        borderRadius: 1,
        overflow: "hidden",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: { xs: "auto", md: 680 },
        minHeight: { xs: 0, md: 680 },
        color: "#fff",
        background:
          "radial-gradient(120% 120% at 20% 0%, rgba(14, 165, 233, 0.18) 0%, rgba(2, 132, 199, 0.08) 35%, rgba(2, 6, 23, 0) 70%), linear-gradient(180deg, #0b2a52 0%, #073a7a 40%, #0a4fb0 100%)",
        boxShadow: "0 24px 80px rgba(2, 6, 23, 0.24)",
      }}
    >
      <Box sx={{ px: { xs: 2, md: 3 }, pt: { xs: 2, md: 2.5 }, pb: 2 }}>
        <Box
          sx={{
            mx: "auto",
            width: { xs: "100%", sm: "80%" },
            maxWidth: 520,
            borderRadius: 1,
            border: "1px solid rgba(245, 158, 11, 0.85)",
            bgcolor: "rgba(2, 6, 23, 0.22)",
            px: 2,
            py: 1.2,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontWeight: 1000, letterSpacing: 3, fontSize: 24 }}>
            LEADBOARD
          </Typography>
        </Box>
      </Box>

      {error ? (
        <Box sx={{ px: { xs: 2, md: 3 }, pb: 3 }}>
          <Typography fontWeight={950}>Couldn’t load leaderboard</Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            {error}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            px: { xs: 2, md: 3 },
            pb: { xs: 2, md: 3 },
            overflowY: { xs: "visible", md: "auto" },
            "&::-webkit-scrollbar": { width: 10 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255,255,255,0.22)",
              borderRadius: 999,
              border: "3px solid transparent",
              backgroundClip: "content-box",
            },
          }}
        >
          <Stack spacing={2}>
            {visible.map((l, idx) => {
              const rank = loading ? idx + 1 : l.rank;
              const ring =
                rank === 1
                  ? "rgba(250, 204, 21, 0.95)"
                  : rank === 2
                    ? "rgba(167, 139, 250, 0.95)"
                    : "rgba(251, 146, 60, 0.95)";

              return (
                <Box
                  key={loading ? idx : l.id}
                  sx={{
                    bgcolor: "#ffffff",
                    color: "rgba(2, 6, 23, 0.92)",
                    borderRadius: 3,
                    px: 2,
                    py: 1.25,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    boxShadow: "0 14px 34px rgba(2, 6, 23, 0.10)",
                    transition: "transform 140ms ease, box-shadow 140ms ease",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: "0 18px 44px rgba(2, 6, 23, 0.14)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: "999px",
                      display: "grid",
                      placeItems: "center",
                      border: `1px solid ${ring}`,
                      fontWeight: 900,
                      fontSize: 12,
                      color: "rgba(2, 6, 23, 0.75)",
                      flex: "0 0 auto",
                    }}
                  >
                    {rank}
                  </Box>

                  {loading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar
                      src={l.avatarUrl}
                      alt={l.name}
                      sx={{
                        width: 42,
                        height: 42,
                        fontWeight: 950,
                        bgcolor: "#0ea5e9",
                        border: `3px solid ${ring}`,
                      }}
                    >
                      {initials(l.name)}
                    </Avatar>
                  )}

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {loading ? (
                      <>
                        <Skeleton width="55%" />
                        <Skeleton width="35%" />
                      </>
                    ) : (
                      <>
                        <Stack direction="row" alignItems="center" gap={1} sx={{ minWidth: 0 }}>
                          <Typography fontWeight={950} noWrap>
                            {l.name}
                          </Typography>

                          {rank === 1 ? (
                            <Box
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 0.5,
                                px: 1,
                                py: 0.25,
                                borderRadius: 999,
                                bgcolor: "rgba(239, 68, 68, 0.12)",
                                color: "rgb(185, 28, 28)",
                                fontWeight: 950,
                                fontSize: 10,
                                flex: "0 0 auto",
                              }}
                            >
                              <EmojiEventsRoundedIcon sx={{ fontSize: 14 }} />
                              WINNER
                            </Box>
                          ) : null}
                        </Stack>

                        <Rating
                          value={clamp(l.stars, 0, 5)}
                          readOnly
                          size="small"
                          sx={{
                            mt: 0.25,
                            "& .MuiRating-iconFilled": { color: "#f59e0b" },
                          }}
                        />
                      </>
                    )}
                  </Box>

                  <Box sx={{ textAlign: "right", minWidth: 64 }}>
                    {loading ? (
                      <Skeleton width={46} />
                    ) : (
                      <Typography fontWeight={950} sx={{ color: "#f59e0b" }}>
                        {l.score}
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
