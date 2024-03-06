import { GridColDef } from '@mui/x-data-grid';

import RenderExpandableCell from './render-cell-tooltip';

const auditCol: GridColDef[] = [
  {
    headerName: 'URL',
    field: 'url',
    renderCell: RenderExpandableCell,
  },
  {
    headerName: 'User',
    field: 'headers',
    renderCell: RenderExpandableCell,
  },
  {
    headerName: 'Method',
    field: 'method',
    renderCell: RenderExpandableCell,
  },
  {
    headerName: 'Request',
    field: 'request',
    renderCell: RenderExpandableCell,
  },
  {
    headerName: 'Timestamp',
    field: 'timestamp',
  },
];

export default auditCol;
