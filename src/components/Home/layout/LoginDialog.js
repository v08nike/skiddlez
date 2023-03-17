import * as React from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, Box, Button, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GoogleLogin from 'react-google-login';
import { authenticate, authenticateGoogle, clearAuthenticateError } from '../../../actions/entry';
// routes
import Image from '../../Image';
import SocialsButton from '../../SocialsButton';
// sections
import { LoginForm } from '../auth/login';
import { ResetPasswordForm } from '../auth/reset-password';



// ----------------------------------------------------------------------
let clientsId = '';
// let titleId = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    clientsId = process.env.REACT_APP_DEV_GOOGLE_CLIENT_ID;
    // titleId = process.env.REACT_APP_DEV_TITLE;
} else {
    // production code
    clientsId = process.env.REACT_APP_PROD_GOOGLE_CLIENT_ID;
    // titleId = process.env.REACT_APP_PROD_TITLE;
}

const hostedDomain = process.env.REACT_APP_GOOGLE_OAUTH_HOSTED_DOMAIN;


// eslint-disable-next-line react/prop-types
 const LoginDialog = ({ openLogin, handleLoginClose, onAuthenticate, onAuthenticateGoogle }) => {
  const [isLogin, setIsLogin] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleChangeToResetPassword = () => {
    setIsLogin(false);
  };

  const handleChangeToLogin = () => {
    setIsLogin(true);
  };

  const onClickLoginClose = () => {
    handleLoginClose();
    setIsLogin(true);
  };

  const onClickLoginButton = (data) => {
    onAuthenticate(data);
  }

  const responseGoogle = React.useCallback((callback) => {
    const tokenId = callback?.tokenId
    console.log(tokenId);
    onAuthenticateGoogle({tokenId});
  }, [onAuthenticateGoogle]);

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      fullScreen={fullScreen}
      open={openLogin}
      onClose={onClickLoginClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <Typography color="primary" sx={{ fontSize: '30px' }} gutterBottom>
          {isLogin ? 'Login' : 'Forget your Password!'}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClickLoginClose}
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
        {isLogin ? (
          <Stack sx={{ mt: '20px' }}>
            <Box sx={{ flexGrow: 1, width: '100%', mb: 3 }}>
              {hostedDomain &&
              <>
                <GoogleLogin
                  hostedDomain={hostedDomain}
                  clientId={clientsId}
                  onSuccess={responseGoogle}
                  render={renderProps => (
                    <Button
                      color="primary"
                      variant="outlined"
                      startIcon={<Image src="/assets/icons/google.png" />}
                      sx={{ width: '100%', padding: '10px', backgroundColor: '#FFFFFF' }}
                      onClick={renderProps.onClick}
                    >
                      Sign in with Google
                    </Button>
                    )}
                />
                <small>{hostedDomain}</small>
              </>
            }
            {!hostedDomain &&
              <GoogleLogin
                clientId={clientsId}
                onSuccess={responseGoogle}
                render={renderProps => (
                  <Button
                      color="primary"
                      variant="outlined"
                      startIcon={<Image src="/assets/icons/google.png" />}
                      sx={{ width: '100%', padding: '10px', backgroundColor: '#FFFFFF' }}
                      onClick={renderProps.onClick}
                    >
                      Sign in with Google
                    </Button>
                  )}
              />
            }              
            </Box>
            <Divider sx={{ fontSize: '14px', mb: 3 }}>Or Sign in with Email</Divider>
            <LoginForm resetPasswordHandle={handleChangeToResetPassword} onClickLoginButton={onClickLoginButton}/>
          </Stack>
        ) : (
          <Stack sx={{ mt: '20px' }}>
            <ResetPasswordForm />
            <Divider sx={{ fontSize: '14px', mt: 3, mb: 3 }}>Or Log in as User</Divider>

            <Stack direction="row" justifyContent={{ xs: 'center', itemAlign: 'center' }} sx={{ mb: 0 }}>
              <SocialsButton sx={{ mx: 0.5 }} />
            </Stack>

            <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
              Return to Login?{' '}
              <Button color="primary" onClick={handleChangeToLogin}>
                Login
              </Button>
            </Typography>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}


const mapStateToProps = ({ authenticateForm: { data: defaultData, isSubmitting, error }, theme : {theme} }) => ({
  defaultData,
  isSubmitting,
  error,
  theme
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onAuthenticate: authenticate,
      onMessageDismiss: clearAuthenticateError,
      onAuthenticateGoogle: authenticateGoogle,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
