import { GridColDef } from '@mui/x-data-grid';

const productCol = (isAdmin: boolean): GridColDef[] => [
  {
    headerName: 'Prod. Code',
    field: 'product_code',
    editable: false,
  },
  {
    headerName: 'Prod. Name',
    field: 'product_name',
    editable: isAdmin,
  },
  {
    headerName: 'Shelf Life',
    field: 'shelf_life',
    editable: isAdmin,
  },
];

export default productCol;
