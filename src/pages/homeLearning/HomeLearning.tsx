import * as pages from "codeforlife/components/page"
import { type FC } from "react"

import AboutRR from "./AboutRR"
import HomeLearningHeroImage from "../../images/home_learning_hero_hexagon.png"

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
    </pages.Page>
  )
}

export default HomeLearning
