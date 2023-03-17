import { m } from 'framer-motion/dist/framer-motion';
import * as React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

// components
import Image from '../../Image';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0, 0, 0),
  backgroundColor: '#F0FBF8',
}));

const LeftImageStyle = styled('div')(({ theme }) => ({
  width: '156px',
  height: '173px',
  position: 'absolute',
  bottom: '-80px',
  left: 90,
  [theme.breakpoints.down('md')]: {
    width: "120px",
    height: "140px",
    bottom: '-60px',
  },
}));

const RightImageStyle = styled('div')(({ theme }) => ({
  width: '406px',
  height: '398px',
  position: 'absolute',
  bottom: '-80px',
  right: 30,
  zIndex: 0,
  [theme.breakpoints.down('md')]: {
    width: "300px",
    height: "300px",
    bottom: '-80px',
    right: 0,
  },
}));

// ----------------------------------------------------------------------

export default function HomeInegrateApp() {
  return (
    <RootStyle>
      <Container style={{ maxWidth: 1440 }}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={6} sx={{ position: 'relative'}}>
            <Image src="/assets/images/new/SocialIcons.png" width="100%" height="100%" />
            <LeftImageStyle>
              <Image src="/assets/images/new/logo2.png" width="156px" height="173px" />
            </LeftImageStyle>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              position: 'relative',
              backgroundImage: 'url("/assets/images/new/Vector4.png")',
              backgroundSize: 'initial',
              backgroundPosition: 'left top',
              backgroundRepeat: 'no-repeat',
              OBackgroundSize: 'contain',
              MozBackgroundSize: 'contain',
              WebkitBackgroundSize: 'contain',
              height: 480,
              zIndex: 100,
            }}
          >
            <m.div>
              <Typography color="primary" variant="h2" sx={{ mb: 2 }}>
                Integrate With Your
              </Typography>
              <Typography color="primary" variant="h5" sx={{ fontWight: '300!important', mb: 2 }}>
                Favorite Apps
              </Typography>
              <Typography variant="body2" sx={{ mb: 2,}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </m.div>
            <RightImageStyle>
              <Image src="/assets/images/new/image1.png" width="100%" height="100%" />
            </RightImageStyle>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
