import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

/**
 * BookStats Component
 * Renders MUI Paper cards showing numeric counts for book categories.
 * Does NOT fetch data — receives stats as props (Single Responsibility).
 *
 * Props:
 *   - total: number — total book count
 *   - byStatus: array of { status, count } — count per status type
 *   - byType: array of { booktype, count } — count per book type
 */
export default function BookStats({ total, byStatus, byType }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                mt: 3,
                justifyContent: 'center',
            }}
        >
            {/* Total Books Card */}
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    minWidth: 140,
                    textAlign: 'center',
                    backgroundColor: '#363534',  
                }}
            >
                <Typography variant="subtitle2" color='#F5F1EE'>
                    Total Books
                </Typography>
                <Typography variant="h4" fontWeight={700} color='#F5F1EE'>
                    {total}
                </Typography>
            </Paper>

            {/* Status Count Cards */}
            {byStatus.map((item) => (
                <Paper
                    key={item.status}
                    elevation={3}
                    sx={{
                        p: 3,
                        minWidth: 140,
                        textAlign: 'center',
                        backgroundColor: '#363534',
                    }}
                >
                    <Typography variant="subtitle2" color='#F5F1EE'>
                        {item.status}
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color='#F5F1EE'>
                        {item.count}
                    </Typography>
                </Paper>
            ))}

            {/* Book Type Count Cards */}
            {byType.map((item) => (
                <Paper
                    key={item.booktype}
                    elevation={3}
                    sx={{
                        p: 3,
                        minWidth: 140,
                        textAlign: 'center',
                        backgroundColor: '#363534',
                    }}
                >
                    <Typography variant="subtitle2" color='#F5F1EE'>
                        {item.booktype}
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color='#F5F1EE'>
                        {item.count}
                    </Typography>
                </Paper>
            ))}
    
        </Box>
    );
}    
