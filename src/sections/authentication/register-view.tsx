import React from 'react';
import { TypeOf } from 'zod';
import { Navigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Link, Alert, Snackbar, AlertProps, Typography } from '@mui/material';

import { UserContext } from 'src/authentication/user-context';

import Logo from 'src/components/logo';
import FormInput from 'src/components/form-input/form-input';

import { authSchema } from './resolver';

type AuthInput = TypeOf<typeof authSchema>;

const RegisterView = () => {
  const { user, register } = React.useContext(UserContext);
  const [snackbar, setSnackbar] = React.useState<AlertProps | null>(null);

  const methods = useForm<AuthInput>({
    resolver: zodResolver(authSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const registerHandler = async (registerInput: AuthInput) => {
    await register(registerInput).catch((error: HTTPExceptionError) => {
      setSnackbar({ children: error.detail, severity: 'error' });
    });
  };

  const handleCloseSnackbar = () => setSnackbar(null);

  return (
    <>
      {user && <Navigate to="/" replace />}
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      <Box sx={{ alignItems: 'center', flexDirection: 'column', width: 1 }} display="flex">
        <FormProvider {...methods}>
          <Box
            sx={{
              width: 1 / 4,
              paddingY: 10,
              flexDirection: 'column',
            }}
            component="form"
            display="flex"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(registerHandler)}
          >
            <Logo sx={{ height: 'auto', width: 1 / 2 }} disabledLink={false} href="#" />
            <FormInput name="username" required fullWidth label="Username" sx={{ mb: 2 }} />
            <FormInput
              type="password"
              name="password"
              required
              fullWidth
              label="Password"
              sx={{ mb: 2 }}
            />

            <LoadingButton loading={isSubmitting} variant="contained" type="submit">
              Register
            </LoadingButton>
          </Box>
        </FormProvider>
        <Typography>Already have an account?</Typography>
        <Link href="/login">Login Here</Link>
      </Box>
    </>
  );
};

export default RegisterView;
