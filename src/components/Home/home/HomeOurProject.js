import { m } from 'framer-motion/dist/framer-motion';
import * as React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// components
import Image from '../../Image';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 0, 0, 0),
}));
// ----------------------------------------------------------------------

export default function HomeOurProject() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <RootStyle>
      <Container style={{ maxWidth: 1440 }}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} sx={{ position: 'relative' }}>
            <Box sx={{ textAlign: 'center' }}>
              <m.div xs={{ zIndex: 99999 }}>
                <Typography color="primary" variant="h2" sx={{ mb: 3, fontWeight: '600!important' }}>
                  Get Work Done On Time,
                </Typography>
                <Typography color="primary" variant="h3" sx={{ fontWeight: '300!important', mb: 5 }}>
                  All The Time!
                </Typography>
              </m.div>
            </Box>
            <Box sx={{ position: 'absolute', top: '20px', right: '10px', zIndex: '0' }}>
              <Image src="/assets/images/new/Logo.png" width="156px" height="173px" />
            </Box>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="Our Project"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      maxWidth: '850px',
                    }}
                  >
                    <Tab label="Project Management" value="1" />
                    <Tab label="Engineering" value="2" />
                    <Tab label="Sales" value="3" />
                    <Tab label="Marketing" value="4" />
                    <Tab label="Product" value="5" />
                    <Tab label="Design" value="6" />
                    <Tab label="Finance" value="7" />
                    <Tab label="IT" value="8" />
                  </TabList>
                </Box>
                <Box sx={{ minHeight: { xs: '250px', sm: '500px', md: '650px' } }}>
                  <TabPanel value="1">
                    <Image src="/assets/images/new/OurProduct2.png" width="100%" height="100%" />
                  </TabPanel>
                  <TabPanel value="2">
                    <Image src="/assets/images/new/OurProduct2.png" width="100%" height="100%" />
                  </TabPanel>
                  <TabPanel value="3">
                    <Image src="/assets/images/new/OurProduct2.png" width="100%" height="100%" />
                  </TabPanel>
                  <TabPanel value="4">
                    <Image src="/assets/images/new/OurProduct2.png" width="100%" height="100%" />
                  </TabPanel>
                  <TabPanel value="5">
                    <Image src="/assets/images/new/OurProduct2.png" width="100%" height="100%" />
                  </TabPanel>
                  <TabPanel value="6">
                    <Image src="/assets/images/new/OurProduct2.png" width="100%" height="100%" />
                  </TabPanel>
                  <TabPanel value="7">
                    <Image src="/assets/images/new/OurProduct2.png" width="100%" height="100%" />
                  </TabPanel>
                  <TabPanel value="8">
                    <Image src="/assets/images/new/OurProduct2.png" width="100%" height="100%" />
                  </TabPanel>
                </Box>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
