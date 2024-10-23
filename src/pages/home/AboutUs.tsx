import { Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material"
import { Link, LinkButton } from "codeforlife/components/router"
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { type FC } from "react"
import { Image } from "codeforlife/components"

import ControllerIconImage from "../../images/icon_controller.png"
import FreeIconImage from "../../images/icon_free.png"
import GlobeIconImage from "../../images/icon_globe.png"
import { LINK_FEMALE_GRADUATES_IN_CS } from "../../app/settings"
import PieChartIconImage from "../../images/icon_piechart.png"
import { paths } from "../../routes"

const Column: FC<{
  img: { alt: string; src: string }
  children: React.ReactNode
}> = ({ img, children }) => (
  <Grid xs={12} sm={6} md={3}>
    <Stack alignItems="center">
      <Image alt={img.alt} src={img.src} maxWidth="200px" />
      {children}
    </Stack>
  </Grid>
)

export interface AboutUsProps {}

const AboutUs: FC<AboutUsProps> = () => (
  <Grid container columnSpacing={2}>
    <Grid xs={12}>
      <Typography variant="h4" textAlign="center">
        Giving everyone the ability to shape technology&apos;s future
      </Typography>
    </Grid>
    <Column img={{ alt: "pie chart", src: PieChartIconImage }}>
      <Typography textAlign="center">
        Just 16% of university computer science graduates (2018/19) in the UK
        were women
        <Link to={LINK_FEMALE_GRADUATES_IN_CS} target="_blank">
          *
        </Link>
        , we want to change that.
      </Typography>
    </Column>
    <Column img={{ alt: "game controller", src: ControllerIconImage }}>
      <Typography textAlign="center">
        Gamification helps children learn whilst having fun!
      </Typography>
    </Column>
    <Column img={{ alt: "free ticket", src: FreeIconImage }}>
      <Typography textAlign="center">
        That&apos;s right, free forever: our gift to you! We&apos;re also Open
        Source.
      </Typography>
    </Column>
    <Column img={{ alt: "earth", src: GlobeIconImage }}>
      <Typography textAlign="center">
        Code for Life has over 660,000 registered users across the world.
      </Typography>
    </Column>
    <Grid xs={12} display="flex" justifyContent="end">
      <LinkButton to={paths.aboutUs._} endIcon={<ChevronRightIcon />}>
        About us
      </LinkButton>
    </Grid>
  </Grid>
)

export default AboutUs
