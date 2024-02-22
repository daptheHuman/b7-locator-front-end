import React from 'react';
import { TypeOf } from 'zod';
import { Moment } from 'moment';
import { FaX } from 'react-icons/fa6';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Box,
  Button,
  Dialog,
  styled,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import FormInput from 'src/components/form-input/form-input';

import { CreateSample } from './types';
import { newSampleSchema } from './resolver';
import { RackSelection } from './rack-selection';
import { ProductSelection } from './product-selection';

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
  createSample: (retainedSample: CreateSample) => void;
}

const SampleDialog = ({
  open,
  setOpen,
  racks,
  product,
  createSample,
}: RetainedSampleDialogProps) => {
  type SampleInput = TypeOf<typeof newSampleSchema>;

  const methods = useForm<SampleInput>({
    resolver: zodResolver(newSampleSchema),
  });
  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const handleOpenClose = () => {
    setOpen(!open);
  };

  const createSampleHandler = (values: SampleInput) => {
    createSample(values);
  };

  const dateChangeHandler = (
    name: 'manufacturing_date' | 'expiration_date' | 'destroy_date',
    value: Moment | null
  ) => {
    if (value) {
      return setValue(name, value.format('YYYY-MM-DD'));
    }

    return setValue(name, '');
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
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(createSampleHandler)}
        >
          <DialogContent dividers>
            <DialogContentText>Please fill the sample carefully!</DialogContentText>
            <ProductSelection products={product} />
            <RackSelection racks={racks} />
            <FormInput name="batch_number" required fullWidth label="Batch Number" />
          </DialogContent>

          <DialogContent dividers>
            <DatePicker
              onChange={(value: Moment | null) => dateChangeHandler('manufacturing_date', value)}
              sx={{ m: 1, width: '5' }}
              autoFocus
              name="manufacturing_date"
              label="Man. Date"
              views={['month', 'year']}
              slotProps={{
                textField: {
                  error: !!errors.manufacturing_date,
                  helperText: <>{errors.manufacturing_date?.message || ''}</>,
                },
              }}
            />
            <DatePicker
              onChange={(value: Moment | null) => dateChangeHandler('expiration_date', value)}
              sx={{ m: 1, width: '5' }}
              autoFocus
              name="expiration_date"
              label="Exp. Date"
              views={['month', 'year']}
              slotProps={{
                textField: {
                  error: !!errors.expiration_date,
                  helperText: <>{errors.expiration_date?.message || ''}</>,
                },
              }}
            />
            <DatePicker
              onChange={(value: Moment | null) => dateChangeHandler('destroy_date', value)}
              sx={{ m: 1, width: '5' }}
              autoFocus
              name="destroy_date"
              label="Des. Date"
              views={['month', 'year']}
              slotProps={{
                textField: {
                  error: !!errors.destroy_date,
                  helperText: <>{errors.destroy_date?.message || ''}</>,
                },
              }}
            />
          </DialogContent>
          <Button type="submit">Create</Button>
        </Box>
      </FormProvider>
    </BootstrapDialog>
  );
};

export default SampleDialog;
