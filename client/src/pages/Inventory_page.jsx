import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

/* Inventory Page Component
*  Curently a placeholder paper component with sample text
*/

function InventoryPage() {
    return(
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 3,
            }}    
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    minWidth: 300,
                    maxWidth: 800,  
                    width: '100%',
                }}
            >
            </Paper>
        </Box>
    );
}

export default InventoryPage;