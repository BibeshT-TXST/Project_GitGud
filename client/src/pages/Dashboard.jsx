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

    // Fetches book stats from backend
    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await api.get('/api/inventory/stats');
                setStats(response.data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch book stats:", err);
                setError("Failed to load book stats.");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                padding: 3,
                backgroundColor: '#F5F1EE',
            }}
        >
            <Card
                sx={{
                    maxWidth: 900,
                    mx: 'auto',
                    mt: 4,
                    borderRadius: 3,
                    backgroundColor: '#966F33',
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
                    <Typography variant="h4" component="h1" fontWeight={600} gutterBottom sx={{ color: '#F5F1EE' }}>
                        Books
                    </Typography>

                    {loading && <Typography sx={{ color: '#F5F1EE' }}>Loading...</Typography>}
                    {error && <Typography color="error" sx={{ color: '#F5F1EE' }}>{error}</Typography>}
                    {!loading && !error && (
                        <BookStats
                            total={stats.total}
                            byStatus={stats.byStatus}
                            byType={stats.byType}
                        />
                    )}

                </CardContent>

            </Card>
        </Box>
    )

}

export default DashboardPage;