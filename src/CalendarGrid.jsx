import React from "react";
import { Box, Grid, Typography, CircularProgress, Tooltip } from "@mui/material";

const days = [
  { day: 1, progress: 95 },
  { day: 2, progress: 100 },
  { day: 3, progress: 98 },
  { day: 4, progress: 97 },
  { day: 5, progress: 96 },
  { day: 6, progress: 95 },
  { day: 7, progress: 94 },
  { day: 8, progress: 93 },
  { day: 9, progress: 92 },
  { day: 10, progress: 91 },
  { day: 11, progress: 90 },
  { day: 12, progress: 89 },
  { day: 13, progress: 88 },
  { day: 14, progress: 85, },
  { day: 15, progress: 86, },
  { day: 16, progress: 87 },
  { day: 17, progress: 86 },
  { day: 18, progress: 85 },
  { day: 19, progress: 84, },
  { day: 20, progress: 83 },
  { day: 21, progress: 82 },
  { day: 22, progress: 81},
  { day: 23, progress: 22 ,dimmed: true, highlighted: true  },
  { day: 24, progress: 0, dimmed: true },
  { day: 25, progress: 0, dimmed: true },
  { day: 26, progress: 0, dimmed: true },
  { day: 27, progress: 0, dimmed: true },
  { day: 28, progress: 0, dimmed: true },
];

const CircleProgress = ({ progress, dimmed, highlighted, day }) => {
  return (
    <Tooltip title={`Progress: ${progress}%`} arrow>
      <Box
        sx={{
          position: "relative",
          width: 50,
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)", // Slight zoom effect on hover
          },
        }}
      >
        {/* Circular Progress Indicator */}
        <CircularProgress
          variant="determinate"
          value={progress}
          size={50}
          thickness={4}
          sx={{
            color: dimmed ? "#888" : "#1f2937",
            opacity: dimmed ? 0.4 : 1,
          }}
        />
        {/* Day Number */}
        <Typography
          sx={{
            position: "absolute",
            fontSize: 14,
            fontWeight: "bold",
            color: dimmed ? "#aaa" : "#fff",
            background: highlighted ? "rgb(85, 117, 187)" : "transparent",
            borderRadius: "50%",
            width: highlighted ? 26 : "auto",
            height: highlighted ? 26 : "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: highlighted ? "4px" : 0,
          }}
        >
          {day}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default function CalendarGrid() {
  return (
    <Box
      sx={{
        backgroundColor: "#1a1a1a",
        p: 4,
        borderRadius: 3,
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        February
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {days.map((day) => (
          <Grid item key={day.day}>
            <CircleProgress
              progress={day.progress}
              dimmed={day.dimmed}
              highlighted={day.highlighted}
              day={day.day}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

