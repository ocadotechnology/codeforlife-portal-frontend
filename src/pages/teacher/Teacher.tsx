import * as page from "codeforlife/components/page"
import { type FC } from "react"

import IntroCarousel from "./TeacherSlides.tsx"
import PythonDen from "./PythonDen.tsx"
import RapidRouter from "./RapidRouter.tsx"
import Resources from "./Resources.tsx"
import TeacherHeroImage from "../../images/home_educate_hero.png"

export interface TeacherProps {}

const Teacher: FC<TeacherProps> = () => {
  return (
    <page.Page>
      <page.Banner
        imageProps={{
          alt: "Girl using a tablet",
          title: "Girl using a tablet",
          src: TeacherHeroImage,
        }}
        header="Educate"
        subheader={
          "Get ready to teach the next generation of computer scientists"
        }
      />
      <page.Section>
        <IntroCarousel />
      </page.Section>
      <page.Section boxProps={{ bgcolor: "info.main" }}>
        <Resources />
      </page.Section>
      <page.Section>
        <RapidRouter />
      </page.Section>
      <page.Section boxProps={{ bgcolor: "info.main" }}>
        <PythonDen />
      </page.Section>
    </page.Page>
  )
}

export default Teacher
