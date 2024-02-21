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

import { createRack } from '../api/racks';

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

const RackDialog = ({ open, setOpen, fetch }: RetainedSampleDialogProps) => {
  const [values, setValues] = React.useState<Rack>({
    rack_id: '',
    location: '',
  });
  const [alert, setAlert] = React.useState<AlertProps | null>(null);

  const handleOpenClose = () => {
    setOpen(!open);
  };

  const handleCloseAlert = () => setAlert(null);

  const createSampleHandler = () => {
    createRack(values)
      .then(() => {
        handleOpenClose();
        fetch();
      })
      .catch((error: HTTPExceptionError) =>
        setAlert({ children: error.detail, severity: 'error' })
      );
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
        Create New Rack
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
          name="rack_id"
          label="Rack ID"
          variant="outlined"
          onChange={textChangeHandler}
        />
        <TextField
          sx={{}}
          autoFocus
          required
          fullWidth
          margin="dense"
          id="batch"
          name="location"
          label="Location"
          variant="outlined"
          onChange={textChangeHandler}
        />
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={createSampleHandler}>
          Create
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default RackDialog;
