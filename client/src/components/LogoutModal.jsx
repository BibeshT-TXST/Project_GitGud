import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Stack,
  Typography,
  Backdrop,
  Fade,
  createTheme,
  ThemeProvider
} from '@mui/material';

// Core timer logic
const [seconds, setSeconds] = useState(12);

useEffect(() => {
  if (!open) { setSeconds(12); return; } // reset on close
  const id = setInterval(() => {
    setSeconds(prev => {
      if (prev <= 1) { clearInterval(id); onConfirm(); return 0; }
      return prev - 1;
    });
  }, 1000);
  return () => clearInterval(id);
}, [open]);


export default function LogoutModal({ open, onConfirm, onCancel }) {
  return (
    <Modal 
        open={open} 
        onClose={onCancel} 
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500, style: { backgroundColor: 'rgba(0,0,0,0.6)' } } }}>
        <Fade in={open}>
            <Box sx={modalStyle}>
            
            </Box>
        </Fade>
    </Modal>
  );
}
