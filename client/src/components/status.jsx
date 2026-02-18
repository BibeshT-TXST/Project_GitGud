import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import api from '../api/axios';

export default function BookStatus() {
  const [bookstatus, setBookstatus] = React.useState('');

  const handleChange = (event) => {
    setBookstatus(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Status}
          label="Status"
          onChange={handleChange}
        >
            <MenuItem value="Out on Loan">Out on Loan</MenuItem>
            <MenuItem value="Reserved">Reserved</MenuItem>
            <MenuItem value="in-Repair">In-Repair</MenuItem>
            <MenuItem value="Archived">Archived</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}