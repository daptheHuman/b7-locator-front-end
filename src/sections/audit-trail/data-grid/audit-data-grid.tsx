import React from 'react';

import { Box } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridFilterModel,
  GridPaginationModel,
} from '@mui/x-data-grid';

import auditCol from './audit-trail-col';

interface AuditDataGridProps {
  auditLog: Audit[];
  rowCount: number;
  pagination: {
    page: number;
    pageSize: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      page: number;
      pageSize: number;
    }>
  >;
  setFilter: React.Dispatch<React.SetStateAction<GridFilterModel>>;
}

const AuditDataGrid = ({
  auditLog,
  rowCount,
  pagination,
  setPagination,
  setFilter,
}: AuditDataGridProps) => {
  const columns = React.useMemo(() => {
    const FIELDS: GridColDef[] = auditCol;

    return FIELDS.map((col) => ({
      headerName: col.field,
      ...col,
      flex: 1,
    }));
  }, []);

  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPagination(newModel);
  };

  const handleFilterModelChange = (newModel: GridFilterModel) => {
    setFilter(newModel);
  };

  return (
    <Box sx={{ height: 400, display: 'flex', flexDirection: 'column' }}>
      <DataGrid
        rows={auditLog}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={rowCount}
        paginationModel={pagination}
        onFilterModelChange={handleFilterModelChange}
        onPaginationModelChange={handlePaginationModelChange}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
};

export default AuditDataGrid;
