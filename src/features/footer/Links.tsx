import {
  Unstable_Grid2 as Grid,
  Link as MuiLink,
  Stack,
  type SxProps,
} from "@mui/material"
// import {
//   useFreshworksWidget,
//   useOneTrustInfoToggle
// } from 'codeforlife/hooks';
import { type FC } from "react"
import { Link } from "codeforlife/components/router"

import {
  LINK_IMPACT_REPORT_2023,
  LINK_IMPACT_REPORT_2024,
  LINK_OPPORTUNITIES_WITH_CFL,
} from "../../app/settings"
import { paths } from "../../routes"

const LINK_STYLE: SxProps = {
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}

const FooterLink: FC<{
  to: string
  children: string
  newTab?: boolean
}> = ({ to, children, newTab }) => {
  return (
    <Link to={to} target={newTab ? "_blank" : "_self"} sx={LINK_STYLE}>
      {children}
    </Link>
  )
}

export interface LinksProps {}

const Links: FC<LinksProps> = () => {
  return (
    <Grid
      container
      spacing={1}
      sx={{
        color: "white !important",
        fontWeight: "bold",
      }}
    >
      <Grid xs={12} sm={4}>
        <Stack spacing={1}>
          <FooterLink to={paths.aboutUs._}>About us</FooterLink>
          {/*TODO: Use Freshdesk hook*/}
          <MuiLink sx={LINK_STYLE}>Help and support</MuiLink>
          <FooterLink to={LINK_IMPACT_REPORT_2023} newTab>
            Impact Report 2023
          </FooterLink>
          <FooterLink to={LINK_IMPACT_REPORT_2024} newTab>
            Impact Report 2024
          </FooterLink>
        </Stack>
      </Grid>
      <Grid xs={12} sm={4}>
        <Stack spacing={1}>
          <FooterLink to={paths.privacyNotice.tab.privacyNotice._}>
            Privacy notice
          </FooterLink>
          <FooterLink to={paths.termsOfUse.tab.termsOfUse._}>
            Terms of use
          </FooterLink>
          {/*TODO: Use OneTrust banner hook*/}
          <MuiLink sx={LINK_STYLE}>Cookie settings</MuiLink>
        </Stack>
      </Grid>
      <Grid xs={12} sm={4}>
        <Stack spacing={1}>
          <FooterLink to={paths.homeLearning._}>Home learning</FooterLink>
          <FooterLink to={paths.getInvolved._}>Get involved</FooterLink>
          <FooterLink to={paths.codingClubs._}>Coding clubs</FooterLink>
          <FooterLink to={LINK_OPPORTUNITIES_WITH_CFL} newTab>
            Opportunities with CFL
          </FooterLink>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Links
