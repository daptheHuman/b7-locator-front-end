import React from 'react';
import { FaX, FaTrash, FaPencil, FaFloppyDisk } from 'react-icons/fa6';

import { Box } from '@mui/material';
import {
  DataGrid,
  GridRowId,
  GridColDef,
  GridRowModes,
  GridEventListener,
  GridRowModesModel,
  GridActionsCellItem,
  GridValueSetterParams,
  GridRowEditStopReasons,
  GridRenderEditCellParams,
  GridPreProcessEditCellProps,
} from '@mui/x-data-grid';

import { UserContext } from 'src/authentication/user-context';

import SampleToolbar from './sample-toolbar';
import { UpdateAndDeleteSample } from './types';
import { dateSetter, dateFormatter } from './utils';
import { InputCellTooltip } from '../cell-tooltip/input-cell-tooltip';

interface ReferencedSampleDataGridProps {
  samples: Sample[];
  racks: Rack[];
  fetchData: () => void;
  processRowUpdate: (updatedRow: UpdateAndDeleteSample) => Promise<UpdateAndDeleteSample>;
  processRowUpdateError: (error: HTTPExceptionError) => void;
  handleNewSample: () => void;
  handleDelete: (id: GridRowId) => void;
}

const ReferencedSampleDataGrid = ({
  samples,
  racks,
  fetchData,
  processRowUpdate,
  processRowUpdateError,
  handleNewSample,
  handleDelete,
}: ReferencedSampleDataGridProps) => {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const { user } = React.useContext(UserContext);
  const isAdmin = user ? user.is_admin : false;

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns = React.useMemo(() => {
    const handleEditClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
      handleDelete(id);
    };

    const handleCancelClick = (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    };

    const renderEditBatch = (params: GridRenderEditCellParams) => <InputCellTooltip {...params} />;

    const FIELDS: GridColDef[] = [
      {
        field: 'id',
        headerName: 'ID',
        editable: false,
        width: 10,
      },
      {
        headerName: 'Prod. Code',
        field: 'product_code',
        editable: false,
      },
      {
        headerName: 'Rack',
        field: 'rack_id',
        editable: isAdmin,
        width: 70,
        type: 'singleSelect',
        valueOptions: racks.map((rack) => rack.rack_id),
      },
      {
        headerName: 'Life',
        field: 'shelf_life',
        editable: false,
        width: 80,
        valueFormatter: ({ value }) => `${value} years`,
      },
      {
        headerName: 'Prod. Name',
        field: 'product_name',
        editable: false,
        width: 250,
        flex: 1,
      },
      {
        headerName: 'Batch Num.',
        field: 'batch_number',
        editable: isAdmin,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          const hasError = params.props.value.length > 5;
          return { ...params.props, error: hasError, message: 'No Exceed 5 char' };
        },
        renderEditCell: renderEditBatch,
      },
      {
        headerName: 'Man. Date',
        field: 'manufacturing_date',
        editable: isAdmin,
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
        editable: isAdmin,
        type: 'date',
        valueParser: (value) => value && dateSetter(value),
        valueSetter: (params: GridValueSetterParams) => {
          const date = dateSetter(params.value!);
          return { ...params.row, expiration_date: date };
        },
        valueFormatter: ({ value }) => value && dateFormatter(value),
      },
      {
        headerName: 'Des. Date',
        field: 'destroy_date',
        editable: isAdmin,
        type: 'date',
        valueSetter: (params: GridValueSetterParams) => {
          const date = dateSetter(params.value!);
          return { ...params.row, destroy_date: date };
        },
        valueFormatter: ({ value }) => value && dateFormatter(value),
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }: { id: GridRowId }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<FaFloppyDisk />}
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<FaX />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }
          return [
            <GridActionsCellItem
              icon={<FaPencil />}
              label="Edit"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleEditClick(id)}
            />,
            <GridActionsCellItem
              icon={<FaTrash />}
              label="Delete"
              className="textPrimary"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];

    return FIELDS.map((col) => {
      if (!isAdmin && col.field === 'actions') {
        return null; // Skip this column
      }

      return {
        headerName: col.field,
        ...col,
        headerAlign: 'center',
        headerClassName: 'font-header',
      };
    }).filter((col) => col !== null) as GridColDef[];
  }, [handleDelete, isAdmin, racks, rowModesModel]);

  return (
    <Box
      display="flex"
      sx={{
        flexDirection: 'column',
        height: '75vh',
      }}
    >
      <DataGrid
        sx={{}}
        rows={samples}
        columns={columns}
        keepNonExistentRowsSelected
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={(updatedRow) => processRowUpdate(updatedRow)}
        onProcessRowUpdateError={(error) => processRowUpdateError(error)}
        slots={{
          toolbar: SampleToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            handleNewSampleClick: handleNewSample,
          },
        }}
      />
    </Box>
  );
};

export default ReferencedSampleDataGrid;
