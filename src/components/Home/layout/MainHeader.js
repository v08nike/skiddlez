import * as React from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container } from '@mui/material';

// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER } from '../../../config';
// components
import Logo from '../../Logo';
import Image from '../../Image';
// import Label from '../../components/Label';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';

import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const SignUpButtonStyle = styled(Button)(({ theme }) => ({
  width: 116,
  height: 44,
  background: theme.palette.primary.main,
  boxShadow: '0px 0px 20px 3px rgba(0, 101, 165, 0.21)',
  borderRadius: 60,
  margin: '0px 5px',
}));

const LoginButtonStyle = styled(Button)(() => ({
  width: 116,
  height: 44,
  boxShadow: '0px 0px 20px 3px rgba(132, 203, 189, 0.37)',
  borderRadius: 60,
  margin: '0px 5px',
  "&: hover": {
    color: "white"
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/';

  const [openLogin, setLoginOpen] = React.useState(false);
  const [openSignUp, setSignUpOpen] = React.useState(false);

  // const handleClickLoginOpen = () => {
  //   setLoginOpen(true);
  // };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  // const handleClickSignUpOpen = () => {
  //   setSignUpOpen(true);
  // };

  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'white' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {isDesktop ? <Logo /> : <Logo isMobile={1} />}
          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}

          <Box sx={{ flexGrow: 1 }} />

          <SignUpButtonStyle
            variant="contained"
            color="primary"
            rel="noopener"
            href="/register"
            // onClick={handleClickSignUpOpen}
            startIcon={<Image src="/assets/icons/signup.png" width="18px" height="18px" />}
          >
            SignUp
          </SignUpButtonStyle>

          <LoginButtonStyle
            variant="contained"
            color="secondary"
            rel="noopener"
            href="/login"
            // onClick={handleClickLoginOpen}
            startIcon={<Image src="/assets/icons/login.png" width="18px" height="18px" />}
          >
            Login
          </LoginButtonStyle>

          {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
      <LoginDialog openLogin={openLogin} handleLoginClose={handleLoginClose}/>
      <RegisterDialog openSignUp={openSignUp} handleSignUpClose={handleSignUpClose}/>
    </AppBar>
  );
}
