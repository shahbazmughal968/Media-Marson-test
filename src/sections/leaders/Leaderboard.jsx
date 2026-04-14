"use client";

import * as React from "react";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Chip,
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

  const top = !loading && leaders.length ? leaders[0] : null;
  const rest = !loading && leaders.length ? leaders.slice(1) : [];

  return (
    <Box
      sx={{
        borderRadius: 4,
        border: "1px solid rgba(15, 23, 42, 0.08)",
        bgcolor: "background.paper",
        boxShadow: "0 18px 60px rgba(2, 6, 23, 0.06)",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
          background:
            "linear-gradient(180deg, rgba(124, 58, 237, 0.08), rgba(255,255,255,0))",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography fontWeight={900} sx={{ letterSpacing: -0.2 }} noWrap>
            Leaderboard
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            Ranked by score (API-backed)
          </Typography>
        </Box>

        <Chip
          icon={<EmojiEventsRoundedIcon />}
          label={loading ? "Loading…" : `${leaders.length} leaders`}
          size="small"
          sx={{
            fontWeight: 900,
            "& .MuiChip-icon": { color: "secondary.main" },
          }}
        />
      </Stack>

      {error ? (
        <Box sx={{ p: 2 }}>
          <Typography fontWeight={900}>Couldn’t load leaderboard</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {error}
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ p: 1.25 }}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3.5,
                borderColor: "rgba(124, 58, 237, 0.18)",
                bgcolor: "rgba(124, 58, 237, 0.06)",
                overflow: "hidden",
              }}
            >
              <CardActionArea sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" gap={2}>
                  {loading ? (
                    <Skeleton variant="circular" width={56} height={56} />
                  ) : (
                    <Avatar
                      src={top?.avatarUrl}
                      alt={top?.name}
                      sx={{
                        width: 56,
                        height: 56,
                        fontWeight: 900,
                        bgcolor: "secondary.main",
                        boxShadow: "0 14px 34px rgba(124, 58, 237, 0.25)",
                      }}
                    >
                      {initials(top?.name)}
                    </Avatar>
                  )}

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {loading ? (
                      <>
                        <Skeleton width="40%" />
                        <Skeleton width="55%" />
                      </>
                    ) : (
                      <>
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1}
                          sx={{ minWidth: 0 }}
                        >
                          <Chip
                            label="#1"
                            size="small"
                            sx={{
                              fontWeight: 900,
                              bgcolor: "rgba(245, 158, 11, 0.18)",
                              color: "rgb(180, 83, 9)",
                            }}
                          />
                          <Typography fontWeight={950} noWrap>
                            {top?.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                            noWrap
                          >
                            @{top?.username}
                          </Typography>
                        </Stack>

                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={1.25}
                          sx={{ mt: 0.5 }}
                        >
                          <Typography fontWeight={950}>
                            {top?.score.toLocaleString()} pts
                          </Typography>
                          <Rating
                            value={clamp(top?.stars ?? 0, 0, 5)}
                            readOnly
                            size="small"
                            sx={{
                              "& .MuiRating-iconFilled": { color: "#f59e0b" },
                            }}
                          />
                        </Stack>
                      </>
                    )}
                  </Box>
                </Stack>
              </CardActionArea>
            </Card>
          </Box>

          <Box
            sx={{
              maxHeight: 520,
              overflowY: "auto",
              p: 1.25,
              pt: 0,
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": { width: 10 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(15, 23, 42, 0.18)",
                borderRadius: 999,
                border: "3px solid transparent",
                backgroundClip: "content-box",
              },
            }}
          >
            <Stack gap={1}>
              {(loading ? Array.from({ length: 10 }) : rest).map((l, idx) => (
                <Card
                  key={loading ? idx : l.id}
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    borderColor: "rgba(15, 23, 42, 0.08)",
                    overflow: "hidden",
                    transition: "transform 140ms ease, box-shadow 140ms ease",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: "0 14px 34px rgba(2, 6, 23, 0.08)",
                    },
                  }}
                >
                  <CardActionArea sx={{ p: 1.5 }}>
                    <Stack direction="row" alignItems="center" gap={1.5}>
                      <Box
                        sx={{
                          width: 34,
                          textAlign: "center",
                          fontWeight: 950,
                          color: "text.secondary",
                        }}
                      >
                        {loading ? (
                          <Skeleton width={20} sx={{ mx: "auto" }} />
                        ) : (
                          `#${l.rank}`
                        )}
                      </Box>

                      {loading ? (
                        <Skeleton variant="circular" width={44} height={44} />
                      ) : (
                        <Avatar
                          src={l.avatarUrl}
                          alt={l.name}
                          sx={{
                            width: 44,
                            height: 44,
                            fontWeight: 900,
                            bgcolor: "primary.main",
                          }}
                        >
                          {initials(l.name)}
                        </Avatar>
                      )}

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        {loading ? (
                          <>
                            <Skeleton width="45%" />
                            <Skeleton width="70%" />
                          </>
                        ) : (
                          <>
                            <Stack
                              direction="row"
                              alignItems="center"
                              gap={1}
                              sx={{ minWidth: 0 }}
                            >
                              <Typography fontWeight={900} noWrap>
                                {l.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                                noWrap
                              >
                                @{l.username}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              alignItems="center"
                              gap={1.25}
                              sx={{ mt: 0.35 }}
                            >
                              <Typography
                                fontWeight={900}
                                sx={{ letterSpacing: -0.1 }}
                              >
                                {l.score.toLocaleString()} pts
                              </Typography>
                              <Rating
                                value={clamp(l.stars, 0, 5)}
                                readOnly
                                size="small"
                                sx={{
                                  "& .MuiRating-iconFilled": {
                                    color: "#f59e0b",
                                  },
                                }}
                              />
                            </Stack>
                          </>
                        )}
                      </Box>
                    </Stack>
                  </CardActionArea>
                </Card>
              ))}
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
}
