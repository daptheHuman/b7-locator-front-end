import React from 'react';
import { FaX, FaTrash, FaPencil, FaFloppyDisk } from 'react-icons/fa6';

import { Box } from '@mui/material';
import {
  DataGrid,
  GridRowId,
  GridColDef,
  GridToolbar,
  GridRowModes,
  GridFilterModel,
  GridEventListener,
  GridRowModesModel,
  GridPaginationModel,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

import { UserUpdate } from '../types';
import auditCol from './manage-user-col';

interface ManageUserDataGridProps {
  users: User[];
  rowCount: number;
  fetchData: () => void;
  processRowUpdate: (updatedRow: UserUpdate) => Promise<UserUpdate>;
  processRowUpdateError: (error: Error) => void;
  processRowDelete: (id: GridRowId) => void;
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

const UserDataGrid = ({
  users,
  rowCount,
  fetchData,
  processRowUpdate,
  processRowUpdateError,
  processRowDelete,
  pagination,
  setPagination,
  setFilter,
}: ManageUserDataGridProps) => {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPagination(newModel);
  };

  const handleFilterModelChange = (newModel: GridFilterModel) => {
    setFilter(newModel);
  };

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

    const FIELDS: GridColDef[] = [
      ...auditCol,
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        cellClassName: 'actions',
        headerAlign: 'center',
        headerClassName: 'font-header',
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
      ...col,
      flex: 1,
    }));
  }, [processRowDelete, rowModesModel]);

  return (
    <Box
      sx={{
        flexDirection: 'column',
        height: '75vh',
      }}
    >
      <DataGrid
        rows={users}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={rowCount}
        paginationModel={pagination}
        onFilterModelChange={handleFilterModelChange}
        onPaginationModelChange={handlePaginationModelChange}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={(updatedRow) => processRowUpdate(updatedRow)}
        onProcessRowUpdateError={(error) => processRowUpdateError(error)}
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

export default UserDataGrid;
