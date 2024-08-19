import { Unstable_Grid2 as Grid, Link as MuiLink, Stack } from "@mui/material"
// import {
//   useFreshworksWidget,
//   useOneTrustInfoToggle
// } from 'codeforlife/hooks';
import { type FC } from "react"
import { Link } from "codeforlife/components/router"

import { paths } from "../../routes"

const FooterLink: FC<{
  href: string
  text: string
  external?: boolean
}> = ({ href, text, external }) => {
  return (
    <Link
      to={href}
      target={external ? "_blank" : "_self"}
      sx={{
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      {text}
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
          <FooterLink href={paths.aboutUs._} text={"About us"} />
          {/*TODO: Use Freshdesk hook*/}
          <MuiLink
            sx={{
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Help and support
          </MuiLink>
          <FooterLink
            href={import.meta.env.VITE_LINK_IMPACT_REPORT_2023}
            text={"Impact Report 2023"}
            external={true}
          />
        </Stack>
      </Grid>
      <Grid xs={12} sm={4}>
        <Stack spacing={1}>
          <FooterLink href={paths.privacyNotice._} text={"Privacy notice"} />
          <FooterLink href={paths.termsOfUse._} text={"Terms of use"} />
          {/*TODO: Use OneTrust banner hook*/}
          <MuiLink
            sx={{
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Cookie settings
          </MuiLink>
        </Stack>
      </Grid>
      <Grid xs={12} sm={4}>
        <Stack spacing={1}>
          <FooterLink href={paths.homeLearning._} text={"Home learning"} />
          <FooterLink href={paths.getInvolved._} text={"Get involved"} />
          <FooterLink href={paths.codingClubs._} text={"Coding clubs"} />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Links
