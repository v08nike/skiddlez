import { m } from 'framer-motion/dist/framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography, Button } from '@mui/material';
// components
import Image from '../../Image';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: '#FFFFFF',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
}));

const GetStartedButtonStyle = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white!important",
  fontWeight: "600!important", 
}));

// ----------------------------------------------------------------------

export default function HomeAwesomeService() {
  return (
    <RootStyle>
      <Container style={{ maxWidth: 1400}}>
        <Grid container spacing={5} direction="row-reverse" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <m.div>
                <Typography color="secondary" sx={{ mb: 2, fontWeight: "600!important", fontSize: '18px'}}>
                  Awesome Services.
                </Typography>
              </m.div>

              <m.div>
                <Typography color="primary" variant="h2" sx={{ mb: 3, fontWeight: "600!important", fontSize: '30px' }}>
                  Simplify work and get more done.
                </Typography>
              </m.div>

              <m.div>
                <Typography sx={{ color: 'common.black', fontWeight: "600!important",  mb: 5 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                </Typography>
              </m.div>

              <m.div>
                <GetStartedButtonStyle>
                  Get Started
                </GetStartedButtonStyle>
              </m.div>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
            <Box style={{ position: 'relative', width:"100%", height: "100%" }}>
              <Image alt="Awesome Service" src="/assets/images/new/computer3.png" whith="100%" height="100%"/>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
