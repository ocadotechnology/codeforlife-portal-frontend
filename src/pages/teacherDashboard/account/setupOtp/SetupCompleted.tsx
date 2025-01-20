import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { Typography } from "@mui/material"

import { paths } from "../../../../routes"

export interface SetupCompletedProps {}

const SetupCompleted: FC<SetupCompletedProps> = () => {
  return (
    <>
      <Typography align="center" variant="h4" marginBottom={5}>
        Two-factor authentication setup complete
      </Typography>
      <Typography>You have successfully set up 2FA. 🎉</Typography>
      <Typography>
        You will now need to use your code generator the next time you log in.
      </Typography>
      <LinkButton
        to={paths.teacher.dashboard.tab.account._}
        sx={{ marginTop: 3 }}
      >
        OK
      </LinkButton>
    </>
  )
}

export default SetupCompleted
