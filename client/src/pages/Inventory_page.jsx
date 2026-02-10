import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import Searchbar from '../components/Searchbar';
import DataTable from '../components/Inventory-table'
import Button from '@mui/material/Button';
import AddBookModal from '../components/Add-book';

/* Inventory Page Component
*/
function InventoryPage() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);

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

    useEffect(() => {
        fetchBooks();
    }, []);

    //This constant takes rows extracted from the databaase and filters it using the text input in search bar
    const filteredRows = rows.filter((row) =>
        row.title && row.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    //By defauly search options has all the materials in a scroll menu
    const searchOptions = rows.map((row) => ({ title: row.title || '' }));

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
                    <Button variant="contained" onClick={() => setOpen(true)} sx={{ pr: 2, width: '100%', maxWidth: 150 }}>
                        Add Book
                    </Button>
                    <Searchbar onSearchChange={setSearchQuery} options={searchOptions} />
                    <DataTable rows={filteredRows} />
                    <AddBookModal
                        open={open}
                        onClose={() => setOpen(false)}
                        onBookAdded={fetchBooks}
                    />
                </Stack>
            </Paper>
        </Box>
    );
}

export default InventoryPage;