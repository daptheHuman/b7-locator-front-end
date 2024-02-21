import React from 'react';

import { GridRowId } from '@mui/x-data-grid';
import { Box, Alert, Snackbar, AlertProps } from '@mui/material/';

import ProductRackDataGrid from 'src/components/product-rack-datagrid/product-rack-data-grid';

import { RackRow } from '../types';
import RACK_COLUMNS from './rack-col';
import RackToolbar from '../rack-toolbar';
import RackDialog from '../dialog/rack-dialog';
import { getRacks, deleteRack, updateRack } from '../api/racks';

// ----------------------------------------------------------------------

export default function RackPage() {
  const [racks, setRacks] = React.useState<Rack[] | []>([]);

  const [dialog, setDialog] = React.useState<boolean>(false);
  const [snackbar, setSnackbar] = React.useState<AlertProps | null>(null);

  const fetchData = React.useCallback(() => {
    getRacks().then((_racks) => {
      const data = _racks.map((_rack) => ({
        id: _rack.rack_id,
        ..._rack,
      }));
      setRacks(data);
    });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNewRack = () => {
    setDialog(!dialog);
  };

  const handleProcessRowUpdate = React.useCallback(
    (updatedRow: RackRow): Promise<RackRow> =>
      updateRack(updatedRow).then((_updatedRow) => {
        setSnackbar({ children: 'Edit Success', severity: 'success' });
        return { id: _updatedRow.rack_id, ..._updatedRow };
      }),
    []
  );

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const handleProcessRowDelete = (id: GridRowId) => {
    deleteRack(id).then(() => setRacks(racks.filter((row) => row.rack_id !== id)));
  };

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
        <RackDialog open={dialog} setOpen={setDialog} fetch={fetchData} />
        <ProductRackDataGrid
          row={racks}
          gridColumn={RACK_COLUMNS}
          fetchData={fetchData}
          processRowUpdate={handleProcessRowUpdate}
          processRowUpdateError={handleProcessRowUpdateError}
          processRowDelete={handleProcessRowDelete}
          handleNew={handleNewRack}
          Toolbar={RackToolbar}
        />
      </Box>
    </>
  );
}
