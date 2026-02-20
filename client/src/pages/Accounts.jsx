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

    return(
        <Box
            sx={{
                width: '100%',
                height: '100%',
                padding: 3,
            }}
        >
            <Card
                sx={{
                    maxWidth: 450,
                    mx: 'auto',
                    mt: 4,
                    borderRadius: 3,
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        py: 5,
                        px: 4,
                    }}
                >
                    {/* Account avatar icon */}
                    <AccountCircleIcon
                        sx={{ fontSize: 80, color: 'action.active', mb: 2 }}
                    />

                    {/* Page heading */}
                    <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
                        My Account
                    </Typography>

                    {/* NetID detail row */}
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                        <strong>Net ID:</strong> {user ?? 'N/A'}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )

}

export default AccountsPage;