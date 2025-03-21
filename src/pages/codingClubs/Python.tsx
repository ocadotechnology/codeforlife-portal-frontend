import { Link, LinkButton } from "codeforlife/components/router"
import { Stack, Typography } from "@mui/material"
import { Download as DownloadIcon } from "@mui/icons-material"
import { type FC } from "react"

import {
  LINK_COBRA_SNAKES_CLUB_PACK,
  LINK_GRASS_SNAKES_CLUB_PACK,
  LINK_PYTHON_PACK_GITBOOK,
  LINK_TIGER_SNAKES_CLUB_PACK,
} from "../../app/settings"
import { Introduction } from "../../components"
import PythonClubImage from "../../images/coding_club_python_pack.png"

export interface PythonProps {}

const Python: FC<PythonProps> = () => {
  return (
    <Introduction
      header="Python coding club"
      imageProps={{
        alt: "Adults following Python club on laptops",
        src: PythonClubImage,
      }}
      reverse
    >
      <Typography>
        Download your FREE club packs for students aged 12 and above. These
        packs provide a variety of challenges for different abilities. They are
        aimed at students already interested in learning coding, individuals
        looking to learn and run their own club, or adults wanting to try coding
        out. They are designed to be used in face-to-face or online clubs.
      </Typography>
      <Typography>
        View the resources{" "}
        <Link to={LINK_PYTHON_PACK_GITBOOK} target="_blank">
          online here
        </Link>
        .
      </Typography>
      {/*TODO: Link to GTM for analytics*/}
      <Stack
        direction={{ sm: "row", md: "column", lg: "row" }}
        gap={2}
        marginTop="auto"
      >
        <LinkButton
          to={LINK_GRASS_SNAKES_CLUB_PACK}
          target="_blank"
          endIcon={<DownloadIcon />}
        >
          Lvl 1: Grass Snakes
        </LinkButton>
        <LinkButton
          to={LINK_TIGER_SNAKES_CLUB_PACK}
          target="_blank"
          endIcon={<DownloadIcon />}
        >
          Lvl 2: Tiger Snakes
        </LinkButton>
        <LinkButton
          to={LINK_COBRA_SNAKES_CLUB_PACK}
          target="_blank"
          endIcon={<DownloadIcon />}
        >
          Lvl 3: Cobra Snakes
        </LinkButton>
      </Stack>
    </Introduction>
  )
}

export default Python
