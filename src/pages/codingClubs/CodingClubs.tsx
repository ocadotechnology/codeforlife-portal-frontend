import * as page from "codeforlife/components/page"
import { type FC } from "react"
import { useTheme } from "@mui/material"

import ClubAim from "./ClubAim"
import CodeClubHeroImage from "../../images/CodingClubHeroHexagonImage.png"
import Primary from "./Primary"
import Python from "./Python"

export interface CodingClubProps {}

const CodingClubs: FC<CodingClubProps> = () => {
  const theme = useTheme()

  return (
    <page.Page>
      <page.Banner
        imageProps={{ alt: "codeClubHero", src: CodeClubHeroImage }}
        header="Coding clubs"
        subheader="A FREE set of slides and guides to run your own coding clubs"
      />
      <page.Section>
        <ClubAim />
      </page.Section>
      <page.Section boxProps={{ bgcolor: theme.palette.info.main }}>
        <Primary />
      </page.Section>
      <page.Section>
        <Python />
      </page.Section>
    </page.Page>
  )
}

export default CodingClubs
