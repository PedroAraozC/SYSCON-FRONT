import { useState } from "react";
import { Box, TextField, IconButton, Popover } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiPicker from "emoji-picker-react";
import "../../index.css";

export default function EmojiInput({ value, onChange, categoria }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEmojiClick = (emojiData) => {
    onChange(emojiData.emoji);
    handleClose();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <TextField
        label="Emoji"
        value={value || ""}
        InputProps={{
          readOnly: true,
        }}
        sx={{
          width: "auto",
          mb: 2,
          backgroundColor: "var(--surface2)",
          borderRadius: "10px",
          border: "solid 1px var(--border)",
          "&:hover": {
            border: "solid 1px var(--border-strong)",
            borderRadius: "10px",
          },
          "& .MuiInputLabel-root": {
            color: "var(--text-secondary)",
          },
          "& .MuiOutlinedInput-root": {
            color: "var(--text)",
            "& fieldset": {
              borderColor: "var(--border)",
            },

            "&:hover fieldset": {
              borderColor: "var(--border-strong)",
            },

            "&.Mui-focused fieldset": {
              borderColor: "var(--accent)",
            },
          },

          "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--accent)",
          },

          "& input": {
            color: "var(--text)",
            fontFamily: "var(--mono)",
          },
        }}
      />

      <IconButton
        onClick={handleClick}
        sx={{
          backgroundColor: "var(--on-surface2)",
          right: 35,
          mt: 1,
          position: "absolute",
        }}
      >
        <EmojiEmotionsIcon
          sx={{
            color: "var(--text-secondary)",
          }}
        />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          theme="dark"
          categories={categoria}
          searchPlaceholder="Buscar emoji..."
        />
      </Popover>
    </Box>
  );
}
