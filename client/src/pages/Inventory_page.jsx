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
import { GridRowModes } from '@mui/x-data-grid';
import BookStatus from '../components/status';
import Booktype from '../components/booktype';
import DownloadIcon from '@mui/icons-material/Download';

/* Inventory Page Component
*/
function InventoryPage() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("");
    const [booktypeFilter, setBooktypeFilter] = useState("");


    const [selectedRowId, setSelectedRowId] = useState(null); // Tracks which row is currently selected 
    const [isEditMode, setIsEditMode] = useState(false); // Boolean flag indicating if edit mode is active
    const [originalRowData, setOriginalRowData] = useState(null); // Stores the original data before editing 
    const [rowModesModel, setRowModesModel] = useState({});

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
    const handleUpdateClick = async () => {
        if (isEditMode) {
            // If already in edit mode -> SAVE
            setIsEditMode(false);
            setRowModesModel({ ...rowModesModel, [selectedRowId]: { mode: GridRowModes.View } });
            setSelectedRowId(null);
            setOriginalRowData(null);
        } else {
            // If not in edit mode, check if a row is selected -> EDIT
            if (selectedRowId) {
                // Find the selected row data and store it as original
                const rowToEdit = rows.find(row => String(row.isbn) === String(selectedRowId));
                setOriginalRowData(rowToEdit);
                setIsEditMode(true);
                setRowModesModel({ ...rowModesModel, [selectedRowId]: { mode: GridRowModes.Edit } });
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
                    row.isbn === originalRowData.isbn ? originalRowData : row
                )
            );
        }
        // Exit edit, clear selection
        setIsEditMode(false);
        setRowModesModel({
            ...rowModesModel,
            [selectedRowId]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        setSelectedRowId(null);
        setOriginalRowData(null);
    };

    // Captures selected row from DataGrid
    const handleRowSelection = (selectionModel) => {
        console.log("handleRowSelection called. Model:", selectionModel);
        let selectedId = null;

        // selectionModel can be an array [id] (standard) or an object { ids: Set } (some versions/configs)
        if (Array.isArray(selectionModel)) {
            if (selectionModel.length > 0) selectedId = selectionModel[0];
        } else if (selectionModel && selectionModel.ids && selectionModel.ids instanceof Set) {
            // Handle Set case
            if (selectionModel.ids.size > 0) {
                selectedId = Array.from(selectionModel.ids)[0];
            }
        } else if (selectionModel && typeof selectionModel === 'object' && selectionModel.ids) {
            // Fallback for object with ids array/iterable
            const ids = Array.from(selectionModel.ids);
            if (ids.length > 0) selectedId = ids[0];
        }

        setSelectedRowId(selectedId);
    };

    // Processes row updates and sends to backend
    const handleProcessRowUpdate = async (newRow, oldRow) => {
        try {
            // Send the updated row to the backend
            // Use newRow.isbn because DataGrid uses isbn as the row ID (see getRowId in Inventory-table.jsx)
            const response = await api.put(`/api/inventory/${newRow.isbn}`, newRow);
            console.log("Update successful:", response.data);

            // Update the local state with the new row data
            setRows(prevRows =>
                prevRows.map(row => (row.isbn === newRow.isbn ? newRow : row))
            );

            return newRow; // Return the new row to confirm the update
        } catch (error) {
            console.error("Failed to update book:", error);
            // Return the old row to revert the change in the UI
            return oldRow;
        }
    };

    const handleDownlaodCSV = () => {
        const headers = ['isbn', 'title', 'booktype', 'status', 'purchasedate'];
        const headerLabels = ['ISBN', 'Title', 'Book Type', 'Status', 'Purchase Date'];   

    }

    //This constant takes rows extracted from the databaase and filters it using the text input in search bar
    const filteredRows = rows
        .filter((row) => row.title && row.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((row) => statusFilter === "" || row.status === statusFilter)
        .filter((row) => booktypeFilter === "" || row.booktype === booktypeFilter);
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
                        <Button variant="contained" sx={{ pr: 2, width: '100%', maxWidth: 150 }} endIcon={<DownloadIcon />}>
                            Download
                        </Button>
                    </Stack>
                    <Stack spacing={2} direction="row">
                        <Searchbar onSearchChange={setSearchQuery} options={searchOptions} />
                        <BookStatus value={statusFilter} onStatusChange={setStatusFilter} />
                        <Booktype value={booktypeFilter} onStatusChange={setBooktypeFilter} />
                    </Stack>
                    <DataTable
                        rows={filteredRows}
                        isEditMode={isEditMode}
                        onRowSelection={handleRowSelection}
                        onProcessRowUpdate={handleProcessRowUpdate}
                        rowModesModel={rowModesModel}
                        setRowModesModel={setRowModesModel}
                    />
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