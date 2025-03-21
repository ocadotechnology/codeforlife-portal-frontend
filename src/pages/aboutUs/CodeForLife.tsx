import { type FC } from "react"
import { Typography } from "@mui/material"

import AboutUsCFLImage from "../../images/about_us.jpg"
import { Introduction } from "../../components"

export interface CodeForLifeProps {}

const CodeForLife: FC<CodeForLifeProps> = () => {
  return (
    <Introduction
      header="What is Code for Life?"
      imageProps={{
        alt: "Girl looking at Code for Life website",
        src: AboutUsCFLImage,
      }}
    >
      <Typography>
        Code for Life (CFL) is a free, easy-to-use resource that provides
        teaching and lesson plans, user guides and engagement through our fun
        coding games and resources. These games are specially designed for
        people learning computing for the first time.
      </Typography>
      <Typography>
        The aim is to teach new coders the basic principles, to help them thrive
        in an increasingly digital world. CFL is primarily designed for and
        tested by primary school teachers. Our games are aligned with the
        UK&apos;s computing curriculum, so teachers can incorporate CFL into
        their lessons.
      </Typography>
      <Typography mb={0}>
        But anyone looking to get into coding can also do so using the games and
        resources.
      </Typography>
    </Introduction>
  )
}

export default CodeForLife
