import { GridColDef } from '@mui/x-data-grid';

const rackCol = (isAdmin: boolean): GridColDef[] => [
  { field: 'id', editable: false, width: 10 },
  {
    headerName: 'Location',
    field: 'location',
    editable: isAdmin,
  },
  {
    headerName: 'Maximum Storage',
    field: 'max_stored',
    editable: isAdmin,
  },
];

export default rackCol;
