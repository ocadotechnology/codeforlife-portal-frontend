import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { Typography } from "@mui/material"

import GitBookImage from "../../images/gitbook.png"
import { Introduction } from "../../components"
import { LINK_CFL_DOCS_BECOME_A_CONTRIBUTOR } from "../../app/settings"

export interface HowYouCanContributeProps {}

const HowYouCanContribute: FC<HowYouCanContributeProps> = () => (
  <Introduction
    header="How you can contribute"
    imageProps={{
      alt: "GitBook",
      src: GitBookImage,
      border: "1px solid black",
    }}
    reverse
  >
    <Typography>
      Today, there is a small dedicated team working full time on Code for Life.
      This year, we&apos;re expecting to reach over 100,000 newly registered
      teachers and students. We need your help to do even more.
    </Typography>
    <Typography>
      If contributing to open-source projects to support education in coding and
      technology sounds exciting for you, we&apos;d love to have you on board!
    </Typography>
    <LinkButton
      to={LINK_CFL_DOCS_BECOME_A_CONTRIBUTOR}
      target="_blank"
      endIcon={<ChevronRightIcon />}
      sx={{ ml: "auto" }}
    >
      Read our developer guide
    </LinkButton>
  </Introduction>
)

export default HowYouCanContribute
