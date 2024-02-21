import React, { SyntheticEvent } from 'react';

import { TextField, FormControl, Autocomplete } from '@mui/material';

import { CreateReferencedSample } from '../types';

interface ProductSelectionProps {
  products: Product[];
  data: CreateReferencedSample;
  setData: React.Dispatch<React.SetStateAction<CreateReferencedSample>>;
}
export const ProductSelection = ({ products, data, setData }: ProductSelectionProps) => {
  const selectionProps = {
    options: products,
    getOptionLabel: (option: Product) => `${option.product_code} - ${option.product_name}`,
    getOptionKey: (option: Product) => option.product_code,
  };

  const handleChange = (event: SyntheticEvent<Element, Event>, value: Product | null) => {
    if (value) {
      setData({ ...data, product_code: value.product_code });
    }
  };

  return (
    <FormControl sx={{ width: 1 }} variant="outlined" margin="dense">
      <Autocomplete
        {...selectionProps}
        id="auto-complete"
        autoComplete
        includeInputInList
        onChange={(event: SyntheticEvent<Element, Event>, newValue: Product | null) =>
          handleChange(event, newValue)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Select Product"
            variant="outlined"
            name="product_code"
          />
        )}
      />
    </FormControl>
  );
};
