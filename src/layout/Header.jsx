"use client";

import * as React from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

function greetingForNow(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function Header({ collapsed, onMenuClick }) {
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
          {onMenuClick ? (
            <IconButton
              onClick={onMenuClick}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                bgcolor: "rgba(15, 23, 42, 0.04)",
                "&:hover": { bgcolor: "rgba(15, 23, 42, 0.06)" },
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
          ) : null}

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: -0.2 }} noWrap>
              Ciao, Dr. Luca!
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              Inizia la giornata con un nuovo corso!
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", px: 2 }}>
          <Box
            sx={{
              position: "relative",
              height: 44,
              width: 184,
              borderRadius: 999,
              overflow: "hidden",
              boxShadow: "0 18px 44px rgba(245, 158, 11, 0.35)",
              transform: "translateZ(0)",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, #fbbf24 0%, #fbbf24 58%, #1d4ed8 58%, #1d4ed8 100%)",
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 2,
                borderRadius: 999,
                border: "2px solid rgba(29, 78, 216, 0.95)",
                opacity: 0.9,
                pointerEvents: "none",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                left: 18,
                top: "50%",
                transform: "translateY(-50%)",
                fontWeight: 1000,
                fontSize: 26,
                lineHeight: 1,
                letterSpacing: -0.4,
                color: "#111827",
              }}
            >
              345
            </Box>

            <Box
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                width: 34,
                height: 34,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.95)",
                border: "2px solid rgba(29, 78, 216, 0.95)",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 10px 20px rgba(2, 6, 23, 0.18)",
              }}
            >
              <Box
                component="img"
                alt="Mascot"
                src="https://dummyjson.com/icon/emilys/64"
                sx={{ width: 22, height: 22 }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
              src="https://dummyjson.com/icon/emilys/128"
            >
              U
            </Avatar>
          </Badge>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

