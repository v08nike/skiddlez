import { m } from 'framer-motion/dist/framer-motion';
import * as React from 'react';
// @mui
import { styled } from '@mui/material/styles';

import { Box, Grid, Container, Typography, Button, TextField, Stack } from '@mui/material';
// @mui
import Image from '../../Image';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 5, 0, 5),
  backgroundColor: '#E6F5FF',
  backgroundImage: 'url("/assets/images/new/Vector7.png")',
  backgroundSize: 'initail',
  backgroundPosition: 'right',
  backgroundRepeat: 'no-repeat',
  OBackgroundSize: 'contain',
  MozBackgroundSize: 'contain',
  WebkitBackgroundSize: 'contain',
}));

const ButtonStyle = styled(Button)(() => ({
  width: '100%',
  background: 'linear-gradient(89.86deg, #0065A5 0.06%, #1DB99B 99.83%)',
  boxShadow: '0px 0px 20px 5px rgba(0, 101, 165, 0.35)',
  borderRadius: '10px',
  padding: '15px',
  textAlign: 'left',
}));

const ButtonTextStyle = styled('div')(() => ({
  textAlign: 'left',
  display: 'block',
}));

const ButtonSubTitleStyle = styled('div')(() => ({
  fontWeight: 300,
  fontSize: '12px',
  lineHeight: '26px',
  display: 'block',
}));

const ButtonTitleStyle = styled('div')(() => ({
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '26px',
  display: 'block',
}));

const TextFeildStyle = styled(TextField)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.primary.main,
}));

// ----------------------------------------------------------------------

export default function HomeContactUs() {
  return (
    <RootStyle>
      <Container>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={7} sx={{ position: 'relative', zIndex: 100 }}>
            <m.div>
              <m.div>
                <Typography color="secondary" sx={{ mb: 1, fontWeight: '600!important', fontSize: '18px' }}>
                  Get In Touch
                </Typography>
              </m.div>

              <m.div>
                <Typography color="primary" variant="h2" sx={{ mb: 2, fontWeight: '600!important', fontSize: '30px' }}>
                  How To Contact Us
                </Typography>
              </m.div>
              <m.div>
                <Typography sx={{ fontWeight: '300!important', mb: 2, fontSize: '16px' }}>
                  Send Us Message At Anytime From Anywhere
                </Typography>
              </m.div>
              <m.div>
                <Typography sx={{ fontWeight: '300!important', mb: 2, fontSize: '16px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                </Typography>
              </m.div>
            </m.div>
            <m.div>
              <Stack spacing={5}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6}>
                        <ButtonStyle
                          variant="contained"
                          startIcon={<Image src="/assets/icons/phone.png" width="20px" height="20px" />}
                        >
                          <ButtonTextStyle>
                            <ButtonTitleStyle>Call Us</ButtonTitleStyle>
                            <ButtonSubTitleStyle>91+ 123 456 789</ButtonSubTitleStyle>
                          </ButtonTextStyle>
                        </ButtonStyle>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ButtonStyle
                          variant="contained"
                          startIcon={<Image src="/assets/icons/telegram.png" width="20px" height="20px" />}
                        >
                          <ButtonTextStyle>
                            <ButtonTitleStyle>Email Us</ButtonTitleStyle>
                            <ButtonSubTitleStyle>skiddlez@gmail.com</ButtonSubTitleStyle>
                          </ButtonTextStyle>
                        </ButtonStyle>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6}>
                        <TextFeildStyle variant="outlined" fullWidth label="Name" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextFeildStyle fullWidth label="Email" />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6}>
                        <TextFeildStyle fullWidth label="Phone" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextFeildStyle fullWidth label="Service" />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <TextFeildStyle fullWidth label="Enter your message here." multiline rows={5} />
                  </Grid>
                </Grid>
                <Box sx={{ padding: '0 0 30px 0', width: '164px' }}>
                  <Button size="large" variant="contained" sx={{ width: '100%' }}>
                    Send
                  </Button>
                </Box>
              </Stack>
            </m.div>
          </Grid>
          <Grid item xs={12} md={5} sx={{ position: 'relative', paddingBottom: '20px', zIndex: 0 }}>
            <Box sx={{ position: 'absolute', bottom: 0 }}>
              <Image src="/assets/images/new/woman.png" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
