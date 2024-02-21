import { GridColDef } from '@mui/x-data-grid';

const RACK_COLUMNS: GridColDef[] = [
  { field: 'id', editable: false, width: 10 },
  {
    headerName: 'Location',
    field: 'location',
    editable: true,
  },
];

export default RACK_COLUMNS;
