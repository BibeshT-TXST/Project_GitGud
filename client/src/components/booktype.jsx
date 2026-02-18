import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import api from '../api/axios';

export default function Booktype() {
  const [booktype, setBooktype] = React.useState('');

  const handleChange = (event) => {
    setBooktype(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">BookType</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={booktype}
          label="BookType"
          onChange={handleChange}
        >
           <MenuItem value="Paperback">Paperback</MenuItem>
           <MenuItem value="HardCover">HardCover</MenuItem>
           <MenuItem value="E-Book">E-Book</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}