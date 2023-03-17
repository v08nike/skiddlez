import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
import Image from './Image';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

// eslint-disable-next-line react/prop-types
export default function Logo({ isMobile, disabledLink = false, sx }) {
  // OR
  // const logo = '/logo/logo_single.svg';

  const logo = isMobile === 1 ? (
    <Box sx={{ maxWidth: '77px', height: '50px', paddingTop: '10px', ...sx }}>
      <Image src="/assets/images/new/Logo3.png" />
    </Box>
  ) : (
    <Box sx={{ maxWidth: '171px', height: '77px', ...sx }}>
      <Image src="/assets/images/new/Logo3.png" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
