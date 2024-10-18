import * as page from "codeforlife/components/page"
import { ChevronRightRounded as ChevronRightRoundedIcon } from "@mui/icons-material"
import { type FC } from "react"
import { Unstable_Grid2 as Grid } from "@mui/material"

import Card from "../../components/Card"
import ClubsImg from "../../images/ClubsImage.png"
import GetInvolvedHero from "../../images/GetInvolvedHeroHexagonImage.png"
import GithubImg from "../../images/GithubImage.png"
import UniversitiesImg from "../../images/UniversitiesImage.png"
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
        src: GetInvolvedHero,
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
              image: ClubsImg,
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
            mediaProps={{ title: "Github repository page", image: GithubImg }}
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
              image: UniversitiesImg,
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
