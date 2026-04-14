"use client";

import * as React from "react";
import { AppBar, Avatar, Badge, Box, Chip, Toolbar, Typography } from "@mui/material";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";

function greetingForNow(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function Header({ collapsed }) {
  const greeting = greetingForNow();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 3 },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.2 }} noWrap>
            {greeting}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            Let’s keep the streak going today.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Chip
            icon={<MilitaryTechRoundedIcon />}
            label="1,280 pts"
            sx={{
              fontWeight: 800,
              borderRadius: 999,
              bgcolor: "rgba(124, 58, 237, 0.10)",
              color: "secondary.dark",
              "& .MuiChip-icon": { color: "secondary.main" },
              transition: "transform 120ms ease",
              "&:hover": { transform: "translateY(-1px)" },
            }}
          />

          <Badge
            variant="dot"
            color="success"
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            sx={{
              "& .MuiBadge-badge": {
                boxShadow: "0 0 0 2px #fff",
              },
            }}
          >
            <Avatar
              alt="User avatar"
              sx={{
                width: 40,
                height: 40,
                bgcolor: "primary.main",
                fontWeight: 800,
              }}
            >
              U
            </Avatar>
          </Badge>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

