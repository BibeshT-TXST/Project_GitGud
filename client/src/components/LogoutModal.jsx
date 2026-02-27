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
