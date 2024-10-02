import * as pages from "codeforlife/components/page"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { Send as SendIcon } from "@mui/icons-material"

import AboutRR from "./AboutRR"
import Advanced from "./Advanced"
import Beginner from "./Beginner"
import HomeLearningHeroImage from "../../images/home_learning_hero_hexagon.png"
import Intermediate from "./Intermediate"
import { LINK_IDEAS_BOX } from "../../app/env"
import { paths } from "../../routes"

export interface HomeLearningProps {}

const HomeLearning: FC<HomeLearningProps> = () => {
  return (
    <pages.Page>
      <pages.Banner
        imageProps={{ alt: "homeLearningHero", src: HomeLearningHeroImage }}
        header="Home learning"
        subheader="Whether you're a parent, a caregiver, or a curious student — our Rapid Router game is easy to use and free - forever."
      />
      <pages.Section>
        <AboutRR />
      </pages.Section>
      <Beginner />
      <Intermediate />
      <Advanced />
      <pages.Section className="flex-end-x">
        <LinkButton to={paths.register._}>Register now</LinkButton>
      </pages.Section>
      <pages.Section
        boxProps={{ bgcolor: "tertiary.main" }}
        className="flex-center-x"
        sx={{ paddingY: theme => theme.spacing(2) }}
      >
        <LinkButton endIcon={<SendIcon />} to={LINK_IDEAS_BOX} target="_blank">
          Let us know your feedback
        </LinkButton>
      </pages.Section>
    </pages.Page>
  )
}

export default HomeLearning
