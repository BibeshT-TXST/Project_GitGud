import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import Searchbar from '../components/Searchbar';
import DataTable from  '../components/Inventory-table'

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
                }}
            >
                <Stack spacing={4}>
                    <Typography variant="h4" component="h1" fontWeight={600}>
                        Inventory List
                    </Typography>
                    <Searchbar />
                    <DataTable />
                </Stack>
            </Paper>
        </Box>
    );
}

export default InventoryPage;