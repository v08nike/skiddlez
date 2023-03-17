import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Divider, Container, Typography, Stack, Button, Box } from '@mui/material';
// routes

// components
import Logo from '../../Logo';
import SocialsButton from '../../SocialsButton';
import Image from '../../Image';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Service',
    children: [
      { name: 'Home', href: '#' },
      { name: 'Product', href: '#' },
      { name: 'Solution', href: '#' },
      { name: 'Features', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  },
  {
    headline: 'About Us',
    children: [
      { name: 'Terms & Conditions', href: '#' },
      { name: 'Copyrights', href: '#' },
      { name: 'FUP', href: '#' },
      { name: 'VAT', href: '#' },
    ],
  },
  {
    headline: 'Company',
    children: [
      { name: 'Blog', href: '#' },
      { name: 'Customers', href: '#' },
      { name: 'About Us', href: '#' },
      { name: 'Career', href: '#' },
    ],
  },
  {
    headline: 'Content',
    children: [
      { name: 'Content', href: '#' },
      { name: 'Packs', href: '#' },
      { name: 'Offers', href: '#' },
      { name: 'Plugins', href: '#' },
    ],
  },
];

const RootStyle = styled('div')(() => ({
  position: 'relative',
  background: 'linear-gradient(180deg, #0065A5 0%, #1DB99B 100%)',
  color: 'white',
}));

const ButtonStyle = styled(Button)(() => ({
  color: '#FFFFFF',
  boxShadow: '0px 0px 20px 5px rgba(0, 101, 165, 0.35)',
  borderColor: 'white',
  borderRadius: '4px',
  margin: '10px',
  width: '184px',
  height: '67px',
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

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={8} md={3}>
            <Stack sx={{ mb: 3 }}>
              <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
            </Stack>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              Lorem Ipsum is simply dummy text of the printing andtypesetting industry.
            </Typography>

            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
            >
              <SocialsButton sx={{ mx: 0.5 }} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={9} sx={{ position: 'relative' }}>
            <Stack spacing={5} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={0}>
                  <Typography component="p" variant="overline" sx={{ mb: 3, mt: 2 }}>
                    {list.headline}
                  </Typography>
                  {list.children.map((link) => (
                    <Link
                      to={link.href}
                      key={link.name}
                      color="inherit"
                      variant="body2"
                      component={RouterLink}
                      sx={{ display: 'block', '&: hover': {color: 'white!important'} }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
              <Stack height={160} sx={{ alignItems: 'center' }}>
                <Image src="/assets/images/new/image29.png" width={187} height={160} />
              </Stack>
            </Stack>
            <Stack>
              <Box sx={{ mt: '10px', marginRight: 0, marginLeft: ({xs: '0px', md: 'auto'}) }}>
                <ButtonStyle
                  variant="outlined"
                  startIcon={<Image src="/assets/icons/googleplay.png" width="20px" height="20px" />}
                >
                  <ButtonTextStyle>
                    <ButtonSubTitleStyle>GET IT ON</ButtonSubTitleStyle>
                    <ButtonTitleStyle>Google Play</ButtonTitleStyle>
                  </ButtonTextStyle>
                </ButtonStyle>
                <ButtonStyle
                  variant="outlined"
                  startIcon={<Image src="/assets/icons/applestore.png" width="20px" height="20px" />}
                >
                  <ButtonTextStyle>
                    <ButtonSubTitleStyle>GET IT ON</ButtonSubTitleStyle>
                    <ButtonTitleStyle>Apple Store</ButtonTitleStyle>
                  </ButtonTextStyle>
                </ButtonStyle>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Typography
        component="p"
        variant="body2"
        sx={{
          mt: 10,
          pt: 1,
          pb: 1,
          fontSize: 13,
          backgroundColor: '#0065A5',
          textAlign: 'center',
          color: 'white',
        }}
      >
        © 2021. All rights reserved
      </Typography>
    </RootStyle>
  );
}
