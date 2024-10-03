import * as pages from "codeforlife/components/page"
import {
  Box,
  Unstable_Grid2 as Grid,
  type Grid2Props,
  Typography,
} from "@mui/material"
import { type FC } from "react"
import { OpenInNew as OpenInNewIcon } from "@mui/icons-material"

import { Card, type CardProps } from "../../components"

export interface LevelsProps extends Pick<Grid2Props, "direction"> {
  banner: {
    difficulty: string
    color: string
    bgcolor: string
  }
  cardProps: CardProps<"to">
  text: {
    levels: string
    sessions: Array<{
      ids: number[] | string
      body: string
    }>
  }
}

const Levels: FC<LevelsProps> = ({ direction, banner, cardProps, text }) => {
  return (
    <>
      <pages.Section
        sx={{ paddingY: theme => theme.spacing(2) }}
        boxProps={{ bgcolor: banner.bgcolor }}
      >
        <Typography variant="h4" color={banner.color} mb={0}>
          &lt; {banner.difficulty} &gt;
        </Typography>
      </pages.Section>
      <pages.Section>
        <Grid
          container
          rowSpacing={{ xs: 2, md: 0 }}
          columnSpacing={{ xs: 0, md: 4 }}
          direction={direction}
        >
          <Grid xs={12} md={4}>
            <Card
              {...cardProps}
              style={{
                ...cardProps.style,
                minHeight: "auto",
              }}
              linkButtonProps={{
                children: "Go to lessons",
                endIcon: <OpenInNewIcon />,
                target: "_blank",
                ...cardProps.linkButtonProps,
              }}
            />
          </Grid>
          <Grid xs={12} md={8}>
            <Typography variant="h5">Levels {text.levels}</Typography>
            {text.sessions.map((session, index) => (
              <Box key={`session-${index}`}>
                <Typography variant="h6">
                  {typeof session.ids === "string"
                    ? session.ids
                    : "Session " + session.ids.join(" & ")}
                </Typography>
                <Typography
                  mb={index === text.sessions.length - 1 ? 0 : undefined}
                >
                  {session.body}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      </pages.Section>
    </>
  )
}

export default Levels
