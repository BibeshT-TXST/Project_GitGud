import React from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../context/AuthContext';

/* Accounts Page Component */
function AccountsPage() {

    /* Pull the users NetID from auth context */
    const { user } = useAuth();

}

export default AccountsPage;