import React from 'react';
import { TypeOf } from 'zod';
import { FaX } from 'react-icons/fa6';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import {
  Box,
  Alert,
  Button,
  Dialog,
  styled,
  Snackbar,
  IconButton,
  AlertProps,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { newProductSchema } from './resolver';
import { createProduct } from '../api/products';
import FormInput from '../../../components/form-input/form-input';

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

type ProductInput = TypeOf<typeof newProductSchema>;

const ProductDialog = ({ open, setOpen, fetch }: RetainedSampleDialogProps) => {
  const [alert, setAlert] = React.useState<AlertProps | null>(null);

  const methods = useForm<ProductInput>({
    resolver: zodResolver(newProductSchema),
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const handleOpenClose = () => {
    reset();
    setOpen(!open);
  };

  const handleCloseAlert = () => setAlert(null);

  const createProductHandler = (values: ProductInput) => {
    createProduct(values)
      .then(() => {
        handleOpenClose();
        fetch();
      })
      .catch((error: HTTPExceptionError) => {
        setAlert({ children: error.detail, severity: 'error' });
      });
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
        <FormProvider {...methods}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(createProductHandler)}
          >
            <FormInput name="product_code" required fullWidth label="Product Code" sx={{ mb: 2 }} />
            <FormInput name="product_name" required fullWidth label="Product Name" sx={{ mb: 2 }} />
            <FormInput
              name="shelf_life"
              required
              fullWidth
              type="number"
              label="Shelf Life"
              sx={{ mb: 2 }}
            />

            <Button type="submit">Create</Button>
          </Box>
        </FormProvider>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default ProductDialog;
