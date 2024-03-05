import { GridColDef } from '@mui/x-data-grid';

const rackCol = (isAdmin: boolean): GridColDef[] => [
  {
    headerName: 'ID',
    field: 'id',
    editable: false,
    width: 10,
    headerAlign: 'center',
    headerClassName: 'font-header',
  },
  {
    headerName: 'Location',
    field: 'location',
    editable: isAdmin,
    headerAlign: 'center',
    headerClassName: 'font-header',
  },
  {
    headerName: 'Maximum Storage',
    field: 'max_stored',
    editable: isAdmin,
    headerAlign: 'center',
    headerClassName: 'font-header',
  },
];

export default rackCol;
