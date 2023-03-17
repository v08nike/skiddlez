import { m } from 'framer-motion/dist/framer-motion'
// @mui
import { styled } from '@mui/material/styles'
import { Box, Container, Typography } from '@mui/material'

// components
import Image from '../../Image'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0),
  backgroundColor: '#F0FBF8',
}))
// ----------------------------------------------------------------------

export default function HomeColorPresets() {
  return (
    <RootStyle id="product">
      <Container
        sx={{
          position: 'relative',
          textAlign: 'left',
          maxWidth: '1440px!important',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              left: { xs: 10, sm: 50, md: 115 },
            }}
          >
            <m.div>
              <Typography
                color="secondary"
                sx={{ mb: 2, fontSize: '18px' }}
              >
                Our Product
              </Typography>
              <Typography
                color="primary"
                sx={{
                  mb: 2,
                  fontSize: '50px',
                  visibility: { xs: 'hidden', md: 'visible' },
                  fontWeight: 600,
                }}
              >
                Lorem Ipsum is simply
              </Typography>
              <Typography
                color="primary"
                sx={{
                  mb: 2,
                  fontSize: '30px',
                  visibility: { xs: 'hidden', md: 'visible' },
                }}
              >
                dummy text of the printing
              </Typography>
            </m.div>
          </Box>
          <Image alt="grid" src="/assets/images/new/OurProduct1.png" />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 'calc(100vw/2 - )',
          }}
        >
          <Image
            alt="grid"
            src="/assets/images/new/skyscraper-view-city-leader-window-frame1.png"
          />
        </Box>
      </Container>
    </RootStyle>
  )
}
