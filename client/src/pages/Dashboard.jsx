import React from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../context/AuthContext';

/*Dashboard Page Component */
function DashboardPage(){
    return (
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

            </Card>
        </Box>    
    )

}

export default DashboardPage;