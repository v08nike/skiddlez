import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import isEmail from 'validator/lib/isEmail';
// @mui
import { Button, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
// import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../hook-form';
import { isUsername } from '../../../../utils/validator';

// ----------------------------------------------------------------------

export default function LoginForm(props) {
  // eslint-disable-next-line react/prop-types
  const {resetPasswordHandle, onClickLoginButton} = props;
  // const { login } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    emailOrUsername: Yup.string().required('Email or Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    emailOrUsername: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const cleanData = {
        emailOrUsername: data.emailOrUsername.trim(),
        password: data.password.trim(),
      };

      if (!isUsername(data.emailOrUsername)) {
        return;
      }

      if (!data.password) {
        return;
      }
      
      await onClickLoginButton(cleanData);
      
    } catch (error) {
      console.error(error);

      reset();

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="emailOrUsername" label="Email address" sx={{ backgroundColor: '#ffffff'}} />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ backgroundColor: '#ffffff'}}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Button color="primary" onClick={resetPasswordHandle} >
          Forgot password?
        </Button>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
