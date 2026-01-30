import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
    { field: 'isbn', headerName: 'ISBN', width : 100},
    { field : 'title', headerName: 'Title', width: 130},
    { field : 'booktype', headerName: 'Book Type', width: 130},
    { field : 'status', headerName: 'Status', width: 130},
    { field : 'purchasedate', headerName: 'Purchase Date', width: 130},
    // place holder for future expansion
];

/*Adding pafination model, may or may not be removed drom inventory table in the future*/
const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper elevation = {0} sx={{ height: 400, width: '100%', maxWidth: 668 }}>
      <DataGrid
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}