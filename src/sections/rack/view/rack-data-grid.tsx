import React from 'react';
import { FaX, FaTrash, FaPencil, FaFloppyDisk } from 'react-icons/fa6';

import {
  DataGrid,
  GridRowId,
  GridColDef,
  GridToolbar,
  GridRowModes,
  GridEventListener,
  GridRowModesModel,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

import { UpdateAndDeleteRack } from '../types';

interface RetainedSampleDataGridProps {
  racks: Rack[];
  fetchData: () => void;
  processRowUpdate: (updatedRow: UpdateAndDeleteRack) => Promise<Rack>;
  processRowUpdateError: (error: Error) => void;
  processRowDelete: (id: GridRowId) => void;
}

const RackDataGrid = ({
  racks,
  fetchData,
  processRowUpdate,
  processRowUpdateError,
  processRowDelete,
}: RetainedSampleDataGridProps) => {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

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
      processRowDelete(id);
    };

    const handleCancelClick = (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    };

    // const renderEditBatch = (params: GridRenderEditCellParams) => <InputCellTooltip {...params} />;

    const FIELDS: GridColDef[] = [
      { field: 'id', editable: false, width: 10 },
      {
        headerName: 'Location',
        field: 'location',
        editable: true,
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

    return FIELDS.map((col) => ({
      headerName: col.field,
      ...col,
      flex: 1,
    }));
  }, [processRowDelete, rowModesModel]);

  return (
    <DataGrid
      rows={racks}
      columns={columns}
      keepNonExistentRowsSelected
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={(updatedRow) => processRowUpdate(updatedRow)}
      onProcessRowUpdateError={(error) => processRowUpdateError(error)}
      slots={{
        toolbar: GridToolbar,
      }}
      slotProps={{
        toolbar: {
          // setRows,
          // setRowModesModel,
          showQuickFilter: true,
        },
      }}
    />
  );
};

export default RackDataGrid;
