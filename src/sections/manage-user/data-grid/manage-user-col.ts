import { GridColDef } from '@mui/x-data-grid';

const auditCol: GridColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    headerAlign: 'center',
    headerClassName: 'font-header',
  },
  {
    headerName: 'Username',
    field: 'username',
    editable: true,
    headerAlign: 'center',
    headerClassName: 'font-header',
  },
  {
    headerName: 'Admin',
    field: 'is_admin',
    editable: true,
    type: 'boolean',
    headerAlign: 'center',
    headerClassName: 'font-header',
  },
];

export default auditCol;
