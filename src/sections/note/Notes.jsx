"use client";

import * as React from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import * as yup from "yup";
import { useAddNoteMutation, useGetNotesQuery } from "@/services/baseAPI";

const schema = yup.object({
  title: yup.string().trim().min(3, "Title must be at least 3 characters").max(60).required(),
  body: yup.string().trim().min(10, "Note must be at least 10 characters").max(500).required(),
});

function initials(s = "") {
  const t = String(s).trim();
  return t ? t.slice(0, 1).toUpperCase() : "N";
}

export default function Notes() {
  const { data, isLoading, isError, error, refetch, isFetching } = useGetNotesQuery();
  const [addNote, addState] = useAddNoteMutation();

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({ title: "", body: "" });
  const [fieldErrors, setFieldErrors] = React.useState({});

  const notes = data ?? [];

  async function onSubmit() {
    setFieldErrors({});
    try {
      const valid = await schema.validate(values, { abortEarly: false });
      await addNote(valid).unwrap();
      setOpen(false);
      setValues({ title: "", body: "" });
      // Notes list auto-refetches via invalidatesTags, but this makes it immediate.
      refetch();
    } catch (e) {
      if (e?.name === "ValidationError") {
        const next = {};
        for (const inner of e.inner ?? []) {
          if (inner?.path) next[inner.path] = inner.message;
        }
        setFieldErrors(next);
        return;
      }
      setFieldErrors({ form: e instanceof Error ? e.message : "Failed to create note" });
    }
  }

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
          background: "linear-gradient(180deg, rgba(37, 99, 235, 0.06), rgba(255,255,255,0))",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography fontWeight={900} sx={{ letterSpacing: -0.2 }} noWrap>
            Notes
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            Create a note in a modal (POST), then refresh list
          </Typography>
        </Box>

        <Stack direction="row" alignItems="center" gap={1}>
          <Chip
            icon={<NotesRoundedIcon />}
            label={isLoading ? "Loading…" : `${notes.length} notes`}
            size="small"
            sx={{ fontWeight: 900, "& .MuiChip-icon": { color: "primary.main" } }}
          />
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 999, fontWeight: 900 }}
          >
            Add note
          </Button>
        </Stack>
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
        {isError ? (
          <Alert severity="error">
            {error?.message ?? "Failed to load notes"}{" "}
            <Button onClick={() => refetch()} size="small">
              Retry
            </Button>
          </Alert>
        ) : (
          <Stack gap={1}>
            {(isLoading ? Array.from({ length: 8 }) : notes).map((n, idx) => (
              <Card
                key={isLoading ? idx : n.id}
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  borderColor: "rgba(15, 23, 42, 0.08)",
                  transition: "transform 140ms ease, box-shadow 140ms ease",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 14px 34px rgba(2, 6, 23, 0.08)",
                  },
                }}
              >
                <CardContent sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                  {isLoading ? (
                    <Skeleton variant="circular" width={44} height={44} />
                  ) : (
                    <Avatar sx={{ width: 44, height: 44, bgcolor: "primary.main", fontWeight: 900 }}>
                      {initials(n.title)}
                    </Avatar>
                  )}

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {isLoading ? (
                      <>
                        <Skeleton width="55%" />
                        <Skeleton width="90%" />
                      </>
                    ) : (
                      <>
                        <Typography fontWeight={950} noWrap>
                          {n.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {n.body}
                        </Typography>
                      </>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>

      <Dialog
        open={open}
        onClose={() => (addState.isLoading ? null : setOpen(false))}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle sx={{ fontWeight: 950 }}>
          New note
          <IconButton
            onClick={() => setOpen(false)}
            disabled={addState.isLoading}
            sx={{ position: "absolute", right: 10, top: 10 }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          {fieldErrors.form ? (
            <Alert severity="error" sx={{ mb: 1.5 }}>
              {fieldErrors.form}
            </Alert>
          ) : null}

          <Stack gap={1.5} sx={{ mt: 0.5 }}>
            <TextField
              label="Title"
              value={values.title}
              onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
              error={!!fieldErrors.title}
              helperText={fieldErrors.title || " "}
              fullWidth
              autoFocus
            />
            <TextField
              label="Note"
              value={values.body}
              onChange={(e) => setValues((v) => ({ ...v, body: e.target.value }))}
              error={!!fieldErrors.body}
              helperText={fieldErrors.body || " "}
              fullWidth
              multiline
              minRows={4}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setOpen(false)} disabled={addState.isLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onSubmit}
            disabled={addState.isLoading || isFetching}
            sx={{ fontWeight: 900 }}
          >
            {addState.isLoading ? "Posting…" : "Post note"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

