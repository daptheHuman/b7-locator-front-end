import React from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { DataGrid, GridColDef, GridValueSetterParams } from '@mui/x-data-grid';

import DestroyToolbar from './destroy-toolbar';
import { DestroyPackageAndWeight } from '../types';
import { convertToDestroyPackageAndWeight } from '../utils';
import DestroyDialog from '../destroy-dialog/destroy-dialog';
import { dateSetter, dateFormatter } from '../../../sections/reference-sample/utils';

interface DestroyDataGridProps {
  samples: Sample[];
  fetchData: (date: Dayjs) => void;
  handleDestroy: (date: Dayjs, destroy_sample: DestroyPackageAndWeight[]) => void;
}

const DestroyDataGrid = ({ samples, fetchData, handleDestroy }: DestroyDataGridProps) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs(Date.now()));
  const [destroySample, setDestroySample] = React.useState<DestroyPackageAndWeight[]>(
    convertToDestroyPackageAndWeight(samples)
  );

  const [packageWeightDialog, setPackageWeightDialog] = React.useState<boolean>(false);

  React.useEffect(() => {
    setDestroySample(convertToDestroyPackageAndWeight(samples));
  }, [samples]);

  React.useEffect(() => {
    fetchData(selectedDate);
  }, [fetchData, selectedDate]);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(dayjs(date));
  };

  const handleDestroyReports = () => {
    handleDestroy(selectedDate, destroySample);
  };

  const columns = React.useMemo(() => {
    const FIELDS: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 10 },
      {
        headerName: 'Prod. Code',
        field: 'product_code',
      },
      {
        headerName: 'Rack',
        field: 'rack_id',
        width: 70,
        type: 'singleSelect',
      },
      {
        headerName: 'Life',
        field: 'shelf_life',

        width: 80,
        valueFormatter: ({ value }) => `${value} years`,
      },
      {
        headerName: 'Prod. Name',
        field: 'product_name',
        width: 250,
      },
      {
        headerName: 'Batch Num.',
        field: 'batch_number',
      },
      {
        headerName: 'Man. Date',
        field: 'manufacturing_date',

        type: 'date',
        valueSetter: (params: GridValueSetterParams) => {
          const date = dateSetter(params.value!);
          return { ...params.row, manufacturing_date: date };
        },
        valueFormatter: ({ value }) => value && dateFormatter(value),
      },
      {
        headerName: 'Exp. Date',
        field: 'expiration_date',

        type: 'date',
        valueParser: (value) => value && dateSetter(value),
        valueSetter: (params: GridValueSetterParams) => {
          const date = dateSetter(params.value!);
          return { ...params.row, expiration_date: date };
        },
        valueFormatter: ({ value }) => value && dateFormatter(value),
      },
    ];

    return FIELDS.map((col) => ({
      headerName: col.field,
      ...col,
      flex: 1,
    }));
  }, []);

  return (
    <Box sx={{ height: 400, display: 'flex', flexDirection: 'column' }}>
      <DestroyDialog
        open={packageWeightDialog}
        setOpen={setPackageWeightDialog}
        samplesDestroy={destroySample}
        setSamplesDestroy={setDestroySample}
        handleDestroy={handleDestroyReports}
      />
      <Box
        sx={{
          height: 100,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DatePicker
          openTo="year"
          views={['year', 'month']}
          label="Year and Month"
          defaultValue={selectedDate}
          onChange={handleDateChange}
        />
      </Box>
      <DataGrid
        rows={samples}
        columns={columns}
        keepNonExistentRowsSelected
        slots={{
          toolbar: DestroyToolbar,
        }}
        slotProps={{
          toolbar: {
            samples,
            handleDestroy: handleDestroyReports,
            setPackageWeightDialog,
          },
        }}
      />
    </Box>
  );
};

export default DestroyDataGrid;
