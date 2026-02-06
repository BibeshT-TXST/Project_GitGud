import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import Searchbar from '../components/Searchbar';
import DataTable from  '../components/Inventory-table'

/* Inventory Page Component
*/
function InventoryPage() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        //This function pings with the backend via API to extract row data before setting it into the rows variable via setRows
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await api.get('/api/inventory');
                setRows(response.data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch books:", err);
                setError("Failed to load inventory.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);
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
                    <DataTable rows={rows} />
                </Stack>
            </Paper>
        </Box>
    );
}

export default InventoryPage;