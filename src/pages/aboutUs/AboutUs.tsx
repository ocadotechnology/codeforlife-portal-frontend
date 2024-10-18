import * as page from "codeforlife/components/page"
import { type FC } from "react"

import AboutUsHeroImage from "../../images/AboutUsHeroHexagonImage.png"
import CodeForLife from "./CodeForLife"
import Dedication from "./Dedication"
import OcadoGroup from "./OcadoGroup"
import Quotes from "./Quotes"
import Statistics from "./Statistics"
import Supporters from "./Supporters"

export interface AboutUsProps {}

const AboutUs: FC<AboutUsProps> = () => {
  return (
    <page.Page>
      <page.Banner
        imageProps={{
          alt: "Girl using a tablet",
          title: "Girl using a tablet",
          src: AboutUsHeroImage,
        }}
        header="About Code for Life"
        subheader={
          "Code For Life gives everyone the ability to shape technology's future"
        }
      />
      <page.Section>
        <Statistics />
      </page.Section>
      <page.Section boxProps={{ bgcolor: "info.main" }}>
        <CodeForLife />
      </page.Section>
      <page.Section>
        <OcadoGroup />
      </page.Section>
      <page.Section boxProps={{ bgcolor: "info.main" }}>
        <Quotes />
      </page.Section>
      <page.Section>
        <Supporters />
      </page.Section>
      <page.Section boxProps={{ bgcolor: "info.main" }}>
        <Dedication />
      </page.Section>
    </page.Page>
  )
}

export default AboutUs
