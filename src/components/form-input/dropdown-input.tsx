import { Controller, useFormContext } from 'react-hook-form';

import { Select, MenuItem, InputLabel, SelectProps, MenuItemProps } from '@mui/material';

type DropdownOption = {
  label: string;
  value: string | number;
};

type IDropdownInputProps = {
  name: string;
  options: DropdownOption[];
} & SelectProps &
  MenuItemProps;

const DropdownInput = ({ name, options, ...otherProps }: IDropdownInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <>
          <InputLabel id="demo-multiple-name-label">{otherProps.label}</InputLabel>

          <Select {...otherProps} {...field} error={!!errors[name]}>
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    />
  );
};

export default DropdownInput;
