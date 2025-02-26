import React from "react";
import { Box, Paper } from "@mui/material";
import Avatar1 from "./avatar_eng";
import Avatar2 from "./avatar2";
import TalkingDoctor from "./avatar";

const AvatarLayout = ({ layout }) => {
  const renderAvatar = () => {
    switch (layout) {
      case "english":
        return <Avatar1 />;
      case "hindi":
        return <Avatar2 />;
      case "marathi":
        return <TalkingDoctor />;
      default:
        return <Avatar1 />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%", // Full height for flexibility
        width: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: "50%", // Circular shape
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "250px", // Increased size
          height: "250px", // Keep it equal for a perfect circle
          bgcolor: "background.default",
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%", // Keeps the image inside circular
            overflow: "hidden",
          }}
        >
          {renderAvatar()}
        </Box>
      </Paper>
    </Box>
  );
};

export default AvatarLayout;
