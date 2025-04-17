import * as page from "codeforlife/components/page"
import { ChevronRightRounded as ChevronRightRoundedIcon } from "@mui/icons-material"
import { type FC } from "react"
import { Unstable_Grid2 as Grid } from "@mui/material"

import Card from "../../components/Card"
import ClubsImage from "../../images/clubs.png"
import GetInvolvedHeroImage from "../../images/get_involved_hero_hexagon.png"
import GithubImage from "../../images/github.png"
import { LINK_OPPORTUNITIES_WITH_CFL } from "../../app/settings.ts"
import UniversitiesImage from "../../images/universities.png"
import { paths } from "../../routes"

export interface GetInvolvedProps {}

const GetInvolved: FC<GetInvolvedProps> = () => (
  <page.Page>
    <page.Banner
      header="Get involved"
      subheader="How you can get involved with the creation of Code for Life products and resources"
      imageProps={{
        title: "Adult teaching two children",
        alt: "Adult teaching two children",
        src: GetInvolvedHeroImage,
      }}
      button1Props={{
        to: LINK_OPPORTUNITIES_WITH_CFL,
        target: "_blank",
        children: "Opportunities with Code for Life",
        endIcon: <ChevronRightRoundedIcon />,
      }}
    />
    <page.Section>
      <Grid container spacing={4}>
        <Grid xs={12} md={6} lg={4}>
          <Card
            title="Starting a coding club of your own"
            description="Become a Code for Life ambassador by starting up a coding club. Find out more about how you can get involved with this by visiting our coding club page."
            mediaProps={{
              title: "Student showing their work to teacher",
              image: ClubsImage,
            }}
            linkButtonProps={{
              to: paths.codingClubs._,
              children: "Read more",
              endIcon: <ChevronRightRoundedIcon />,
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <Card
            title="Contribute through code"
            description="We welcome volunteers from all backgrounds to help us with our coding adventure. Take a look at our contribution guide to find out how to get involved in our open source projects."
            mediaProps={{
              title: "Github repository page",
              image: GithubImage,
            }}
            linkButtonProps={{
              to: paths.contribute._,
              children: "Read more",
              endIcon: <ChevronRightRoundedIcon />,
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <Card
            title="University partnerships"
            description="Please get in touch at codeforlife@ocado.com if you are interested in working on Code for Life projects with your students including coding, user experience, data analytics and new feature design."
            mediaProps={{
              title: "Three students looking at laptops",
              image: UniversitiesImage,
            }}
            linkButtonProps={{
              to: "mailto:codeforlife@ocado.com",
              target: "_blank",
              children: "Get in touch",
              endIcon: <ChevronRightRoundedIcon />,
            }}
          />
        </Grid>
      </Grid>
    </page.Section>
  </page.Page>
)

export default GetInvolved
