import { m } from 'framer-motion/dist/framer-motion';
import * as React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Box, Grid, Container, Typography, Fab } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Image from '../../Image';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0, 0, 0),
}));

const ButtonStyle = styled(Fab)(({ theme }) => ({
  width: 40,
  height: 40,
  marginLeft: '10px',
  marginRight: '10px',
  backgroundColor: 'white',
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white!important',
  },
}));

const ContentStyle = styled('div')(() => ({
  marginLeft: '50px',
  marginRight: '50px',
}));

const CenterImage = styled(Image)(() => ({
  marginLeft: 'auto', 
  marginRight: 'auto'
}))

// ----------------------------------------------------------------------

export default function HomeProjectStory() {
  return (
    <RootStyle>
      <Container style={{}}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
            <CenterImage
              src="/assets/images/new/image9.png"
              maxWidth="525px"
              maxHeight="600px"
            />
            <Box sx={{ position: 'absolute', left: 30, top: 30 }}>
              <Image src="/assets/images/new/image8.png" maxWidth="118px" maxHeight="103.48px" />
            </Box>
            <Box sx={{ position: 'absolute', bottom: 30, right: 30 }}>
              <Image src="/assets/images/new/image8.png" maxWidth="118px" maxHeight="103.48px" />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <ContentStyle>
              <m.div>
                <Typography color="primary" variant="h2" sx={{ mb: 2 }}>
                  Turn Every Project
                </Typography>
                <Typography color="secondary" variant="h3" sx={{ fontWeight: '300!important', mb: 2 }}>
                  Into A Success Story
                </Typography>
              </m.div>
              <m.div>
                <CardHeader
                  avatar={
                    <Avatar
                      alt="Amelia Whatsherna"
                      src="/assets/images/new/avatar1.png"
                      sx={{ width: '82px', height: '82px' }}
                    />
                  }
                  title="Amelia Whatsherna"
                  subheader="MANAGER"
                  sx={{ paddingLeft: '0px' }}
                />
                <Box sx={{ marginTop: 10 }}>
                  <m.div>
                    <Box sx={{ width: 60, height: 50 }}>
                      <Image src="/assets/images/new/Vector5.png" />
                    </Box>
                    <Typography variant="body1">
                      Read how our customers implemented effective project management in their organizations with Togy
                      Project Management.
                    </Typography>
                    <m.div>
                      <Box align="right" sx={{ width: 60, height: 50, marginLeft: 'auto', marginRight: 0 }}>
                        <Image src="/assets/images/new/Vector6.png" />
                      </Box>
                      <Box>
                        <ButtonStyle aria-label="prev">
                          <ArrowBackIosNewIcon />
                        </ButtonStyle>
                        <ButtonStyle aria-label="next">
                          <ArrowForwardIosIcon />
                        </ButtonStyle>
                      </Box>
                    </m.div>
                  </m.div>
                </Box>
              </m.div>
            </ContentStyle>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
