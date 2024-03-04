import * as React from 'react';

import { GridFilterModel } from '@mui/x-data-grid';
import { Box, Alert, Snackbar, AlertProps } from '@mui/material/';

import AuditDataGrid from '../data-grid/audit-data-grid';
import { getAllAudit, rowCountAudit } from '../api/audit';

// ----------------------------------------------------------------------

export default function AuditTrailPage() {
  const [audit, setAudit] = React.useState<Audit[] | []>([]);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({ items: [] });
  const [snackbar, setSnackbar] = React.useState<AlertProps | null>(null);

  const fetchData = React.useCallback(() => {
    getAllAudit(
      filterModel.quickFilterValues ? filterModel.quickFilterValues.toString() : '',
      paginationModel.page,
      paginationModel.pageSize
    ).then((_audit_log) => {
      setAudit(_audit_log);
    });

    rowCountAudit().then((_count) => {
      setRowCount(_count);
    });
  }, [filterModel, paginationModel]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCloseSnackbar = () => setSnackbar(null);

  return (
    <>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}

      <Box display="flex" sx={{ height: 400, width: '100%', flexDirection: 'column' }}>
        <AuditDataGrid
          auditLog={audit}
          rowCount={rowCount}
          pagination={paginationModel}
          setPagination={setPaginationModel}
          setFilter={setFilterModel}
        />
      </Box>
    </>
  );
}
