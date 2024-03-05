import React from 'react';
import { FaX, FaTrash, FaPencil, FaFloppyDisk } from 'react-icons/fa6';

import {
  DataGrid,
  GridRowId,
  GridColDef,
  GridRowModes,
  GridEventListener,
  GridRowModesModel,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

import { UserContext } from 'src/authentication/user-context';

import { RackRow } from 'src/sections/rack/types';
import { ProductRow } from 'src/sections/product/types';
import { Box } from '@mui/material';

interface ProductRackDataGridProps {
  row: Product[] | Rack[];
  gridColumn: GridColDef[];
  fetchData: () => void;
  processRowUpdate:
    | ((updatedRow: ProductRow) => Promise<ProductRow>)
    | ((updatedRow: RackRow) => Promise<RackRow>);
  processRowUpdateError: (error: Error) => void;
  processRowDelete: (id: GridRowId) => void;
  handleNew: () => void;
  Toolbar: React.JSXElementConstructor<any>;
}

const ProductRackDataGrid = ({
  row,
  gridColumn,
  fetchData,
  processRowUpdate,
  processRowUpdateError,
  processRowDelete,
  handleNew,
  Toolbar,
}: ProductRackDataGridProps) => {
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
      processRowDelete(id);
    };

    const handleCancelClick = (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    };

    const FIELDS = [
      ...gridColumn,
      isAdmin
        ? {
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
          }
        : undefined,
    ].filter(Boolean) as GridColDef[];

    return FIELDS.map((col) => ({
      headerName: col.field,
      ...col,
      flex: 1,
    }));
  }, [gridColumn, isAdmin, processRowDelete, rowModesModel]);

  return (
    <DataGrid
      sx={{
        height: '70vh',
      }}
      rows={row}
      columns={columns}
      keepNonExistentRowsSelected
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={(updatedRow) => processRowUpdate(updatedRow)}
      onProcessRowUpdateError={(error) => processRowUpdateError(error)}
      slots={{
        toolbar: Toolbar,
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          handleNew,
        },
      }}
    />
  );
};

export default ProductRackDataGrid;
