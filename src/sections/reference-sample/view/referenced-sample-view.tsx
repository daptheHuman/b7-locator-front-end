import { Dayjs } from 'dayjs';
import * as React from 'react';

import { GridRowId } from '@mui/x-data-grid';
import { Box, Tab, Tabs, Alert, Snackbar, AlertProps } from '@mui/material/';

import { TabPanel } from 'src/components/tab-panel/tab-panel';
import SampleDialog from 'src/components/sample-dialog/sample-dialog';
import SampleDataGrid from 'src/components/sample-data-grid/sample-data-grid';

import { getAllRacksId } from '../api/racks';
import { getAllProducts } from '../api/products';
import { CreateReferencedSample, UpdateAndDeleteReferencedSample } from '../types';
import DestroyDataGrid from '../../../components/destroy/destroy-data-grid/destroy-sample-data-grid';
import {
  getDestroySamples,
  createDestroyReport,
  getReferencedSamples,
  deleteReferencedSample,
  updateReferencedSample,
  createReferencedSample,
} from '../api/referenced-samples';

// ----------------------------------------------------------------------
const initialValue: ReferencedSample[] = [];

export default function ReferencedSamplePage() {
  const [referencedSamples, setReferencedSamples] =
    React.useState<ReferencedSample[]>(initialValue);
  const [destroySamples, setDestroySamples] = React.useState<ReferencedSample[]>(initialValue);

  const [racks, setRacks] = React.useState<Rack[] | []>([]);
  const [products, setProducts] = React.useState<Product[] | []>([]);

  const [dialog, setDialog] = React.useState<boolean>(false);
  const [snackbar, setSnackbar] = React.useState<AlertProps | null>(null);
  const [tabsValue, setTabsValue] = React.useState<number>(0);

  const fetchDataSample = React.useCallback(() => {
    getReferencedSamples().then((_samples) => {
      setReferencedSamples(_samples);
    });

    getAllRacksId().then((_racks) => {
      setRacks(_racks);
    });

    getAllProducts().then((_products) => {
      setProducts(_products);
    });
  }, []);

  const fetchDestroySample = React.useCallback((date: Dayjs) => {
    getDestroySamples(date).then((_samples) => {
      setDestroySamples(_samples);
    });
  }, []);

  const handleDestroy = (date: Dayjs, destroySample: DestroyPackageAndWeight[]) => {
    createDestroyReport(date, destroySample);
  };

  const handleProcessRowUpdate = React.useCallback(
    (updatedRow: UpdateAndDeleteReferencedSample) =>
      updateReferencedSample(updatedRow).then((_updatedRow) => _updatedRow),
    []
  );

  const handleProcessRowUpdateError = React.useCallback((error: HTTPExceptionError) => {
    setSnackbar({ children: error.detail, severity: 'error' });
  }, []);

  const handleProcessRowDelete = (id: GridRowId) =>
    deleteReferencedSample(id).then(() =>
      setReferencedSamples(referencedSamples.filter((row) => row.id !== id))
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

  const handleCreateSample = (values: CreateReferencedSample) =>
    createReferencedSample(values)
      .then(() => {
        setDialog(!dialog);
        fetchDataSample();
      })
      .catch((e) => {
        console.log(e);
      });

  React.useEffect(() => {
    fetchDataSample();
  }, [fetchDataSample]);

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
        <SampleDialog
          open={dialog}
          setOpen={setDialog}
          racks={racks}
          product={products}
          createSample={handleCreateSample}
        />
        <SampleDataGrid
          fetchData={fetchDataSample}
          racks={racks}
          samples={referencedSamples}
          processRowUpdate={handleProcessRowUpdate}
          processRowUpdateError={handleProcessRowUpdateError}
          handleNewSample={handleNewSample}
          handleDelete={handleProcessRowDelete}
        />
      </TabPanel>
      <TabPanel index={1} value={tabsValue}>
        <DestroyDataGrid
          fetchData={fetchDestroySample}
          samples={destroySamples}
          handleDestroy={handleDestroy}
        />
      </TabPanel>
    </>
  );
}
