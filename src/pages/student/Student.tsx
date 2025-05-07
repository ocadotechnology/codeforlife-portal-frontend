import * as page from "codeforlife/components/page"
import { type FC } from "react"

import Characters from "./Characters.tsx"
import { ChevronRightRounded as ChevronRightRoundedIcon } from "@mui/icons-material"
import PlayHeroImage from "../../images/home_play_hero.png"
import PythonDen from "./PythonDen.tsx"
import RapidRouter from "./RapidRouter.tsx"
import { paths } from "../../routes"

export interface StudentProps {}

const Student: FC<StudentProps> = () => (
  <page.Page>
    <page.Banner
      imageProps={{
        alt: "Boy using a tablet",
        title: "Boy using a tablet",
        src: PlayHeroImage,
      }}
      header="Play"
      subheader="Anyone can learn how to code. We will help you learn how. It’s fun, free and easy."
      button1Props={{
        to: paths.rapidRouter._,
        children: "Try Rapid Router",
        endIcon: <ChevronRightRoundedIcon />,
      }}
      button2Props={{
        to: paths.pythonDen._,
        children: "Try Python Den",
        endIcon: <ChevronRightRoundedIcon />,
      }}
    />
    <page.Section>
      <RapidRouter />
    </page.Section>
    <page.Section boxProps={{ bgcolor: "info.main" }}>
      <Characters />
    </page.Section>
    <page.Section>
      <PythonDen />
    </page.Section>
  </page.Page>
)

export default Student
