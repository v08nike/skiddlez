import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Link, Stack, Button, Tooltip, IconButton } from '@mui/material';
//
import Image from './Image';
import Iconify from './Iconify';

// ----------------------------------------------------------------------

SocialsButton.propTypes = {
  initialColor: PropTypes.bool,
  links: PropTypes.objectOf(PropTypes.string),
  simple: PropTypes.bool,
  sx: PropTypes.object,
};

export default function SocialsButton({ initialColor = false, simple = true, links = {}, sx, ...other }) {
  const SOCIALS = [
    {
      name: 'FaceBook',
      icon: 'eva:facebook-fill',
      iconUrl: '/assets/icons/Facebook.png',
      socialColor: '#1877F2',
      path: links.facebook || '#facebook-link',
    },
    {
      name: 'Instagram',
      icon: 'ant-design:instagram-filled',
      iconUrl: '/assets/icons/Instagram.png',
      socialColor: '#E02D69',
      path: links.instagram || '#instagram-link',
    },
    {
      name: 'Linkedin',
      icon: 'eva:linkedin-fill',
      iconUrl: '/assets/icons/Linkedin.png',
      socialColor: '#007EBB',
      path: links.linkedin || '#linkedin-link',
    },
    {
      name: 'Twitter',
      icon: 'eva:twitter-fill',
      iconUrl: '/assets/icons/Twitter.png',
      socialColor: '#00AAEC',
      path: links.twitter || '#twitter-link',
    },
  ];

  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center">
      {SOCIALS.map((social) => {
        const { name, iconUrl,icon, path, socialColor } = social;
        return simple ? (
          <Link key={name} href={path}>
            <Tooltip title={name} placement="top">
              <IconButton
                color="inherit"
                sx={{
                  ...(initialColor && {
                    color: socialColor,
                    '&:hover': {
                      bgcolor: alpha(socialColor, 0.08),
                    },
                  }),
                  ...sx,
                }}
                {...other}
              >
                <Image src={iconUrl} />
              </IconButton>
            </Tooltip>
          </Link>
        ) : (
          <Button
            key={name}
            href={path}
            color="inherit"
            variant="outlined"
            size="small"
            startIcon={<Iconify icon={icon} />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              ...(initialColor && {
                color: socialColor,
                borderColor: socialColor,
                '&:hover': {
                  borderColor: socialColor,
                  bgcolor: alpha(socialColor, 0.08),
                },
              }),
              ...sx,
            }}
            {...other}
          >
            {name}
          </Button>
        );
      })}
    </Stack>
  );
}
