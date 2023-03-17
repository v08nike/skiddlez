import * as React from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
// routes
import SocialsButton from '../../SocialsButton';
// sections
// import { LoginForm } from '../../sections/auth/login';
import { RegisterForm } from '../auth/register';

// ----------------------------------------------------------------------

export default function RegisterDialog(props) {
  // eslint-disable-next-line react/prop-types
  const { openSignUp, handleSignUpClose } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={openSignUp}
      onClose={handleSignUpClose}
      fullScreen={fullScreen}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <Typography color="primary" sx={{ fontSize: '30px' }} gutterBottom>
          Sign Up
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleSignUpClose}
          sx={{
            position: 'absolute',
            right: 20,
            top: 20,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack sx={{ mt: '20px' }}>
          <RegisterForm />

          <Divider sx={{ fontSize: '14px', mt: 3, mb: 3 }}>Or Sign in with Email</Divider>

          <Stack direction="row" justifyContent={{ xs: 'center', itemAlign: 'center' }} sx={{ mb: 0 }}>
            <SocialsButton sx={{ mx: 0.5 }} />
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
