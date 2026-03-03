import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  { field: 'isbn', headerName: 'ISBN', minWidth: 200, editable: false },
  { field: 'title', headerName: 'Title', minWidth: 200, flex: 1, editable: true },
  { field: 'booktype', headerName: 'Book Type', minWidth: 200, editable: true },
  { field: 'status', headerName: 'Status', minWidth: 200, editable: true },
  { field: 'purchasedate', headerName: 'Purchase Date', minWidth: 200, editable: false },
  // place holder for future expansion
];

/*Adding pafination model, may or may not be removed drom inventory table in the future*/
const paginationModel = { page: 0, pageSize: 5 };

//This is a fully UI component that updates based on th text in the search box of search bar
export default function DataTable({
  rows = [],
  isEditMode = false,
  onRowSelection,
  onProcessRowUpdate,
  onProcessRowUpdateError,
  rowModesModel,
  setRowModesModel
}) {

  return (
    <Paper elevation={0} sx={{ height: 400, width: '100%' }}>
      <DataGrid
        //The filtered rows are recieved via props from Inventory_table
        rows={rows}
        columns={columns}
        getRowId={(row) => row.isbn}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          border: 0,
          '& .MuiDataGrid-columnHeaderTitle': { color: '#363524' },
          '& .MuiDataGrid-cell': { color: '#363524' },
        }}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={onProcessRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        onRowSelectionModelChange={onRowSelection}
      />
    </Paper>
  );
}