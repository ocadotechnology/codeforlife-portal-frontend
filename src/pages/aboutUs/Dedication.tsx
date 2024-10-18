import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { Image } from "codeforlife/components"

import SharonHarrisonImage from "../../images/SharonHarrisonImage.jpg"

export interface DedicationProps {}

const Dedication: FC<DedicationProps> = () => {
  return (
    <>
      <Stack alignItems="center">
        <Typography variant="h4" textAlign="center">
          Dedicated to Sharon Harrison
        </Typography>
        <Image
          alt={"Sharon Harrison"}
          src={SharonHarrisonImage}
          maxWidth="150px"
          marginY={3}
        />
        <Typography variant="h5" textAlign="center">
          1956 — 2015
        </Typography>
        <Stack>
          <Typography fontWeight="bold">
            Sharon was instrumental in helping to create Code for Life. At the
            beginning of 2014 she was recruited to act as our Educational
            Consultant. The project drew on her previous skills as a pioneering
            computing teacher and education consultant.
          </Typography>
          <Typography mb={0}>
            Sharon has left a lasting legacy by creating something which will
            help teach STEM skills to the next generation of computer scientists
            across the world.
          </Typography>
        </Stack>
      </Stack>
    </>
  )
}

export default Dedication
