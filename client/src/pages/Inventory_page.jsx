import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

/* Inventory Page Component
*/
function InventoryPage() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                padding: 3,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    padding: 3,
                    width: 'fit-content',
                }}
            >
                <Typography variant="h4" component="h1" fontWeight={600}>
                    Inventory List
                </Typography>
            </Paper>
        </Box>
    );
}

export default InventoryPage;