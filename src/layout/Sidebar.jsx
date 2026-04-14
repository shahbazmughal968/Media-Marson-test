"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";

const DRAWER_WIDTH = 260;
const DRAWER_MINI = 84;

const navItems = [
  { label: "Dashboard", href: "/", icon: <DashboardRoundedIcon /> },
  { label: "Bacheca annunci", href: "/annunci", icon: <CampaignRoundedIcon /> },
  { label: "Simulatore", href: "/simulatore", icon: <SmartToyRoundedIcon /> },
  { label: "Simulazioni archiviate", href: "/archivio", icon: <ArchiveRoundedIcon /> },
  { label: "Quadernino degli errori", href: "/errori", icon: <BugReportRoundedIcon /> },
  { label: "Simulazione ufficiale", href: "/ufficiale", icon: <EmojiEventsRoundedIcon /> },
  { label: "Le mie statistiche", href: "/statistiche", icon: <QueryStatsRoundedIcon /> },
];

export default function Sidebar({
  variant = "permanent",
  open = true,
  onClose,
  collapsed,
  onToggleCollapsed,
  showCollapseToggle = true,
}) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const width =
    variant === "permanent"
      ? collapsed
        ? DRAWER_MINI
        : DRAWER_WIDTH
      : DRAWER_WIDTH;

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          boxSizing: "border-box",
          borderRight: "0",
          overflowX: "hidden",
          bgcolor: "transparent",
          transition:
            variant === "permanent"
              ? (t) =>
                  t.transitions.create("width", {
                    easing: t.transitions.easing.sharp,
                    duration: t.transitions.duration.shortest,
                  })
              : undefined,
        },
      }}
    >
      <Stack
        sx={{
          height: "100%",
          px: 2,
          pt: 2,
          pb: 2,
          bgcolor: "#0a55c8",
          background:
            "linear-gradient(180deg, #0a55c8 0%, #0a52c0 30%, #0a4fb0 100%)",
          borderTopRightRadius: 6,
          borderBottomRightRadius: 0,
        }}
        gap={2}
      >
        <Stack direction="row" alignItems="center" spacing={1.25} sx={{ px: 1 }}>
          <Avatar
            sx={{
              width: 44,
              height: 44,
              bgcolor: "#ffffff",
              color: "#0a55c8",
              fontWeight: 1000,
            }}
          >
            L
          </Avatar>
          {!collapsed ? (
            <Typography
              variant="h5"
              sx={{ fontWeight: 1000, letterSpacing: -0.2, color: "#fff" }}
              noWrap
            >
              Logica
            </Typography>
          ) : null}
        </Stack>

        <List sx={{ px: 0.5, color: "#fff" }}>
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            const content = (
              <ListItemButton
                key={item.href}
                component={Link}
                href={item.href}
                selected={!!active}
                sx={{
                  mb: 1,
                  borderRadius: 3.5,
                  minHeight: 52,
                  transition: (t) =>
                    t.transitions.create(["background-color", "transform"], {
                      duration: t.transitions.duration.shortest,
                    }),
                  "&:hover": { transform: "translateY(-1px)" },
                  "&.Mui-selected": {
                    bgcolor: "rgba(2, 6, 23, 0.55)",
                    "&:hover": { bgcolor: "rgba(2, 6, 23, 0.62)" },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 44,
                    color: "#fff",
                    opacity: active ? 1 : 0.92,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: active ? 900 : 700,
                      sx: { color: "#fff" },
                    }}
                  />
                )}
              </ListItemButton>
            );

            return collapsed ? (
              <Tooltip key={item.href} title={item.label} placement="right">
                {content}
              </Tooltip>
            ) : (
              content
            );
          })}
        </List>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ px: 0.5 }}>
          <Tooltip
            title="Logout"
            placement="right"
            disableHoverListener={!collapsed}
          >
            <ListItemButton
              onClick={() => dispatch(logout())}
              sx={{
                borderRadius: 999,
                minHeight: 54,
                bgcolor: "#ffffff",
                color: "error.main",
                "&:hover": { bgcolor: "rgba(255,255,255,0.92)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 44, color: "error.main" }}>
                <LogoutRoundedIcon />
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ fontWeight: 900 }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        </Box>
      </Stack>
    </Drawer>
  );
}
