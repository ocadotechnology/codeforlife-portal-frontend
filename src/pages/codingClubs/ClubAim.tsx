import { Stack, Typography } from "@mui/material"
import { type FC } from "react"

export interface ClubAimProps {}

const ClubAim: FC<ClubAimProps> = () => {
  return (
    <>
      <Stack>
        <Typography variant="h4" textAlign="center">
          Who are the club packs aimed at?
        </Typography>
        <Typography>
          The FREE resource packs are aimed at two different groups, the first
          is aimed at students ages between 7-11yrs with an interest in learning
          Python. The second pack is aimed at students 12yrs and up, including
          adults. This moves at a much faster pace and also introduces students
          to setting up an environment on their own computer.
        </Typography>
        <Typography mb={0}>
          Both packs are a condensed learning pathway using our game Rapid
          Router alongside suggested session plan and slides.
        </Typography>
      </Stack>
    </>
  )
}

export default ClubAim
