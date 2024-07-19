import * as page from "codeforlife/components/page"
import { Link, LinkButton } from "codeforlife/components/router"
import { Typography, useTheme } from "@mui/material"
import { Download as DownloadIcon } from "@mui/icons-material"
import { type FC } from "react"

import AboutUsImage from "../../images/about_us.jpg"
import ClubAim from "./ClubAim"
import CodeClubHeroImage from "../../images/coding_club_hero_hexagon.png"
import Introduction from "../../components/Introduction"
import PythonClubImage from "../../images/coding_club_python_pack.png"

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
        <Introduction
          header="Primary coding club"
          img={{ alt: "aboutUs", src: AboutUsImage }}
        >
          <Typography>
            Download your FREE coding club pack for students aged 7-11. This
            pack introduces students to the first principles of Python at a
            faster pace than the regular lesson plans. It is aimed at students
            already interested in learning coding and can be used in clubs, at
            home or in school, on or offline.
          </Typography>
          <Typography>
            View the resources{" "}
            <Link
              to="https://code-for-life.gitbook.io/teaching-resources/v/code-club-resources-primary"
              target="_blank"
            >
              online here
            </Link>
            .
          </Typography>
          {/*TODO: Link to GTM for analytics*/}
          <LinkButton
            sx={{ marginTop: "auto" }}
            to="https://storage.googleapis.com/codeforlife-assets/club_packs/PrimaryCodingClub.zip"
            target="_blank"
            endIcon={<DownloadIcon />}
          >
            Download the Primary coding club pack
          </LinkButton>
        </Introduction>
      </page.Section>
      <page.Section>
        <Introduction
          header="Python coding club"
          img={{ alt: "pythonCodingClub", src: PythonClubImage }}
          direction="row-reverse"
        >
          <Typography>
            Download your FREE coding club pack for students aged 12 and above.
            This pack is a fast paced introduction to Python. It is aimed at
            students already interested in learning coding, individuals looking
            to learn and run their own club, or adults wanting to try coding
            out. It is designed to be used in face-to-face or online clubs.
          </Typography>
          <Typography>
            View the resources{" "}
            <Link
              to="https://code-for-life.gitbook.io/teaching-resources/v/rapid-introduction-to-python-code-club"
              target="_blank"
            >
              online here
            </Link>
            .
          </Typography>
          {/*TODO: Link to GTM for analytics*/}
          <LinkButton
            sx={{ marginTop: "auto" }}
            to="https://storage.googleapis.com/codeforlife-assets/club_packs/PythonCodingClub.zip"
            target="_blank"
            endIcon={<DownloadIcon />}
          >
            Download the Python coding club pack
          </LinkButton>
        </Introduction>
      </page.Section>
    </page.Page>
  )
}

export default CodingClubs
