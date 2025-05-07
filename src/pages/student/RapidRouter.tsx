import {
  ChevronRightRounded as ChevronRightRoundedIcon,
  Launch as LaunchIcon,
} from "@mui/icons-material"
import { Link, LinkButton } from "codeforlife/components/router"
import { Typography, useTheme } from "@mui/material"
import { type FC } from "react"
import { Image } from "codeforlife/components"

import {
  LINK_BLOCKLY_GUIDE,
  LINK_RAPID_ROUTER_STUDENT_DEMO,
} from "../../app/settings.ts"
import { Introduction } from "../../components"
import RapidRouterBannerImage from "../../images/rapid_router_banner.png"
import { paths } from "../../routes"

export interface RapidRouterProps {}

const RapidRouter: FC<RapidRouterProps> = () => {
  const theme = useTheme()

  return (
    <>
      <Typography variant="h4" textAlign="center">
        Anyone can code, you can too!
      </Typography>
      <Typography>
        Whether you’re a parent, teacher or a student, our games support and
        guide you, making learning to code great fun. Get started with Rapid
        Router designed for students new to coding. Rapid Router is where you
        will build up your ability.
      </Typography>
      <Image
        alt={"Rapid Router banner"}
        title={"Rapid Router banner"}
        src={RapidRouterBannerImage}
      />
      <Introduction
        header="Starting with Blockly"
        videoProps={{
          src: LINK_RAPID_ROUTER_STUDENT_DEMO,
        }}
      >
        <Typography>
          Starting with Blockly, you can learn to become a coding superhero,
          amaze your friends with your high scores. Create levels for your
          friends and compete for the most coins.
        </Typography>
        <Typography>
          If you are not part of a school, you can{" "}
          <Link to={paths.register._}>register here</Link>.
        </Typography>
        <LinkButton
          sx={{ marginTop: "auto" }}
          to={LINK_BLOCKLY_GUIDE}
          target="_blank"
          endIcon={<LaunchIcon />}
        >
          Learn more about Blockly
        </LinkButton>
        <LinkButton
          sx={{ marginTop: theme.spacing(1.25) }}
          to={paths.rapidRouter._}
          endIcon={<ChevronRightRoundedIcon />}
        >
          Try Rapid Router
        </LinkButton>
      </Introduction>
    </>
  )
}

export default RapidRouter
