"use client";

import * as React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DRAWER_WIDTH = 260;
const DRAWER_MINI = 84;

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = React.useState(false);

  const drawerWidth = collapsed ? DRAWER_MINI : DRAWER_WIDTH;

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh", bgcolor: "background.default" }}>
      <Sidebar collapsed={collapsed} onToggleCollapsed={() => setCollapsed((v) => !v)} />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Header collapsed={collapsed} />

        <Box
          component="main"
          sx={{
            px: { xs: 2, md: 3 },
            py: { xs: 2, md: 3 },
            transition: (t) =>
              t.transitions.create(["padding"], {
                duration: t.transitions.duration.shortest,
              }),
          }}
        >
          <Box
            sx={{
              maxWidth: 1200,
              mx: "auto",
              borderRadius: { xs: 0, md: 4 },
              animation: "contentIn 260ms ease",
              "@keyframes contentIn": {
                from: { opacity: 0, transform: "translateY(6px)" },
                to: { opacity: 1, transform: "translateY(0px)" },
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

