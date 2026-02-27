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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '450px',
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  outline: 'none',
};

const theme = createTheme({
  palette: {
    primary: { main: '#363534' },
  },
});


export default function LogoutModal({ open, onConfirm, onCancel }) {

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

    return (
    <ThemeProvider theme={theme}>
    <Modal 
        open={open} 
        onClose={onCancel} 
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500, style: { backgroundColor: 'rgba(0,0,0,0.6)' } } }}>
        <Fade in={open}>
            <Box sx={modalStyle}>
                <Card sx={{ borderRadius: '12px' }}>
                    {/* ── Header ── */}
                    <Box sx={{ p: 3, borderBottom: '1px solid #eee' }}>
                        <Typography variant="h5" fontWeight="bold" color="#363534">
                            Are you sure you want to log out?
                        </Typography>
                    </Box>
                    <CardContent sx ={{ p:3 }}>
                        <Stack spacing={3} alignItems="center">
                            {/* ── Countdown placeholder ── */}
                            <Typography variant="h6" fontWeight="bold" color="#363534">
                                Logging out in
                            </Typography>
                            <Typography variant="h3" fontWeight="bold" color="#363534">
                                {seconds}s
                            </Typography>
                            {/* ── Footer Buttons ── */}
                            <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ width: '100%', mt: 2 }}>
                                <Button
                                    variant="outlined"
                                    onClick={onCancel}
                                    sx={{ textTransform: 'none', color: 'grey.700', borderColor: 'grey.400' }}
                                >
                                    No
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={onConfirm}
                                    sx={{ textTransform: 'none', px: 4 }}
                                >
                                    Yes
                                </Button>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Fade>
    </Modal>
    </ThemeProvider>
    );
}
