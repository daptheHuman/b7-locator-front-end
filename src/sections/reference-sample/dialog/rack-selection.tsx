import React, { SyntheticEvent } from 'react';

import { TextField, FormControl, Autocomplete } from '@mui/material';

import { CreateReferencedSample } from '../types';

interface RackSelectionProps {
  racks: Rack[];
  data: CreateReferencedSample;
  setData: React.Dispatch<React.SetStateAction<CreateReferencedSample>>;
}
export const RackSelection = ({ racks, data, setData }: RackSelectionProps) => {
  const selectionProps = {
    options: racks,
    getOptionLabel: (option: Rack) => `${option.rack_id} - ${option.location}`,
    getOptionKey: (option: Rack) => option.rack_id,
  };

  const handleChange = (event: SyntheticEvent<Element, Event>, value: Rack | null) => {
    if (value) {
      setData({ ...data, rack_id: value.rack_id });
    }
  };

  return (
    <FormControl sx={{ width: 1 }} variant="outlined" margin="dense">
      <Autocomplete
        {...selectionProps}
        id="auto-complete"
        autoComplete
        includeInputInList
        onChange={(event: SyntheticEvent<Element, Event>, newValue: Rack | null) =>
          handleChange(event, newValue)
        }
        renderInput={(params) => (
          <TextField {...params} required label="Select Rack" variant="outlined" name="rack_id" />
        )}
      />
    </FormControl>
  );
};
