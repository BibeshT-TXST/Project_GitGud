import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
    { 
        field: 'isbn',
        headerName: 'ISBN',
        type : 'number',
        width : 100
    },
    { field : 'title', headerName: 'Title', width: 130},
    { field : 'booktype', headerName: 'Book Type', width: 130},
    { field : 'status', headerName: 'Status', width: 130},
    { field : 'purchasedate', headerName: 'Purchase Date', width: 130},
];
