// components
import Iconify from '../../Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Product',
    path: '#product',
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
  },
  {
    title: 'Solution',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: "#",
  },
  {
    title: 'Features',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: "#features",
  },
  {
    title: 'Contact Sales',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: "#",
  },

];

export default menuConfig;
