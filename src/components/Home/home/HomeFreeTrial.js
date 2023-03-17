import { m } from 'framer-motion/dist/framer-motion';
import * as React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Button } from '@mui/material';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0, 5, 0),
  backgroundColor: '#F0FBF8',
}));

const ContentStyle = styled('div')(({ theme })=>({
  color: theme.palette.primary.color,
  textAlign: 'center'
}))

const ButtonStyle = styled(Button)(({ theme }) => ({
  background: `linear-gradient(90.02deg, #0065A5 0.02%, ${  theme.palette.secondary.lighter  } 99.99%)`,
  boxShadow: '0px 0px 20px 5px rgba(0, 101, 165, 0.27)',
  marginRight: '20px',
  width: '250px',
  color: 'white'
}))

// ----------------------------------------------------------------------

export default function HomeFreeTrial() {
  return (
    <RootStyle>
      <Container>
        <ContentStyle>
          <m.div>
            <Typography color="primary" sx={{ mb: 2, fontWeight: '400!important', fontSize: '14px' }}>
             Test the product before purchasing
            </Typography>
          </m.div>
          <m.div>
            <Typography color="primary" sx={{ mb: 2, fontWeight: '600!important', fontSize: '30px' }}>
              30 Days Free Trial, No Credit Required
            </Typography>
          </m.div>
          <m.div>
            <ButtonStyle >
              Your Email Address
            </ButtonStyle>
            <Button color="secondary" variant="outlined">Free Trial</Button>
          </m.div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
