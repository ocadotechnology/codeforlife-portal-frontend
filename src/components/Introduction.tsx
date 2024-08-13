import type { FC, ReactNode } from "react"
import {
  Unstable_Grid2 as Grid,
  type GridDirection,
  Stack,
  Typography,
} from "@mui/material"
import { Image } from "codeforlife/components"
import type { ResponsiveStyleValue } from "@mui/system"

export interface IntroductionProps {
  header: string
  img: { desc: string; src: string }
  children: ReactNode
  direction?: ResponsiveStyleValue<GridDirection>
}

const Introduction: FC<IntroductionProps> = ({
  header,
  img,
  children,
  direction = "row",
}) => {
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
          <Image alt={img.desc} title={img.desc} src={img.src} />
        </Grid>
      </Grid>
    </>
  )
}

export default Introduction
