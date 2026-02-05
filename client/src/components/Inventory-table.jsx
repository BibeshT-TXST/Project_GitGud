import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import api from '../api/axios';

const columns = [
  { field: 'isbn', headerName: 'ISBN', minWidth: 200},
  { field: 'title', headerName: 'Title', minWidth: 200, flex: 1},
  { field: 'booktype', headerName: 'Book Type', minWidth: 200 },
  { field: 'status', headerName: 'Status', minWidth: 200 },
  { field: 'purchasedate', headerName: 'Purchase Date', minWidth: 200 },
  // place holder for future expansion
];


/*Adding pafination model, may or may not be removed drom inventory table in the future*/
const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect (()=>{
  const fetchBooks = async () => {
    try{
      setLoading(true);
    } catch (err){
      console.error("Failed to fetch books:", err);
      setError("Failed to load inventory.");
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
}, []);  

  return (
    <Paper elevation={0} sx={{ height: 400, width: '100%' }}>
      <DataGrid
        //rows={rows}
        columns={columns}
        getRowId={(row) => row.isbn}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}