import { Button, Grid, Stack, Typography, useTheme } from "@mui/material"
import { ErrorOutlineOutlined } from "@mui/icons-material"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"
import { generatePath } from "react-router"
import { useNavigate } from "react-router-dom"

import { type RetrieveUserResult } from "../../../api/user"
import { paths } from "../../../routes"
import { useListAuthFactorsQuery } from "../../../api/authFactor"

const Setup2FAForm: FC<{ user: SchoolTeacherUser<RetrieveUserResult> }> = ({
  user,
}) => {
  const navigate = useNavigate()
  const theme = useTheme()
  return (
    <>
      <Button
        onClick={() => {
          navigate(
            generatePath(paths.teacher.dashboard.tab.account.setup2FA._, {
              user: user,
            }),
          )
        }}
        sx={{ marginTop: theme.spacing(3) }}
      >
        Setup two factor authentication
      </Button>
    </>
  )
}

const Edit2FAForm: FC<{ user: SchoolTeacherUser<RetrieveUserResult> }> = ({
  user,
}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  // TODO: Uncomment when implementing 2FA disabling
  // const [disable2fa] = useDisable2faMutation()
  // const { refetch } = useTeacherHas2faQuery(null)
  // const handleDisable2fa: () => void = () => {
  //   disable2fa(null)
  //     .unwrap()
  //     .then(refetch)
  //     .catch(error => {
  //       console.error(error)
  //     })
  // }
  return (
    <Grid container>
      <Grid sm={6} marginTop={theme.spacing(4)}>
        <Typography variant="h6">Backup tokens</Typography>
        {/*TODO: Update text to show the actual number of backup tokens*/}
        <Typography>
          If you don&apos;t have your smartphone or tablet with you, you can
          access your account using backup tokens. You have 0 backup tokens
          remaining.
        </Typography>
        <Typography>View and create backup tokens for your account.</Typography>
        <Button
          className="body"
          onClick={() => {
            navigate(
              generatePath(paths.teacher.dashboard.tab.account.backupTokens._, {
                user: user,
              }),
            )
          }}
          sx={{ marginTop: theme.spacing(3) }}
        >
          Manage backup tokens
        </Button>
        <Typography
          variant="body2"
          fontWeight="bold"
          color="error"
          mb={0}
          sx={{ marginTop: theme.spacing(3) }}
        >
          Note: Please make that you store any login details in a secure place.
        </Typography>
      </Grid>
      <Grid sm={6} marginTop={theme.spacing(4)}>
        <Typography variant="h6">
          Disable two factor authentication (2FA)
        </Typography>
        <Typography>
          We recommend you to continue using 2FA, however you can disable 2FA
          for your account using the button below.
        </Typography>
        <Button
          // TODO: call backend and show confirmation popup
          // onClick={handleDisable2fa}
          className="alert"
          endIcon={<ErrorOutlineOutlined />}
          sx={{ marginTop: theme.spacing(3) }}
        >
          Disable 2FA
        </Button>
      </Grid>
    </Grid>
  )
}

export interface Manage2FAFormProps {
  user: SchoolTeacherUser<RetrieveUserResult>
}

const Manage2FAForm: FC<Manage2FAFormProps> = ({ user }) => {
  const { data: authFactors } = useListAuthFactorsQuery({
    limit: 50,
    offset: 0,
  })

  if (!authFactors || authFactors.count === 0) {
    return (
      <Stack>
        <Setup2FAForm user={user} />
      </Stack>
    )
  }

  for (const authFactor of authFactors.data) {
    console.log(authFactor)
    if (authFactor.user === user && authFactor.type === "otp") {
      return (
        <Stack>
          <Edit2FAForm user={user} />
        </Stack>
      )
    }
  }

  return (
    <Stack>
      <Setup2FAForm user={user} />
    </Stack>
  )
}

export default Manage2FAForm
