import { ChevronRightRounded as ChevronRightRoundedIcon } from "@mui/icons-material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { Typography } from "@mui/material"

import { Introduction } from "../../components"
import { LINK_PYTHON_DEN_DEMO } from "../../app/settings.ts"
import { paths } from "../../routes"

export interface PythonDenProps {}

const PythonDen: FC<PythonDenProps> = () => {
  return (
    <Introduction
      header="Python programming"
      videoProps={{
        src: LINK_PYTHON_DEN_DEMO,
      }}
    >
      <Typography>
        The Python Den is an exploration of Python programming through a
        comprehensive course with free lesson plans, videos and worksheets to
        support you in teaching Python programming to your students. From
        foundational syntax to advanced concepts like loops and data
        manipulation, each session is tailored to engage young learners.
      </Typography>
      <Typography>
        We aim to provide a tried-and-tested, structured set of lessons that you
        can use in your classroom, no matter your own level of experience.
      </Typography>
      <LinkButton
        sx={{ marginTop: "auto" }}
        to={paths.pythonDen._}
        endIcon={<ChevronRightRoundedIcon />}
      >
        Try out Python Den
      </LinkButton>
    </Introduction>
  )
}

export default PythonDen
