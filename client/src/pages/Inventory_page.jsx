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

    const [selectedRowId, setSelectedRowId] = useState(null); // Tracks which row is currently selected 
    const [isEditMode, setIsEditMode] = useState(false); // Boolean flag indicating if edit mode is active
    const [originalRowData, setOriginalRowData] = useState(null); // Stores the original data before editing 

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

    // Toggles edit mode on/off, handles save logic when in edit mode
    const handleUpdateClick = () => {
        if (isEditMode) {
            // If already in edit mode
            setIsEditMode(false);
            setSelectedRowId(null);
            setOriginalRowData(null);
        } else {
            // If not in edit mode, check if a row is selected
            if (selectedRowId) {
                // Find the selected row data and store it as original
                const rowToEdit = rows.find(row => row.id === selectedRowId);
                setOriginalRowData(rowToEdit);
                setIsEditMode(true);
            } else {
                console.log("Please select a row to edit");
            }
        }
    };

    // Reverts changes and exits edit mode
    const handleCancelClick = () => {
        if (originalRowData) {
            // Restore the original data by updating the rows state
            setRows(prevRows =>
                prevRows.map(row =>
                    row.id === originalRowData.id ? originalRowData : row
                )
            );
        }
        // Exit edit, clear selection
        setIsEditMode(false);
        setSelectedRowId(null);
        setOriginalRowData(null);
    };

    // Captures selected row from DataGrid
    const handleRowSelection = (selectionModel) => {
        // selectionModel is an array of selected row IDs
        // For single selection, only takes the first element
        if (selectionModel.length > 0) {
            setSelectedRowId(selectionModel[0]);
        } else {
            setSelectedRowId(null);
        }
    };

    // Processes row updates and sends to backend
    const handleProcessRowUpdate = async (newRow, oldRow) => {
        try {
            // Send the updated row to the backend
            await api.put(`/api/inventory/${newRow.id}`, newRow);

            // Update the local state with the new row data
            setRows(prevRows =>
                prevRows.map(row => (row.id === newRow.id ? newRow : row))
            );

            return newRow; // Return the new row to confirm the update
        } catch (error) {
            console.error("Failed to update book:", error);
            // Return the old row to revert the change in the UI
            return oldRow;
        }
    };

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
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={() => setOpen(true)} sx={{ pr: 2, width: '100%', maxWidth: 150 }}>
                            Add Book
                        </Button>
                        <Button variant="contained" sx={{ pr: 2, width: '100%', maxWidth: 150 }} onClick={handleUpdateClick}>
                            {isEditMode ? 'Save Changes' : 'Update Book'}
                        </Button>
                        {isEditMode && (
                            <Button variant="outlined" sx={{ pr: 2, width: '100%', maxWidth: 150 }} onClick={handleCancelClick}>
                                Cancel
                            </Button>
                        )}
                    </Stack>
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