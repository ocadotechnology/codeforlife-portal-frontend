import type { FC, ReactNode } from "react"
import {
  type GridDirection,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material"
import type { ResponsiveStyleValue } from "@mui/system"

import { Image } from "codeforlife/components"

const Introduction: FC<{
  header: string
  img: { alt: string; src: string }
  children: ReactNode
  direction?: ResponsiveStyleValue<GridDirection>
}> = ({ header, img, children, direction = "row" }) => {
  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, lg: 3 }}
        display="flex"
        direction={direction}
      >
        <Grid xs={12} md={6}>
          <Stack sx={{ height: "100%" }}>
            <Typography variant="h5">{header}</Typography>
            {children}
          </Stack>
        </Grid>
        <Grid xs={12} md={6} className="flex-center">
          <Image alt={img.alt} src={img.src} />
        </Grid>
      </Grid>
    </>
  )
}

export default Introduction
