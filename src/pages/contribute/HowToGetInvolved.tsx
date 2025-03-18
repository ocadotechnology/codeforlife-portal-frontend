import { Stack, Typography } from "@mui/material"
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"

export interface HowToGetInvolvedProps {}

const HowToGetInvolved: FC<HowToGetInvolvedProps> = () => (
  <>
    <Typography align="center" variant="h4">
      How to get involved and gain experience
    </Typography>
    <Stack direction={{ sm: "row" }} gap={{ sm: 4 }}>
      <Stack width={{ sm: "50vw" }}>
        <Typography>
          Code for Life would not have been possible without the dedication of
          our volunteers.
        </Typography>
        <Typography>
          In 2014, computing was added to the UK curriculum, requiring schools
          to teach coding principles and programming foundations.
        </Typography>
      </Stack>
      <Stack width={{ sm: "50vw" }}>
        <Typography>
          Recognising a need to support teachers and students in navigating the
          uncharted territory, Ocado Technology deployed an army of internal
          volunteers who worked after hours, fuelled by free pizzas and fizzy
          drinks.
        </Typography>
        <Typography>
          What came out of this, is what you see today, used by educators and
          learners from over 150 countries. Our products are open-source and
          free forever.
        </Typography>
      </Stack>
    </Stack>
    <Stack alignItems="end">
      <LinkButton
        to="https://docs.codeforlife.education/"
        target="_blank"
        endIcon={<ChevronRightIcon />}
      >
        Read our developer guide
      </LinkButton>
    </Stack>
  </>
)

export default HowToGetInvolved
