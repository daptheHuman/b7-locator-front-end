import { Dayjs } from 'dayjs';
import * as React from 'react';

import { GridRowId } from '@mui/x-data-grid';
import { Box, Tab, Tabs, Alert, Snackbar, AlertProps } from '@mui/material/';

import { TabPanel } from 'src/components/tab-panel/tab-panel';
import SampleDataGrid from 'src/components/sample-data-grid/sample-data-grid';
import DestroyDataGrid from 'src/components/destroy-data-grid/destroy-sample-data-grid';

import { getAllRacksId } from '../api/racks';
import { getAllProducts } from '../api/products';
import { UpdateAndDeleteRetainedSample } from '../types';
import RetainedSampleDialog from '../dialog/retained-sample-dialog';
import {
  getDestroySamples,
  getRetainedSamples,
  createDestroyReport,
  deleteRetainedSample,
  updateRetainedSample,
} from '../api/retained-samples';

// ----------------------------------------------------------------------
const initialValue: RetainedSample[] = [];

export default function RetainedSamplePage() {
  const [retainedSamples, setRetainedSamples] = React.useState<RetainedSample[]>(initialValue);
  const [destroySamples, setDestroySamples] = React.useState<RetainedSample[]>(initialValue);

  const [racks, setRacks] = React.useState<Rack[] | []>([]);
  const [products, setProducts] = React.useState<Product[] | []>([]);

  const [dialog, setDialog] = React.useState<boolean>(false);
  const [snackbar, setSnackbar] = React.useState<AlertProps | null>(null);
  const [tabsValue, setTabsValue] = React.useState<number>(0);

  const fetchData = React.useCallback(() => {
    getRetainedSamples().then((_samples) => {
      setRetainedSamples(_samples);
    });

    getAllRacksId().then((_racks) => {
      setRacks(_racks);
    });

    getAllProducts().then((_products) => {
      setProducts(_products);
    });
  }, []);

  const fetchDataDestroy = React.useCallback((date: Dayjs) => {
    getDestroySamples(date).then((_samples) => {
      setDestroySamples(_samples);
    });
  }, []);

  const handleDestroy = (date: Dayjs) => {
    createDestroyReport(date);
  };

  const handleProcessRowUpdate = React.useCallback(
    (updatedRow: UpdateAndDeleteRetainedSample) =>
      updateRetainedSample(updatedRow).then((_updatedRow) => _updatedRow),
    []
  );

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const handleProcessRowDelete = (id: GridRowId) =>
    deleteRetainedSample(id).then(() =>
      setRetainedSamples(retainedSamples.filter((row) => row.id !== id))
    );

  const handleNewSample = () => {
    setDialog(!dialog);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

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

      <Box display="flex" sx={{ width: '100%', flexDirection: 'column' }}>
        <Tabs value={tabsValue} onChange={handleChangeTabs} aria-label="basic tabs example">
          <Tab label="Samples" />
          <Tab label="Destroy" />
        </Tabs>
      </Box>
      <TabPanel index={0} value={tabsValue}>
        <RetainedSampleDialog
          open={dialog}
          setOpen={setDialog}
          racks={racks}
          product={products}
          fetch={fetchData}
        />
        <SampleDataGrid
          fetchData={fetchData}
          racks={racks}
          samples={retainedSamples}
          processRowUpdate={handleProcessRowUpdate}
          processRowUpdateError={handleProcessRowUpdateError}
          handleNewSample={handleNewSample}
          handleDelete={handleProcessRowDelete}
        />
      </TabPanel>
      <TabPanel index={1} value={tabsValue}>
        <DestroyDataGrid
          fetchData={fetchDataDestroy}
          samples={destroySamples}
          handleDestroy={handleDestroy}
        />
      </TabPanel>
    </>
  );
}
