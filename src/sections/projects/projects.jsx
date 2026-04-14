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
        overflow: "hidden",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: { xs: "auto", md: 680 },
        minHeight: { xs: 0, md: 680 },
      }}
    >
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
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
          <Stack spacing={2}>
            {(loading ? Array.from({ length: 8 }) : items).map((item, idx) => (
              <Card
                key={loading ? idx : item.id}
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  borderColor: "rgba(15, 23, 42, 0.06)",
                  bgcolor: "rgba(15, 23, 42, 0.03)",
                  transform: "translateY(0px)",
                  transition: "transform 140ms ease, box-shadow 140ms ease",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 14px 34px rgba(2, 6, 23, 0.08)",
                  },
                }}
              >
                <CardActionArea sx={{ p: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
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
                          border: "2px solid rgba(255,255,255,0.9)",
                          boxShadow: "0 10px 22px rgba(37, 99, 235, 0.18)",
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
                          <Typography
                            sx={{
                              fontWeight: 950,
                              color: "primary.main",
                              letterSpacing: -0.2,
                            }}
                            noWrap
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
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
