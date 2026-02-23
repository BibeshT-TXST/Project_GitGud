import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import api from '../api/axios';
import BookStats from '../components/BookStats';

/*Dashboard Page Component */
function DashboardPage(){
    const [stats, setStats] = useState({ total: 0, byStatus: [], byType: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        py: 5,
                        px: 4,
                    }}
                >
                    <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
                        Books
                    </Typography>
                </CardContent>

            </Card>
        </Box>    
    )

}

export default DashboardPage;