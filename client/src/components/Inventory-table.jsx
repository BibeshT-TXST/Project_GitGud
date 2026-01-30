import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  { field: 'isbn', headerName: 'ISBN', width: 100 },
  { field: 'title', headerName: 'Title', width: 130 },
  { field: 'booktype', headerName: 'Book Type', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'purchasedate', headerName: 'Purchase Date', width: 130 },
  // place holder for future expansion
];

const rows = [
  { isbn: '978-0140449136', title: 'The Odyssey', booktype: 'Hardcover', status: 'Available', purchasedate: '2023-01-15' },
  { isbn: '978-0451524935', title: '1984', booktype: 'Paperback', status: 'Out on Loan', purchasedate: '2023-02-10' },
  { isbn: '978-0060850524', title: 'Brave New World', booktype: 'Paperback', status: 'Available', purchasedate: '2023-03-05' },
  { isbn: '978-0316769174', title: 'The Catcher in the Rye', booktype: 'Hardcover', status: 'Reserved', purchasedate: '2023-03-22' },
  { isbn: '978-0743273565', title: 'The Great Gatsby', booktype: 'Hardcover', status: 'Available', purchasedate: '2023-04-12' },
  { isbn: '978-0486280615', title: 'Adventures of Huckleberry Finn', booktype: 'Paperback', status: 'In Repair', purchasedate: '2023-05-01' },
  { isbn: '978-0141439518', title: 'Pride and Prejudice', booktype: 'E-Book', status: 'Available', purchasedate: '2023-05-18' },
  { isbn: '978-0345339683', title: 'The Hobbit', booktype: 'Hardcover', status: 'Available', purchasedate: '2023-06-10' },
  { isbn: '978-0061120084', title: 'To Kill a Mockingbird', booktype: 'Paperback', status: 'Out on Loan', purchasedate: '2023-07-04' },
  { isbn: '978-0451526342', title: 'Animal Farm', booktype: 'Paperback', status: 'Available', purchasedate: '2023-07-25' },
  { isbn: '978-0142437230', title: 'Don Quixote', booktype: 'Hardcover', status: 'Archived', purchasedate: '2023-08-14' },
  { isbn: '978-0743477116', title: 'Romeo and Juliet', booktype: 'E-Book', status: 'Available', purchasedate: '2023-09-02' },
  { isbn: '978-0140283334', title: 'The Pillars of the Earth', booktype: 'Paperback', status: 'Out on Loan', purchasedate: '2023-09-28' },
  { isbn: '978-0307474278', title: 'The Da Vinci Code', booktype: 'Paperback', status: 'Available', purchasedate: '2023-10-12' },
  { isbn: '978-0316015844', title: 'Twilight', booktype: 'Hardcover', status: 'Lost', purchasedate: '2023-11-05' },
  { isbn: '978-0544003415', title: 'The Lord of the Rings', booktype: 'Hardcover', status: 'Available', purchasedate: '2023-11-20' },
  { isbn: '978-1400032716', title: 'The Curious Incident', booktype: 'Paperback', status: 'Available', purchasedate: '2023-12-01' },
  { isbn: '978-0375842207', title: 'The Book Thief', booktype: 'Hardcover', status: 'Reserved', purchasedate: '2023-12-15' },
  { isbn: '978-0618260300', title: 'The Fellowship of the Ring', booktype: 'Paperback', status: 'Available', purchasedate: '2024-01-08' },
  { isbn: '978-0143039433', title: 'The Grapes of Wrath', booktype: 'Paperback', status: 'Available', purchasedate: '2024-01-22' }
];

/*Adding pafination model, may or may not be removed drom inventory table in the future*/
const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper elevation={0} sx={{ height: 400, width: '100%', maxWidth: 668 }}>
      <DataGrid
        rows={rows}
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