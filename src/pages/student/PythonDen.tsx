import { ChevronRightRounded as ChevronRightRoundedIcon } from "@mui/icons-material"
import { type FC } from "react"
import { Image } from "codeforlife/components"
import { LinkButton } from "codeforlife/components/router"
import { Typography } from "@mui/material"

import { Introduction } from "../../components"
import PythonDenBannerImage from "../../images/python_den_banner.svg"
import PythonDenImage from "../../images/python_den.png"
import { paths } from "../../routes"

export interface OcadoGroupProps {}

const PythonDen: FC<OcadoGroupProps> = () => (
  <>
    <Image
      alt={"Python Den banner"}
      title={"Python Den banner"}
      src={PythonDenBannerImage}
    />
    <Introduction
      header="Python programming"
      imageProps={{
        alt: "Pythen Den logo and characters",
        title: "Pythen Den logo and characters",
        src: PythonDenImage,
      }}
      reverse
    >
      <Typography>
        The Python Den is an exploration of Python programming through a
        comprehensive course with free lesson plans, videos and worksheets to
        support you in your learning.
      </Typography>
      <Typography>
        From foundational syntax to advanced concepts like loops and data
        manipulation, each session is a new challenge.
      </Typography>
      <Typography>
        We aim to provide a tried-and-tested, structured set of lessons that you
        can use at home or in class, no matter your own level of experience.
      </Typography>
      <LinkButton
        sx={{ marginTop: "auto" }}
        to={paths.pythonDen._}
        endIcon={<ChevronRightRoundedIcon />}
      >
        Try Python Den
      </LinkButton>
    </Introduction>
  </>
)

export default PythonDen
