import { m } from 'framer-motion/dist/framer-motion';
import * as React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography, Button } from '@mui/material';

import Image from '../../Image';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0, 0, 0),
  background: '#F0FBF8',
}));

const ButtonStyle = styled(Button)(() => ({
  background: 'linear-gradient(89.86deg, #0065A5 0.06%, #1DB99B 99.83%)',
  boxShadow: '0px 0px 20px 5px rgba(0, 101, 165, 0.35)',
  borderRadius: '4px',
  margin: '10px'
}))

const ButtonTextStyle = styled('div')(() => ({
  textAlign: 'left',
  display: 'block'
}))

const ButtonSubTitleStyle = styled('div')(() => ({
  fontWeight: 300,
  fontSize: '12px',
  lineHeight: '26px',
  display: 'block'
}))

const ButtonTitleStyle = styled('div')(() => ({
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '26px',
  display: 'block'
}))

// ----------------------------------------------------------------------

export default function HomeDownloadMobile() {
  return (
    <RootStyle>
      <Container style={{ maxWidth: 1440 }}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
            <Box sx={{ textAlign: 'left', padding: '30px' }}>
              <m.div>
                <Typography color="primary" variant="h2" sx={{ mb: 3 }}>
                  Download Mobile
                </Typography>
                <Typography color="secondary" variant="h4" sx={{ fontWeight: '300!important', mb: 2 }}>
                  App To Stay Connected
                </Typography>
                <Typography sx={{ fontWeight: '300!important', mb: 2 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip.
                </Typography>
              </m.div>
            </Box>
            <Box sx={{ paddingLeft: '30px'}}>
              <ButtonStyle variant="contained" startIcon={<Image src="/assets/icons/googleplay.png" width="20px" height="20px"/>}>
                <ButtonTextStyle>
                  <ButtonSubTitleStyle>GET IT ON</ButtonSubTitleStyle>
                  <ButtonTitleStyle>Google Play</ButtonTitleStyle>
                </ButtonTextStyle>
              </ButtonStyle>
              <ButtonStyle variant="contained" startIcon={<Image src="/assets/icons/applestore.png" width="20px" height="20px"/>}>
                <ButtonTextStyle>
                  <ButtonSubTitleStyle>GET IT ON</ButtonSubTitleStyle>
                  <ButtonTitleStyle>Apple Store</ButtonTitleStyle>
                </ButtonTextStyle>
              </ButtonStyle>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: '20px' }}>
              <Image src="/assets/images/new/image24.png" width="100%" height="100%" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
