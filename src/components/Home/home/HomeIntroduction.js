import { m } from 'framer-motion/dist/framer-motion'
// @mui
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { Box, Grid, Button, Container, Typography, Fab } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Image from '../../Image';

// components
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(18, 0, 0, 0),
  background: '#F3FAFF',
}))

const RightImageStyle = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: 350,
}))

const ContentStyle = styled('div')(({ theme }) => ({
  paddingTop: '102px',
  paddingLeft: '135px',
  [theme.breakpoints.down('md')]: {
    paddingTop: '80px',
    paddingLeft: '50px',
  },
}))

const SmallBoxStyle = styled('div')(() => ({
  width: 22,
  height: 22,
  background: '#0065A5',
  boxShadow: '0px 0px 10px 5px rgba(0, 101, 165, 0.24)',
}))

const NormalBoxStyle = styled('div')(() => ({
  width: 40,
  height: 40,
  background: '#0065A5',
  boxShadow: '0px 0px 10px 5px rgba(0, 101, 165, 0.24)',
  marginLeft: 22,
}))

const BigBoxStyle = styled('div')(({ theme }) => ({
  width: 200,
  height: 250,
  background: '#FFFFFF',
  borderRadius: 20,
  position: 'absolute',
  right: 90,
  top: 10,
  [theme.breakpoints.down('lg')]: {
    width: 170,
    height: 200,
    right: 50,
    top: 40,
  },
  [theme.breakpoints.down('md')]: {
    width: 150,
    height: 180,
    right: 50,
    top: 40,
  },
  [theme.breakpoints.down('sm')]: {
    width: 150,
    height: 200,
    right: 45,
    top: 90,
  },
}))

const InfoBoxStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'static',
  [theme.breakpoints.up('sm')]: {
    position: 'absolute',
    bottom: -35,
    flexDirection: 'row',
  },
}))

const InfoBoxItemStyle = styled('div')(() => ({
  width: 174,
  height: 74,
  background: '#FFFFFF',
  boxShadow: '0px 0px 20px 5px rgba(0, 101, 165, 0.13)',
  borderRadius: 10,
  margin: 10,
}))

const InfoBoxTextStyle = styled('div')(() => ({
  width: 160,
  height: 52,
  fontWeight: 300,
  fontSize: 16,
  color: '#000000',
  paddingLeft: 70,
  paddingTop: 12,
}))

const InfoBoxIconStyle = styled('div')(({ theme }) => ({
  position: 'absolute',
  color: theme.palette.primary.main,
  width: 30,
  height: 30,
  paddingRight: 20,
  marginTop: 20,
  marginLeft: 12,
}))

const LineStyle = styled('div')(() => ({
  position: 'absolute',
  width: 35,
  height: 0,
  marginTop: 35,
  marginLeft: 32,
  border: '1px solid #A9A9A9',
  transform: 'rotate(90deg)',
}))

const ButtonStyle = styled(Fab)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: 'white',
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white!important',
  },
}))

// ----------------------------------------------------------------------

export default function HomeIntroduction() {
  return (
    <RootStyle>
      <Container style={{ maxWidth: 1440 }}>
        <Grid container spacing={5} justifyContent="center">
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              padding: '15px !important',
              height: '658px',
              backgroundImage: 'url("/assets/images/new/Vector1.png")',
              backgroundSize: 'contain',
              backgroundPosition: 'left',
              backgroundRepeat: 'no-repeat',
              OBackgroundSize: 'contain',
              MozBackgroundSize: 'contain',
              WebkitBackgroundSize: 'contain',
            }}
          >
            <ContentStyle>
              <m.div>
                <Typography color="primary" variant="h2" sx={{ mb: 3 }}>
                  Skiddlez Helps teams
                </Typography>
                <Typography variant="h2" sx={{ mb: 3 }}>
                  move work forward.
                </Typography>
              </m.div>

              <m.div>
                <Typography
                  sx={{
                    mb: 5,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore.
                </Typography>
              </m.div>
              <m.div>
                <TextField
                  id="outlined-basic"
                  label="Enter Your Email"
                  variant="outlined"
                  style={{ maxWidth: 358 }}
                />{' '}
                <br />
                <br />
                <Button
                  style={{ width: 169, backgroundColor: '#84CBBD' }}
                  size="large"
                  variant="contained"
                >
                  Get Started
                </Button>
              </m.div>
              <Box sx={{ '& > :not(style)': { m: 1 }, paddingTop: '30px' }}>
                <ButtonStyle aria-label="prev">
                  <ArrowBackIosNewIcon />
                </ButtonStyle>
                <ButtonStyle aria-label="next">
                  <ArrowForwardIosIcon />
                </ButtonStyle>
              </Box>

              <div style={{ position: 'absolute', right: 30, bottom: 30 }}>
                <SmallBoxStyle />
                <NormalBoxStyle />
              </div>
            </ContentStyle>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            style={{
              backgroundImage: 'url("/assets/images/new/background1.png")',
              backgroundRepeat: 'no-repeat',
              OBackgroundSize: 'contain',
              MozBackgroundSize: 'contain',
              WebkitBackgroundSize: 'contain',
            }}
            dir="ltr"
            sx={{
              position: 'relative',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <RightImageStyle>
              <div style={{ position: 'absolute', left: 70, top: 38 }}>
                <SmallBoxStyle />
                <NormalBoxStyle />
              </div>
              <BigBoxStyle />
            </RightImageStyle>
            <Box
              style={{
                position: 'absolute',
                right: 60,
                bottom: 50,
              }}
            >
              <ArrowBackIosNewIcon color="primary" style={{ margin: 10 }} />
              <ArrowForwardIosIcon color="primary" style={{ margin: 10 }} />
            </Box>
            <InfoBoxStyle>
              <InfoBoxItemStyle>
                <InfoBoxIconStyle>
                  <Image src="/Assets/Icons/image1.png" sx={{ width: 30, height: 30 }} />
                </InfoBoxIconStyle>
                <LineStyle />
                <InfoBoxTextStyle>Creative & Design</InfoBoxTextStyle>
              </InfoBoxItemStyle>
              <InfoBoxItemStyle>
                <InfoBoxIconStyle>
                  <Image src="/Assets/Icons/image2.png" sx={{ width: 30, height: 30 }} />
                </InfoBoxIconStyle>
                <LineStyle />
                <InfoBoxTextStyle>Software Development</InfoBoxTextStyle>
              </InfoBoxItemStyle>
              <InfoBoxItemStyle>
                <InfoBoxIconStyle>
                  <Image src="/Assets/Icons/image3.png" sx={{ width: 30, height: 30 }} />
                </InfoBoxIconStyle>
                <LineStyle />
                <InfoBoxTextStyle>Project Manager</InfoBoxTextStyle>
              </InfoBoxItemStyle>
            </InfoBoxStyle>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  )
}
