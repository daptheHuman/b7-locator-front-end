import * as React from 'react';

import { GridRowId, GridFilterModel } from '@mui/x-data-grid';
import { Box, Alert, Snackbar, AlertProps } from '@mui/material/';

import { UserUpdate } from '../types';
import UserDataGrid from '../data-grid/user-data-grid';
import { updateUser, deleteUser, getAllUsers, rowCountUsers } from '../api/user';

// ----------------------------------------------------------------------

export default function ManageUserView() {
  const [users, setUsers] = React.useState<User[] | []>([]);
  const [rowCount, setRowCount] = React.useState<number>(0);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({ items: [] });
  const [snackbar, setSnackbar] = React.useState<AlertProps | null>(null);

  const fetchData = React.useCallback(() => {
    getAllUsers(
      filterModel.quickFilterValues ? filterModel.quickFilterValues.toString() : '',
      paginationModel.page,
      paginationModel.pageSize
    ).then((_users) => {
      setUsers(_users);
    });

    rowCountUsers().then((_count) => {
      setRowCount(_count);
    });
  }, [filterModel, paginationModel]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleProcessRowUpdate = React.useCallback(
    (updatedRow: UserUpdate): Promise<UserUpdate> =>
      updateUser(updatedRow.id, updatedRow).then((_updatedRow) => {
        setSnackbar({ children: 'Edit Success', severity: 'success' });
        console.log(_updatedRow);
        return _updatedRow;
      }),
    []
  );

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const handleProcessRowDelete = (id: GridRowId) => {
    deleteUser(id).then(() => setUsers(users.filter((row) => row.id !== id)));
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
        <UserDataGrid
          users={users}
          rowCount={rowCount}
          fetchData={fetchData}
          processRowUpdate={handleProcessRowUpdate}
          processRowUpdateError={handleProcessRowUpdateError}
          processRowDelete={handleProcessRowDelete}
          pagination={paginationModel}
          setPagination={setPaginationModel}
          setFilter={setFilterModel}
        />
      </Box>
    </>
  );
}
