"use client";

import * as React from "react";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Chip,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useProjects } from "@/sections/projects/useProjects";

function initials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

export default function Projects() {
  const { projects: items, loading, error } = useProjects({ limit: 24 });

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
            "linear-gradient(180deg, rgba(37, 99, 235, 0.06), rgba(255,255,255,0))",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography fontWeight={900} sx={{ letterSpacing: -0.2 }} noWrap>
            Projects
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            Project list fetched from API
          </Typography>
        </Box>

        <Chip
          label={loading ? "Loading…" : `${items.length} items`}
          size="small"
          sx={{ fontWeight: 800 }}
        />
      </Stack>

      <Box
        sx={{
          maxHeight: 520,
          overflowY: "auto",
          p: 1.25,
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
        {error ? (
          <Box sx={{ p: 2 }}>
            <Typography fontWeight={900}>Couldn’t load items</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {error}
            </Typography>
          </Box>
        ) : (
          <Stack gap={1}>
            {(loading ? Array.from({ length: 8 }) : items).map((item, idx) => (
              <Card
                key={loading ? idx : item.id}
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  borderColor: "rgba(15, 23, 42, 0.08)",
                  overflow: "hidden",
                  transform: "translateY(0px)",
                  transition: "transform 140ms ease, box-shadow 140ms ease",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 14px 34px rgba(2, 6, 23, 0.08)",
                  },
                }}
              >
                <CardActionArea sx={{ p: 1.5 }}>
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    {loading ? (
                      <Skeleton variant="circular" width={44} height={44} />
                    ) : (
                      <Avatar
                        src={item.avatarUrl}
                        alt={item.title}
                        sx={{
                          width: 44,
                          height: 44,
                          fontWeight: 900,
                          bgcolor: "primary.main",
                        }}
                      >
                        {initials(item.title)}
                      </Avatar>
                    )}

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      {loading ? (
                        <>
                          <Skeleton width="55%" />
                          <Skeleton width="80%" />
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
                              {item.title}
                            </Typography>
                            <Chip
                              label={item.tag}
                              size="small"
                              sx={{
                                height: 22,
                                fontWeight: 800,
                                bgcolor: "rgba(124, 58, 237, 0.10)",
                                color: "secondary.dark",
                              }}
                            />
                          </Stack>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                            noWrap
                          >
                            {item.description}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Stack>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
