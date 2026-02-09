import React, { useState } from 'react';
import api from '../api/axios';
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

const theme = createTheme({
  palette: {
    primary: { main: '#4A1D1F' },
  },
});

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

export default function AddBookModal({ open, onClose, onBookAdded }) {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [bookType, setBookType] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      if (!isbn || !title || !bookType || !status || !date) {
        setError('Please fill in all fields.');
        return;
      }

      await api.post('/api/inventory/add', {
        isbn,
        title,
        booktype: bookType, // Match backend expectation
        status,
        date
      });

      // Clear form
      setIsbn('');
      setTitle('');
      setBookType('');
      setStatus('');
      setDate('');
      setError('');

      if (onBookAdded) onBookAdded();
      onClose();
    } catch (err) {
      console.error("Failed to add book:", err);
      setError('Failed to add book. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: { timeout: 500, style: { backgroundColor: 'rgba(0, 0, 0, 0.6)' } }
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Card sx={{ borderRadius: '12px' }}>
              <Box sx={{ p: 3, borderBottom: '1px solid #eee' }}>
                <Typography variant="h6" fontWeight="bold">
                  Add a Book
                </Typography>
                {error && <Typography color="error" variant="body2">{error}</Typography>}
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                  {/* Text Fields */}
                  <TextField
                    fullWidth
                    label="ISBN"
                    variant="outlined"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  {/* Book Type Dropdown */}
                  <TextField
                    select
                    fullWidth
                    label="Book Type"
                    value={bookType}
                    onChange={(e) => setBookType(e.target.value)}
                  >
                    <MenuItem value="Paperback">Paperback</MenuItem>
                    <MenuItem value="HardCover">HardCover</MenuItem>
                    <MenuItem value="E-Book">E-Book</MenuItem>
                  </TextField>

                  {/* Book Status Dropdown */}
                  <TextField
                    select
                    fullWidth
                    label="Book Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value="Out on Loan">Out on Loan</MenuItem>
                    <MenuItem value="Reserved">Reserved</MenuItem>
                    <MenuItem value="in-Repair">In-Repair</MenuItem>
                    <MenuItem value="Archived">Archived</MenuItem>
                  </TextField>

                  {/* Strict Date Field */}
                  <TextField
                    fullWidth
                    label="Acquisition Date"
                    type="date"
                    InputLabelProps={{ shrink: true }} // Required for date types
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />

                  {/* Footer Buttons */}
                  <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={onClose}
                      sx={{ textTransform: 'none', color: 'grey.700', borderColor: 'grey.400' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ textTransform: 'none', px: 4 }}
                    >
                      Add
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