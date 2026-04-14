"use client";

import * as React from "react";
import {
  Avatar,
  Box,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export default function XpProgressBanner({
  currentXp = 650,
  minXp = 500,
  maxXp = 800,
  leftLabel = "500 XP",
  rightLabel = "800 XP",
}) {
  const pct =
    maxXp <= minXp
      ? 0
      : ((clamp(currentXp, minXp, maxXp) - minXp) / (maxXp - minXp)) * 100;

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2.5,
        overflow: "hidden",
        background:
          "linear-gradient(90deg, rgba(30, 64, 175, 0.95) 0%, rgba(37, 99, 235, 0.95) 40%, rgba(59, 130, 246, 0.95) 100%)",
        boxShadow: "0 18px 60px rgba(2, 6, 23, 0.10)",
        border: "1px solid rgba(255,255,255,0.18)",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{ px: 2, py: 1.25 }}
        gap={2}
      >
        <Avatar
          sx={{
            width: 54,
            height: 54,
            bgcolor: "rgba(255,255,255,0.18)",
            border: "2px solid rgba(255,255,255,0.38)",
          }}
        >
          <LocalFireDepartmentRoundedIcon />
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0, position: "relative" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 0.75 }}
          >
            <Chip
              label={leftLabel}
              size="small"
              sx={{
                height: 22,
                fontWeight: 900,
                bgcolor: "rgba(255,255,255,0.88)",
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.80)", fontWeight: 900 }}
            >
              {rightLabel}
            </Typography>
          </Stack>

          <Box sx={{ position: "relative" }}>
            <LinearProgress
              variant="determinate"
              value={pct}
              sx={{
                height: 14,
                borderRadius: 999,
                bgcolor: "rgba(2, 6, 23, 0.20)",
                border: "1px solid rgba(255,255,255,0.20)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 999,
                  background:
                    "repeating-linear-gradient(135deg, rgba(250, 204, 21, 0.95) 0px, rgba(250, 204, 21, 0.95) 10px, rgba(245, 158, 11, 0.95) 10px, rgba(245, 158, 11, 0.95) 20px)",
                },
              }}
            />

            <Box
              sx={{
                position: "absolute",
                left: `calc(${pct}% - 28px)`,
                top: -26,
                transform: "translateX(0)",
              }}
            >
              <Chip
                label={`${currentXp} XP`}
                size="small"
                sx={{
                  height: 24,
                  fontWeight: 950,
                  bgcolor: "rgba(255,255,255,0.92)",
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            </Box>
          </Box>
        </Box>

        <Avatar
          sx={{
            width: 54,
            height: 54,
            bgcolor: "rgba(255,255,255,0.18)",
            border: "2px solid rgba(255,255,255,0.38)",
          }}
        >
          <FitnessCenterRoundedIcon />
        </Avatar>
      </Stack>
    </Box>
  );
}
