import * as page from "codeforlife/components/page"
import { type FC } from "react"

import PythonDen from "./PythonDen"
import RapidRouter from "./RapidRouter"
import Resources from "./Resources"
import TeacherHeroImage from "../../images/home_educate_hero.png"
import TeacherSlides from "./TeacherSlides"

export interface TeacherProps {}

const Teacher: FC<TeacherProps> = () => (
  <page.Page>
    <page.Banner
      imageProps={{
        alt: "Girl using a tablet",
        title: "Girl using a tablet",
        src: TeacherHeroImage,
      }}
      header="Educate"
      subheader="Get ready to teach the next generation of computer scientists"
    />
    <page.Section>
      <TeacherSlides />
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

export default Teacher
