import React from 'react';

import {
  Button,
  Dialog,
  styled,
  TextField,
  Typography,
  FormControl,
  DialogContent,
} from '@mui/material';

import { DestroyPackageAndWeight } from '../types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DestroyDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  samplesDestroy: DestroyPackageAndWeight[];
  setSamplesDestroy: React.Dispatch<React.SetStateAction<DestroyPackageAndWeight[]>>;
  handleDestroy: () => void;
}

const DestroyDialog = ({
  open,
  setOpen,
  samplesDestroy,
  setSamplesDestroy,
  handleDestroy,
}: DestroyDialogProps) => {
  const handleWeightChange = (productCode: string, weight: number) => {
    setSamplesDestroy((prevSamples: DestroyPackageAndWeight[]) =>
      prevSamples.map((sample) =>
        sample.product_code === productCode ? { ...sample, weight } : sample
      )
    );
    console.log(samplesDestroy);
  };

  const handlePackageChange = (productCode: string, pack: string) => {
    setSamplesDestroy((prevSamples: DestroyPackageAndWeight[]) =>
      prevSamples.map((sample) =>
        sample.product_code === productCode ? { ...sample, package: pack } : sample
      )
    );
    console.log(samplesDestroy);
  };

  const handleDestroyButton = () => {
    handleDestroy();
    setOpen(!open);
  };

  return (
    <BootstrapDialog
      onClose={() => setOpen(!open)}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <form noValidate autoComplete="off">
        <FormControl>
          {samplesDestroy.map((sample) => (
            <DialogContent
              dividers
              key={sample.product_code}
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
            >
              <Typography>{sample.product_code}</Typography>
              <TextField
                name="weight"
                label="Weight"
                required
                type="number"
                margin="normal"
                onChange={(e) =>
                  handleWeightChange(sample.product_code, parseFloat(e.target.value))
                }
              />
              <TextField
                name="package"
                label="Package"
                required
                margin="normal"
                onChange={(e) => handlePackageChange(sample.product_code, e.target.value)}
              />
            </DialogContent>
          ))}

          <Button onClick={handleDestroyButton} sx={{ padding: 2 }}>
            Destroy
          </Button>
        </FormControl>
      </form>
    </BootstrapDialog>
  );
};

export default DestroyDialog;
