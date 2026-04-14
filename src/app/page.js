"use client";

import Leaderboard from "@/sections/leaders/Leaderboard";
import { Stack } from "@mui/material";
import Projects from "@/sections/projects/projects";
import Notes from "@/sections/note/NotesNotes";
export default function Home() {
  return (
    <>
      <Stack
        gap={2}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ width: "100%" }}
      >
        <Projects />
        <Leaderboard />
      </Stack>
      <Notes />
    </>
  );
}
