import { Link, LinkButton } from "codeforlife/components/router"
import { ChevronRightRounded as ChevronRightRoundedIcon } from "@mui/icons-material"
import { type FC } from "react"
import { Typography } from "@mui/material"

import {
  LINK_ENGLISH_CURRICULUM,
  LINK_RAPID_ROUTER_TEACHER_DEMO,
  LINK_SCOTTISH_CURRICULUM,
} from "../../app/settings"
import { Introduction } from "../../components"
import { paths } from "../../routes"

export interface RapidRouterProps {}

const RapidRouter: FC<RapidRouterProps> = () => {
  return (
    <Introduction
      header="RapidRouter"
      videoProps={{
        src: { LINK_RAPID_ROUTER_TEACHER_DEMO },
      }}
      reverse
    >
      <Typography>
        Rapid Router is a fun and engaging education resource that helps teach
        the first principles of computer programming covered in the UK Computing
        curriculum.
      </Typography>
      <Typography>
        Built on &rsquo;Blockly&lsquo;, an easy-to-use visual programming
        language, Rapid Router enables teachers to monitor and manage individual
        pupil progress and identify where more support is required.
      </Typography>
      <Typography>
        See how Rapid Router fits into{" "}
        <Link to={LINK_ENGLISH_CURRICULUM} target="_blank">
          the English national curriculum — the computer science strand
        </Link>{" "}
        and{" "}
        <Link to={LINK_SCOTTISH_CURRICULUM} target="_blank">
          the Scottish curriculum
        </Link>
        .
      </Typography>
      <LinkButton
        sx={{ marginTop: "auto" }}
        to={paths.rapidRouter._}
        endIcon={<ChevronRightRoundedIcon />}
      >
        Try out Rapid Router
      </LinkButton>
    </Introduction>
  )
}

export default RapidRouter
