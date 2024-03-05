import { GridColDef } from '@mui/x-data-grid';

const productCol = (isAdmin: boolean): GridColDef[] => [
  {
    headerName: 'Prod. Code',
    field: 'product_code',
    editable: false,
    width: 10,
    headerAlign: 'center',
    headerClassName: 'font-header',
  },
  {
    headerName: 'Prod. Name',
    field: 'product_name',
    editable: isAdmin,
    headerAlign: 'center',
    headerClassName: 'font-header',
  },
  {
    headerName: 'Shelf Life',
    field: 'shelf_life',
    editable: isAdmin,
    headerAlign: 'center',
    headerClassName: 'font-header',
  },
];

export default productCol;
