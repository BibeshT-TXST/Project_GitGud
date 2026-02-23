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
    
        </Box>
    );
}    
