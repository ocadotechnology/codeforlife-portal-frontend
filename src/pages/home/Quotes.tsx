import { Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material"
import { type FC } from "react"

import { Image, type ImageProps } from "codeforlife/components"
import { Link } from "codeforlife/components/router"

import ReubenPhoto from "../../images/reuben.png"
import RobPhoto from "../../images/rob.png"
import SianPhoto from "../../images/sian.png"
import { paths } from "../../router"

const Column: FC<{
  img: ImageProps
  quote: string
  person: { name: string; title: string }
}> = ({ img, quote, person }) => (
  <Grid xs={12} sm={4}>
    <Stack height="100%">
      <Stack alignItems="center">
        <Image alt={img.alt} src={img.src} maxWidth="350px" />
        <Typography
          fontFamily="SpaceGrotesk"
          fontSize="1.3rem !important"
          fontWeight={500}
        >
          &ldquo;{quote}&rdquo;
        </Typography>
      </Stack>
      <Stack textAlign="end" marginTop="auto">
        <Typography fontWeight="bold" mb={0}>
          — {person.name}
        </Typography>
        <Typography variant="body2" mb={0}>
          {person.title}
        </Typography>
      </Stack>
    </Stack>
  </Grid>
)

export interface QuotesProps {}

const Quotes: FC<QuotesProps> = () => (
  <Grid container columnSpacing={4}>
    <Grid xs={12}>
      <Typography variant="h3" textAlign="center">
        Why you&apos;ll love Code for Life
      </Typography>
    </Grid>
    <Grid xs={12}>
      <Typography textAlign="center">
        Don&apos;t just take our word for it, here are some lovely quotes from
        our fabulous teacher friends.
        <br />
        Interested in getting involved?&nbsp;
        <Link to={paths.getInvolved._}>Get in touch</Link>.
      </Typography>
    </Grid>
    <Column
      img={{ alt: "Reuben", src: ReubenPhoto }}
      quote="My year 10's have been using Rapid Router to develop their Python skills and it has been a great transition into the Python IDE."
      person={{ name: "Reuben", title: "Computer Science teacher" }}
    />
    <Column
      img={{ alt: "Sian", src: SianPhoto }}
      quote="I like the slow build of layers of block coding that allows students to work at their own pace and fully embed their understanding of the different blocks."
      person={{ name: "Sian", title: "Head of ICT" }}
    />
    <Column
      img={{ alt: "Rob", src: RobPhoto }}
      quote="You can hit all of the computing curriculum, in a structured way. It is perfect for teachers who are struggling."
      person={{ name: "Rob", title: "ICT teacher" }}
    />
  </Grid>
)

export default Quotes
