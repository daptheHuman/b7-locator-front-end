import { GridColDef } from '@mui/x-data-grid';

const PRODUCT_COLUMNS: GridColDef[] = [
  {
    headerName: 'Prod. Code',
    field: 'product_code',
    editable: false,
  },
  {
    headerName: 'Prod. Name',
    field: 'product_name',
    editable: true,
  },
  {
    headerName: 'Shelf Life',
    field: 'shelf_life',
    editable: true,
  },
];

export default PRODUCT_COLUMNS;
