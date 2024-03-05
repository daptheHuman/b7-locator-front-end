import * as React from 'react';

import { GridRowId } from '@mui/x-data-grid';
import { Box, Alert, Snackbar, AlertProps } from '@mui/material/';

import { UserContext } from 'src/authentication/user-context';

import { ProductRow } from '../types';
import productCol from './product-col';
import ProductToolbar from '../product-toolbar';
import ProductDialog from '../dialog/product-dialog';
import { getProducts, deleteProduct, updateProduct } from '../api/products';
import ProductRackDataGrid from '../../../components/product-rack-datagrid/product-rack-data-grid';

// ----------------------------------------------------------------------

export default function ProductPage() {
  const [products, setProducts] = React.useState<Product[] | []>([]);

  const [dialog, setDialog] = React.useState<boolean>(false);
  const [snackbar, setSnackbar] = React.useState<AlertProps | null>(null);

  const { user } = React.useContext(UserContext);
  const isAdmin = user ? user.is_admin : false;

  const fetchData = React.useCallback(() => {
    getProducts().then((_products) => {
      const data = _products.map((_product) => ({
        id: _product.product_code,
        ..._product,
      }));
      setProducts(data);
    });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNewProduct = () => {
    setDialog(!dialog);
  };

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleProcessRowUpdate = React.useCallback(
    (updatedRow: ProductRow): Promise<ProductRow> =>
      updateProduct(updatedRow).then((_updatedRow) => {
        setSnackbar({ children: 'Edit Success', severity: 'success' });
        return { id: _updatedRow.product_code, ..._updatedRow };
      }),
    []
  );

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const handleProcessRowDelete = (id: GridRowId) => {
    deleteProduct(id).then(() => setProducts(products.filter((row) => row.product_code !== id)));
  };

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

      <Box
        display="flex"
        sx={{
          flexDirection: 'column',
          height: '75vh',
        }}
      >
        <ProductDialog open={dialog} setOpen={setDialog} fetch={fetchData} />
        <ProductRackDataGrid
          row={products}
          gridColumn={productCol(isAdmin)}
          fetchData={fetchData}
          processRowUpdate={handleProcessRowUpdate}
          processRowUpdateError={handleProcessRowUpdateError}
          processRowDelete={handleProcessRowDelete}
          handleNew={handleNewProduct}
          Toolbar={ProductToolbar}
        />
      </Box>
    </>
  );
}
