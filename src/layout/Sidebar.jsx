"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";

const DRAWER_WIDTH = 260;
const DRAWER_MINI = 84;

const navItems = [
  { label: "Dashboard", href: "/", icon: <DashboardRoundedIcon /> },
  { label: "Practice", href: "/practice", icon: <AutoGraphRoundedIcon /> },
  { label: "Settings", href: "/settings", icon: <SettingsRoundedIcon /> },
];

export default function Sidebar({ collapsed, onToggleCollapsed }) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const width = collapsed ? DRAWER_MINI : DRAWER_WIDTH;

  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          boxSizing: "border-box",
          borderRight: "1px solid rgba(15, 23, 42, 0.08)",
          overflowX: "hidden",
          transition: (t) =>
            t.transitions.create("width", {
              easing: t.transitions.easing.sharp,
              duration: t.transitions.duration.shortest,
            }),
        },
      }}
    >
      <Stack
        sx={{
          height: "100%",
          px: 1.25,
          pt: 1.25,
          pb: 1,
        }}
        gap={1}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 1.25,
            py: 1,
            borderRadius: 3,
            bgcolor: "rgba(37, 99, 235, 0.08)",
          }}
        >
          <Stack direction="row" alignItems="center" gap={1} sx={{ minWidth: 0 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2.5,
                background:
                  "radial-gradient(120% 120% at 30% 20%, #60a5fa 0%, #2563eb 45%, #1d4ed8 100%)",
                boxShadow: "0 8px 24px rgba(37, 99, 235, 0.25)",
              }}
            />
            {!collapsed && (
              <Box sx={{ minWidth: 0 }}>
                <Typography fontWeight={800} noWrap>
                  Practics
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }} noWrap>
                  Learn fast, track progress
                </Typography>
              </Box>
            )}
          </Stack>

          <Tooltip title={collapsed ? "Expand" : "Collapse"} placement="right">
            <IconButton onClick={onToggleCollapsed} size="small">
              {collapsed ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
            </IconButton>
          </Tooltip>
        </Stack>

        <Divider />

        <List sx={{ px: 0.5 }}>
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
                  mb: 0.5,
                  borderRadius: 3,
                  minHeight: 46,
                  transition: (t) =>
                    t.transitions.create(["background-color", "transform"], {
                      duration: t.transitions.duration.shortest,
                    }),
                  "&:hover": { transform: "translateY(-1px)" },
                  "&.Mui-selected": {
                    bgcolor: "rgba(37, 99, 235, 0.12)",
                    "&:hover": { bgcolor: "rgba(37, 99, 235, 0.14)" },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 44,
                    color: active ? "primary.main" : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: active ? 700 : 600 }}
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

        <Divider />

        <Box sx={{ px: 0.5, pb: 0.75 }}>
          <Tooltip title="Logout" placement="right" disableHoverListener={!collapsed}>
            <ListItemButton
              onClick={() => dispatch(logout())}
              sx={{
                borderRadius: 3,
                minHeight: 46,
                color: "error.main",
                "&:hover": { bgcolor: "rgba(239, 68, 68, 0.08)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 44, color: "error.main" }}>
                <LogoutRoundedIcon />
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ fontWeight: 700 }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        </Box>
      </Stack>
    </Drawer>
  );
}

