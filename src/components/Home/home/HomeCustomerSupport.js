import { m } from 'framer-motion/dist/framer-motion';
import * as React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography, Button } from '@mui/material';

import Image from '../../Image';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0, 0, 0),
  background: 'linear-gradient(89.94deg, #0065A5 0.05%, #1DB99B 99.95%)',
}));

const Buttontyle = styled(Button)(() => ({
  borderRadius: '4px',
  border: '1px solid #FFFFFF',
  color: '#FFFFFF',
  marginLeftRight: 'auto',
  marginTop: '20px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
}));

// ----------------------------------------------------------------------

export default function HomeCustomerSupport() {
  return (
    <RootStyle>
      <Container style={{ maxWidth: 1440 }}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} sm={8} md={8} sx={{ position: 'relative' }}>
            <Box sx={{ textAlign: 'left', padding: '30px', color: 'white' }}>
              <m.div>
                <Typography variant="h2" sx={{ mb: 3 }}>
                  24/7 Customer Support
                </Typography>
                <Typography sx={{ fontWeight: '300!important', mb: 2 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </Typography>
              </m.div>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} sx={{ position: 'relative', minHeight: '200px' }}>
            <Box>
              <Buttontyle color="secondary" variant="outlined">
                Get Started
              </Buttontyle>
            </Box>
            <Box sx={{ position: 'absolute', left: 30, top: 30 }}>
              <Image src="/assets/images/new/Mark1.png" maxWidth="118px" maxHeight="103.48px" />
            </Box>
            <Box sx={{ position: 'absolute', bottom: 30, right: 30 }}>
              <Image src="/assets/images/new/Mark2.png" maxWidth="118px" maxHeight="103.48px" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
