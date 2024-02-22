import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { TextField, FormControl, Autocomplete, TextFieldProps } from '@mui/material';

type RackSelectionProps = {
  racks: Rack[];
} & TextFieldProps;

export const RackSelection = ({ racks, ...otherProps }: RackSelectionProps) => {
  const selectionProps = {
    options: racks,
    getOptionLabel: (option: Rack) => `${option.rack_id} - ${option.location}`,
    getOptionKey: (option: Rack) => option.rack_id,
  };

  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();
  console.log(watch('rack_id'));

  return (
    <FormControl sx={{ width: 1 }} variant="outlined" margin="dense">
      <Controller
        control={control}
        name="rack_id"
        defaultValue=""
        render={({ field: { onChange } }) => (
          <Autocomplete
            {...selectionProps}
            id="auto-complete"
            autoComplete
            includeInputInList
            onChange={(event, item) => {
              onChange(item?.rack_id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...otherProps}
                required
                label="Select Rack"
                variant="outlined"
                error={!!errors.rack_id}
                helperText={<>{errors.rack_id?.message || ''}</>}
              />
            )}
          />
        )}
      />
    </FormControl>
  );
};
