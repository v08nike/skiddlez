import { m } from 'framer-motion/dist/framer-motion';
import * as React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography, Button } from '@mui/material';
import ServiceCard from '../../serviceCard/ServiceCard';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0, 0, 0),
}));

const SeeAllButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '50px',
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0px 0px 20px 3px rgba(0, 101, 165, 0.3)',
  borderRadius: '4px',
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  }
}))
// ----------------------------------------------------------------------

export default function HomeOurService() {
  return (
    <RootStyle>
      <Container style={{ maxWidth: 1440 }}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} sx={{ position: 'relative' }}>
            <Box sx={{ textAlign: 'center' }}>
              <m.div>
                <Typography color="secondary" variant="h6" sx={{ mb: 3 }}>
                  Our Solutions
                </Typography>
                <Typography color="primary" variant="h2" sx={{ fontWeight: '300!important', mb: 2 }}>
                  The Services We
                </Typography>
                <Typography color="primary" variant="h5" sx={{ fontWeight: '300!important', mb: 2 }}>
                  Provide
                </Typography>
              </m.div>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <ServiceCard
                  imageUrl={'/assets/icons/image43.png'}
                  iconColor={'#C4F5EC'}
                  cardStyle={'default'}
                  title={'Engineering'}
                  text={
                    'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour'
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ServiceCard
                  imageUrl={'/assets/icons/image38.png'}
                  iconColor={'#FFFFFF'}
                  cardStyle={'second'}
                  title={'Project'}
                  text={
                    'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour'
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ServiceCard
                  imageUrl={'/assets/icons/image39.png'}
                  iconColor={'#FCE4C4'}
                  cardStyle={'default'}
                  title={'Marketing'}
                  text={
                    'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour'
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ServiceCard
                  imageUrl={'/assets/icons/image42.png'}
                  iconColor={'#FCE4C4'}
                  cardStyle={'default'}
                  title={'Design'}
                  text={
                    'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour'
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ServiceCard
                  imageUrl={'/assets/icons/image41.png'}
                  iconColor={'#F5C4EB'}
                  cardStyle={'default'}
                  title={'Human Resource'}
                  text={
                    'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour'
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ServiceCard
                  imageUrl={'/assets/icons/image40.png'}
                  iconColor={'#B8E5FF'}
                  cardStyle={'default'}
                  title={'Operation'}
                  text={
                    'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour'
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ itemAlign: 'center', width: '100%', ml: '35px' }}>
            <Box sx={{ padding: '10px', mt: '20px',  ml: 'auto', mr: 'auto', width: '160px'}}>
              <SeeAllButton backgroundcolor="primary" >See All</SeeAllButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
