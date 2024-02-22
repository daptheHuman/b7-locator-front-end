import { Controller, useFormContext } from 'react-hook-form';

import { TextField, FormControl, Autocomplete, TextFieldProps } from '@mui/material';

type ProductSelectionProps = {
  products: Product[];
} & TextFieldProps;

export const ProductSelection = ({ products, ...otherProps }: ProductSelectionProps) => {
  const selectionProps = {
    options: products,
    getOptionLabel: (option: Product) => `${option.product_code} - ${option.product_name}`,
    getOptionKey: (option: Product) => option.product_code,
  };

  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();
  console.log(watch('product_code'));

  return (
    <FormControl sx={{ width: 1 }} variant="outlined" margin="dense">
      <Controller
        control={control}
        name="product_code"
        defaultValue=""
        render={({ field: { onChange } }) => (
          <Autocomplete
            {...selectionProps}
            id="auto-complete"
            autoComplete
            includeInputInList
            onChange={(event, item) => {
              onChange(item?.product_code);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...otherProps}
                required
                label="Select Product"
                variant="outlined"
                error={!!errors.product_code}
                helperText={<>{errors.product_code?.message || ''}</>}
              />
            )}
          />
        )}
      />
    </FormControl>
  );
};
