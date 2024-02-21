import React from 'react';
import { FaX } from 'react-icons/fa6';

import {
  Alert,
  Button,
  Dialog,
  styled,
  Snackbar,
  TextField,
  IconButton,
  AlertProps,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';

import { createProduct } from '../api/products';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface RetainedSampleDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetch: () => void;
}

const ProductDialog = ({ open, setOpen, fetch }: RetainedSampleDialogProps) => {
  const [values, setValues] = React.useState<Product>({
    product_code: '',
    product_name: '',
    shelf_life: 0,
  });
  const [alert, setAlert] = React.useState<AlertProps | null>(null);

  const handleOpenClose = () => {
    setOpen(!open);
  };

  const handleCloseAlert = () => setAlert(null);

  const createProductHandler = () => {
    createProduct(values)
      .then(() => {
        handleOpenClose();
        fetch();
      })
      .catch((error: HTTPExceptionError) => {
        setAlert({ children: error.detail, severity: 'error' });
      });
  };

  const textChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <BootstrapDialog
      onClose={handleOpenClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      {!!alert && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseAlert}
          autoHideDuration={2000}
        >
          <Alert {...alert} onClose={handleCloseAlert} />
        </Snackbar>
      )}
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Create New Product
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleOpenClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <FaX />
      </IconButton>
      <DialogContent dividers>
        <DialogContentText>Please fill the sample carefully!</DialogContentText>
        <TextField
          sx={{}}
          autoFocus
          required
          fullWidth
          margin="dense"
          id="id"
          name="product_code"
          label="Product ID"
          variant="outlined"
          onChange={textChangeHandler}
        />
        <TextField
          sx={{}}
          autoFocus
          required
          fullWidth
          margin="dense"
          id="id"
          name="product_name"
          label="Prod Name"
          variant="outlined"
          onChange={textChangeHandler}
        />
        <TextField
          sx={{}}
          autoFocus
          required
          fullWidth
          type="number"
          margin="dense"
          id="id"
          name="product_name"
          label="Shelf Life"
          variant="outlined"
          onChange={textChangeHandler}
        />
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={createProductHandler}>
          Create
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default ProductDialog;
