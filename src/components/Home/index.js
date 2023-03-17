
// @mui

// components
import Page from '../Page'
// sections
import {
  HomeAwesomeService,
  HomeOurProduct,
  HomePricingPlans,
  HomeIntroduction,
  HomeOurFeature,
  HomeOurProject,
  HomeInegrateApp,
  HomeOurService,
  HomeDownloadMobile,
  HomeCustomerSupport,
  HomeProjectStory,
  HomeContactUs,
  HomeFreeTrial,
} from './home'

import MainLayout from './layout'

// ----------------------------------------------------------------------

// const ContentStyle = styled('div')(({ theme }) => ({
//   overflow: 'hidden',
//   position: 'relative',
//   backgroundColor: theme.palette.background.default,
// }));

// ----------------------------------------------------------------------

export default function Home() {
  return (
    <MainLayout>
      <Page title="Home" sx={{ backgroundColor: '#fff' }}>
        <HomeIntroduction />

        <HomeAwesomeService />

        <HomeOurProduct />

        <HomeOurFeature />

        <HomeOurProject />

        <HomeInegrateApp />

        <HomeOurService />

        <HomePricingPlans />

        <HomeDownloadMobile />

        <HomeCustomerSupport />

        <HomeProjectStory />

        <HomeContactUs />

        <HomeFreeTrial />
      </Page>
    </MainLayout>
  )
}
