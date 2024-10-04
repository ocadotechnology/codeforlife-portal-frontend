import { Unstable_Grid2 as Grid, Typography } from "@mui/material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { ScrollIntoViewLink } from "codeforlife/components"

import { paths } from "../../routes"

export interface AboutRRProps {}

const AboutRR: FC<AboutRRProps> = () => (
  <Grid container columnSpacing={4}>
    <Grid xs={12}>
      <Typography variant="h4" textAlign="center">
        About Rapid Router
      </Typography>
    </Grid>
    <Grid xs={12} md={6}>
      <Typography>
        Rapid Router is our shopping delivery game that teaches children aged
        5-14 to learn how to code using Blockly. The pupils can then progress to
        Python Den to continue to build up their skills.
      </Typography>
      <Typography>
        The game and lessons support the English National Curriculum Computing
        strand, and teachers across the world love them.
      </Typography>
      <Typography>
        Now, we&apos;ve made lessons available for parents and caregivers to
        teach at home, so we can #KeepKidsCoding. They&apos;re free and easy,
        but most of all, they&apos;re fun!
      </Typography>
    </Grid>
    <Grid xs={12} md={6}>
      <Typography>
        Read our learning guide and start at Level 1, unless your child has
        played before. To start playing, you need to first register as an
        independent student. This will ensure that the level progress is saved.
      </Typography>
      <Typography>
        If you would like to keep updated on our products and receive emails
        about Code for Life, please{" "}
        <ScrollIntoViewLink
          elementId="register-to-newsletter-form"
          options={{ behavior: "smooth" }}
        >
          sign up to our updates
        </ScrollIntoViewLink>
        .
      </Typography>
    </Grid>
    <Grid xs={12} className="flex-end-x">
      <LinkButton to={paths.register._}>Register now</LinkButton>
    </Grid>
  </Grid>
)

export default AboutRR
