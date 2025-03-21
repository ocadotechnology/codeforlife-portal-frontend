import { type FC } from "react"
import { Typography } from "@mui/material"

import { LeftRightSplit } from "../../components"

const Quote: FC<{ children: string }> = ({ children }) => (
  <Typography
    sx={{
      color: theme => theme.palette.primary.main,
      fontSize: "1.3rem !important",
      fontFamily: "SpaceGrotesk",
      lineHeight: "1.8rem",
      fontWeight: "600",
    }}
  >
    “{children}”
  </Typography>
)

export interface QuotesProps {}

const Quotes: FC<QuotesProps> = () => {
  return (
    <>
      <Typography variant="h4" textAlign="center">
        Code for Life and Ocado Group
      </Typography>
      <LeftRightSplit
        left={
          <>
            <Quote>
              We were delighted computing entered the UK curriculum in 2014.
              However, many teachers felt unprepared. And the lack of diversity
              in people studying STEM concerned us. So, we sought to make the
              subject appeal to a broader group of both students and teachers.
            </Quote>
            <Typography mb={0}>
              Anne Marie Neatham, Commercial Director and COO Kindred, Ocado
              Group.
            </Typography>
          </>
        }
        right={
          <>
            <Typography>
              With that in mind, CFL was developed by volunteers and interns
              from Ocado Technology - the technology arm of Ocado Group - and
              teacher Sharon Harrison, who created the Rapid Router learning
              materials. Anne Marie continues:
            </Typography>
            <Quote>
              I&apos;m proud this initiative has been breaking down stereotypes.
              Children are seeing that you don&apos;t have to fit a certain
              gender, race or personality type to get coding.
            </Quote>
            <Typography mb={0}>
              Today, CFL is operated by a small core team and volunteers.
            </Typography>
          </>
        }
      />
    </>
  )
}

export default Quotes
