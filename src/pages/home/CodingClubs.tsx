import { Stack, Typography } from "@mui/material"
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"

import { paths } from "../../routes"

export interface CodingClubsProps {}

const CodingClubs: FC<CodingClubsProps> = () => (
  <Stack>
    <Typography variant="h3" textAlign="center">
      Want to run a Code for Life coding club?
    </Typography>
    <Typography>
      Take a look at our two club packs that we have put together using our
      Rapid Router resources. These are fast-paced, session based clubs that can
      be run by anyone keen to help people learn to code. There are guides and
      resource links with printable cerificates for those that complete the
      course.
    </Typography>
    <Stack direction="row" justifyContent="end">
      <LinkButton to={paths.codingClubs._} endIcon={<ChevronRightIcon />}>
        Find out more
      </LinkButton>
    </Stack>
  </Stack>
)

export default CodingClubs
