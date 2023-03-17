import PropTypes from 'prop-types'
import { m } from 'framer-motion/dist/framer-motion'
// @mui
import { styled } from '@mui/material/styles'
import {
  Box,
  Grid,
  Card,
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0, 0, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}))

const ButtonStyle = styled(Button)(() => ({
  backgroundColor: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#FFFFFF',
  },
}))

IconBullet.propTypes = {
  type: PropTypes.oneOf(['item', 'subheader']),
}

function IconBullet({ type = 'item' }) {
  return (
    <Box sx={{ width: 10, height: 20, display: 'flex', alignItems: 'center' }}>
      <Box
        component="span"
        sx={{
          ml: '2px',
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'currentColor',
          ...(type !== 'item' && {
            ml: 0,
            width: 8,
            height: 2,
            borderRadius: 2,
          }),
        }}
      />
    </Box>
  )
}

// ----------------------------------------------------------------------

export default function HomePricingPlans() {
  const tempData = [
    {
      cardStyle: 'default',
      titleLine1: 'Pay Per Job',
      titleLine2: '$100',
      subTitle: 'Per job, Per month',
      content: 'A pay as you go solution for occasional hiring.',
      options: [
        'Job posting to 200+ boards globally',
        'Careers page builder AI-powered',
        'AI-powered sourcing',
        'Gmail/Outlook/Zoom integrations',
        'Automated actions and self-scheduling',
        'E-signatures and offer letters',
        'Automated GDPR, CCPA compliance',
        'Self-guided onboarding',
      ],
    },
    {
      cardStyle: 'secondary',
      titleLine1: 'Standard',
      titleLine2: '300$',
      subTitle: 'Per month, Billed annually',
      content: 'Our most popular plan, designed for growing businesses.',
      options: [
        'Job posting to 200+ boards globally',
        'Careers page builder AI-powered',
        'AI-powered sourcing',
        'Gmail/Outlook/Zoom integrations',
        'Automated actions and self-scheduling',
        'E-signatures and offer letters',
        'Automated GDPR, CCPA compliance',
        'Self-guided onboarding',
      ],
    },
    {
      cardStyle: 'default',
      titleLine1: 'Primium',
      titleLine2: '300$',
      subTitle: 'Per month, Billed annually',
      content:
        'An expansive solution for businesses looking for top-tier service.',
      options: [
        'Hiring plan ',
        'Requisition approvals',
        'Native language options',
        'Single sign-on',
        'Dedicated account manager',
        'Custom onboarding',
      ],
    },
  ]

  return (
    <RootStyle>
      <Container>
        <Box sx={{ mb: 10, textAlign: 'center' }}>
          <m.div>
            <Typography
              color="primary"
              component="div"
              variant="h2"
              sx={{ mb: 2 }}
            >
              Pricing
            </Typography>
          </m.div>
          <m.div>
            <Typography sx={{ color: 'black' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et <br />
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco
            </Typography>
          </m.div>
        </Box>

        <Grid container spacing={5}>
          {tempData.map((item, index) => (
            <Grid key={index} item xs={12} md={4}>
              <m.div>
                <PlanCard plan={item} />
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  )
}

// ----------------------------------------------------------------------

PlanCard.propTypes = {
  plan: PropTypes.shape({
    license: PropTypes.string,
    commons: PropTypes.arrayOf(PropTypes.string),
    icons: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.arrayOf(PropTypes.string),
  }),
}

function PlanCard({ plan }) {
  // eslint-disable-next-line react/prop-types
  const { options, cardStyle, titleLine1, titleLine2, subTitle, content } = plan

  const defualtCardStyle = {
    p: 5,
    boxShadow: 5,
    color: 'black',
  }

  const secondaryCardStyle = {
    p: 5,
    boxShadow: 5,
    background: 'linear-gradient(90deg, #0065A5 0%, #1DB99B 100%)',
    borderRadius: '15px',
    color: 'white',
  }

  return (
    <Card sx={cardStyle === 'default' ? defualtCardStyle : secondaryCardStyle}>
      <Stack spacing={5}>
        <Stack sx={{ textAlign: 'center' }}>
          <m.div>
            <Typography
              sx={{ color: 'text.defualt', fontSize: '24px', fontWeight: 500 }}
            >
              {titleLine1} <br /> {titleLine2}
            </Typography>
          </m.div>
          <m.div>
            <Typography
              sx={{
                color: 'text.defualt',
                fontSize: '12px',
                mb: 5,
                fontWeight: 400,
              }}
            >
              {subTitle}
            </Typography>
          </m.div>
          <m.div>
            <Typography
              sx={{
                mt: '20px!important',
                color: 'text.defualt',
                fontSize: '16px',
                fontWeight: 400,
                height: '90px',
              }}
            >
              {content}
            </Typography>
          </m.div>
        </Stack>

        <Stack
          sx={{
            height: '250px',
            mt: '0px!important',
            maxWidth: '500px!important',
            ml: 'auto!important',
            mr: 'auto!important',
          }}
        >
          {options.map((option) => (
            <Stack key={option} spacing={1} direction="row" alignItems="center">
              <IconBullet />
              <Typography variant="body2">{option}</Typography>
            </Stack>
          ))}
        </Stack>

        <ButtonStyle
          size="large"
          variant="outlined"
          target="_blank"
          rel="noopener"
          sx={{ mt: '10px!!important' }}
        >
          Activate
        </ButtonStyle>
      </Stack>
    </Card>
  )
}
