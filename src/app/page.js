"use client";
import Leaderboard from "@/sections/leaders/Leaderboard";
import { Stack } from "@mui/material";
import Projects from "@/sections/projects/projects";
import Notes from "@/sections/note/Notes";
import XpProgressBanner from "@/components/XpProgressBanner";
export default function Home() {
  return (
    <>
      <Stack sx={{ width: "100%", mb: 2 }}>
        <XpProgressBanner currentXp={650} minXp={500} maxXp={800} />
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        justifyContent="space-between"
        alignItems="stretch"
        sx={{ width: "100%" }}
      >
        <Stack sx={{ flex: 1, minWidth: 0 }}>
          <Projects />
        </Stack>
        <Stack sx={{ flex: 1, minWidth: 0 }}>
          <Leaderboard />
        </Stack>
      </Stack>
      <Notes />
    </>
  );
}
