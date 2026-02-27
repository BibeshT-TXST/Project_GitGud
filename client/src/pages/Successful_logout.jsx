import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function SuccessfulLogout() {
    const [seconds, setSeconds] = useState(12);
    const navigate = useNavigate();
    const { logout } = useAuth(); // Needed to clear context

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h3" gutterBottom>Successfully Logged out</Typography>
            <Typography variant="h6">Redirecting to the login page in {seconds} seconds...</Typography>
        </Box>
    );
}