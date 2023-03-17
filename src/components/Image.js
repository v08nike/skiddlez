import PropTypes from 'prop-types'
// @mui
import { Box } from '@mui/material'

// ----------------------------------------------------------------------

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  sx: PropTypes.object,
}

export default function Image({ src, sx, alt }) {
  return (
    <Box
      component="span"
      sx={{
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden',
        '& .wrapper': {
          width: 1,
          height: 1,
          backgroundSize: 'cover !important',
        },
        ...sx,
      }}
    >
      <img src={src} alt={alt} />
    </Box>
  )
}

// ----------------------------------------------------------------------