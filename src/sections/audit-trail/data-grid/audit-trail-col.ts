import { GridColDef } from '@mui/x-data-grid';

import RenderExpandableCell from './render-cell-tooltip';

const auditCol: GridColDef[] = [
  {
    headerName: 'URL',
    field: 'url',
    renderCell: RenderExpandableCell,
    headerAlign: 'center',
    headerClassName: 'font-header',
  },
  {
    headerName: 'User',
    field: 'headers',
    renderCell: RenderExpandableCell,
    headerAlign: 'center',
    headerClassName: 'font-header',
  },
  {
    headerName: 'Method',
    field: 'method',
    renderCell: RenderExpandableCell,
    headerAlign: 'center',
    headerClassName: 'font-header',
  },
  {
    headerName: 'Request',
    field: 'request',
    renderCell: RenderExpandableCell,
    headerAlign: 'center',
    headerClassName: 'font-header',
  },
  {
    headerName: 'Timestamp',
    field: 'timestamp',
    headerAlign: 'center',
    headerClassName: 'font-header',
  },
];

export default auditCol;
