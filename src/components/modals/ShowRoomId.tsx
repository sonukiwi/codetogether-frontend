"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface RoomCreatedModalProps {
  open: boolean;
  onClose: () => void;
  roomId: string;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  width: "90%",
  maxWidth: 400,
  textAlign: "center" as const,
};

const ShowRoomIdModal: React.FC<RoomCreatedModalProps> = ({
  open,
  onClose,
  roomId,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy room ID:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Room Created Successfully!
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Click the button below to copy your Room ID.
        </Typography>

        <Stack spacing={2} mt={3}>
          <Tooltip title={copied ? "Copied!" : "Copy Room ID"}>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopy}
              color={copied ? "success" : "primary"}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {copied ? "Copied!" : "Copy Room ID"}
            </Button>
          </Tooltip>

          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            sx={{ borderRadius: 3, textTransform: "none" }}
          >
            Close
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ShowRoomIdModal;
