import React from 'react';
import { FaX } from 'react-icons/fa6';
import moment, { Moment } from 'moment';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Button,
  Dialog,
  styled,
  TextField,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';

import { CreateRetainedSample } from '../types';
import { RackSelection } from './rack-selection';
import { ProductSelection } from './product-selection';
import { createRetainedSample } from '../api/retained-samples';

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
  racks: Rack[];
  product: Product[];
  fetch: () => void;
}

const RetainedSampleDialog = ({
  open,
  setOpen,
  racks,
  product,
  fetch,
}: RetainedSampleDialogProps) => {
  const [values, setValues] = React.useState<CreateRetainedSample>({
    product_code: '',
    batch_number: '',
    rack_id: '',
    manufacturing_date: moment(),
    expiration_date: moment(),
    destroy_date: moment(),
  });

  const handleOpenClose = () => {
    setOpen(!open);
  };

  const createSampleHandler = () => {
    createRetainedSample(values).then(() => {
      handleOpenClose();
      fetch();
    });
  };

  const textChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const dateChangeHandler = (name: string, value: Moment | null) => {
    if (value) {
      return setValues({ ...values, [name]: value.format('YYYY-MM-DD') });
    }
    return setValues({ ...values });
  };

  return (
    <BootstrapDialog
      onClose={handleOpenClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Create New Sample
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
        <ProductSelection products={product} data={values} setData={setValues} />
        <RackSelection racks={racks} data={values} setData={setValues} />
        <TextField
          sx={{}}
          autoFocus
          required
          fullWidth
          margin="dense"
          id="batch"
          name="batch_number"
          label="Batch Number"
          variant="outlined"
          onChange={textChangeHandler}
        />
      </DialogContent>

      <DialogContent dividers>
        <DatePicker
          onChange={(value: Moment | null) => dateChangeHandler('manufacturing_date', value)}
          sx={{ m: 1, width: '5' }}
          autoFocus
          name="manufacturing_date"
          label="Man. Date"
          views={['month', 'year']}
        />
        <DatePicker
          onChange={(value: Moment | null) => dateChangeHandler('expiration_date', value)}
          sx={{ m: 1, width: '5' }}
          autoFocus
          name="expiration_date"
          label="Exp. Date"
          views={['month', 'year']}
        />
        <DatePicker
          onChange={(value: Moment | null) => dateChangeHandler('destroy_date', value)}
          sx={{ m: 1, width: '5' }}
          autoFocus
          name="destroy_date"
          label="Des. Date"
          views={['month', 'year']}
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

export default RetainedSampleDialog;
