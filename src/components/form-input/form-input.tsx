import { Controller, useFormContext } from 'react-hook-form';

import { TextField, TextFieldProps } from '@mui/material';

type IFormInputProps = {
  name: string;
} & TextFieldProps;

const FormInput = ({ name, ...otherProps }: IFormInputProps) => {
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
        <TextField
          {...otherProps}
          {...field}
          error={!!errors[name]}
          helperText={<>{errors[name]?.message || ''}</>}
        />
      )}
    />
  );
};

export default FormInput;
