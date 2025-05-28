import { ChevronRightRounded as ChevronRightRoundedIcon } from "@mui/icons-material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { Typography } from "@mui/material"

import { Introduction } from "../../components"
import { LINK_TEACHING_RESOURCES_DEMO } from "../../app/settings"
import { paths } from "../../routes"

export interface ResourcesProps {}

const Resources: FC<ResourcesProps> = () => (
  <Introduction
    header="Resources and progress tracking"
    videoProps={{
      src: LINK_TEACHING_RESOURCES_DEMO,
    }}
  >
    <Typography>
      Once you&apos;ve registered your personal details and logged in,
      you&apos;ll be able to create your school or club, or join other teachers
      at your institution.
    </Typography>
    <Typography>
      You can sign up your class, download free teaching packs, including
      sessions plans, pupil resources and assessment tools and track
      pupils&apos; progress. There are even videos to help you and your class
      understand what you&apos;ll be learning next.
    </Typography>
    <LinkButton
      sx={{ marginTop: "auto" }}
      to={paths.register._}
      endIcon={<ChevronRightRoundedIcon />}
    >
      Register now
    </LinkButton>
  </Introduction>
)

export default Resources
