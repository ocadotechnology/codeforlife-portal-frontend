import {
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material"
import { type FC } from "react"
import { Image } from "codeforlife/components"
import { ThemedBox } from "codeforlife/theme"
import { primary } from "codeforlife/theme/colors"

import CflLogoPowered from "../../images/logo_cfl_powered.svg"
import Links from "./Links"
import NewsletterSignUp from "./NewsletterSignUp"
import SocialMediaIcons from "./SocialMediaIcons"
import TenYearAnniversary from "../../images/10_years_anniversary.png"
import { themeOptions } from "../../app/theme"

export interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <ThemedBox
      id="footer"
      userType="teacher"
      options={themeOptions}
      bgcolor={primary[500]}
    >
      <Container>
        <Grid container columnSpacing={10} rowSpacing={5}>
          <Grid xs={12} sm={8}>
            <Stack spacing={5}>
              <Links />
              <NewsletterSignUp />
              <SocialMediaIcons />
            </Stack>
          </Grid>
          <Grid xs={12} sm={4}>
            <Stack
              direction="column"
              width="100%"
              spacing={{ xs: 5, sm: 10 }}
              alignItems={"center"}
            >
              <Image
                alt="Code for Life and Ocado Group logos"
                src={CflLogoPowered}
                href={import.meta.env.VITE_LINK_SKILLS_FOR_THE_FUTURE}
                hrefInNewTab
              />
              <Image
                alt="10 year anniversary"
                src={TenYearAnniversary}
                maxWidth={{ xs: "60%", sm: "85%" }}
              />
            </Stack>
          </Grid>
          <Grid xs={12}>
            <Typography textAlign="center" variant="body2">
              © Ocado Group {new Date().getFullYear()}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </ThemedBox>
  )
}

export default Footer
