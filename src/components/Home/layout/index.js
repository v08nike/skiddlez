// @mui
import { Box, Stack } from '@mui/material'
// components
//
import MainFooter from './MainFooter'
import MainHeader from './MainHeader'

// ----------------------------------------------------------------------

const MainLayout = (props) => (
  <Stack sx={{ minHeight: 1 }}>
    <MainHeader />

    {props.children}

    <Box sx={{ flexGrow: 1 }} />

    <MainFooter />
  </Stack>
)

export default MainLayout;