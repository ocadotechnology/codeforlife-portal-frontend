import { Button, Stack, Typography } from "@mui/material"
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { type FC } from "react"
import { Image } from "codeforlife/components"

// import { useRetrieveUserQuery } from "../../api/rapidRouter"
import RRLogoImage from "../../images/RR_logo.svg"
import { paths } from "../../router"

const GetRapidRouterScores: React.FC = () => {
  // TODO: get real data from rapid-router endpoint.
  // useRetrieveUserQuery()
  const stats = {
    completed_level_count: 0,
    top_score_count: 0,
    total_score: 0,
    total_available_score: 0,
  }

  return (
    <>
      <Typography variant="h4">
        You have completed {stats.completed_level_count} Rapid Router levels!
      </Typography>
      <Typography variant="h4">
        You have {stats.top_score_count} top scores!
      </Typography>
      <Typography variant="h4">
        You have a score of {stats.total_score}. There are{" "}
        {stats.total_available_score} available points.
      </Typography>
    </>
  )
}

export interface RapidRouterProgressProps {}

const RapidRouterProgress: FC<RapidRouterProgressProps> = () => {
  return (
    <Stack alignItems="center" textAlign="center">
      <Image alt={"RR_logo"} src={RRLogoImage} maxWidth="200px" />
      <GetRapidRouterScores />
      <Button
        style={{ marginTop: 20 }}
        endIcon={<ChevronRightIcon />}
        href={paths.rapidRouter._}
      >
        Check scoreboard
      </Button>
    </Stack>
  )
}

export default RapidRouterProgress
