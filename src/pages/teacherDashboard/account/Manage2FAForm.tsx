import React from "react"
import { type SchoolTeacherUser } from "codeforlife/api"

import { type RetrieveUserResult } from "../../../api/user"
import { useNavigate } from "react-router-dom"
import { Button, Grid, Stack, Typography, useTheme } from "@mui/material"
import { ErrorOutlineOutlined } from "@mui/icons-material"
import { paths } from "../../../app/router"
import { useDisable2faMutation, useTeacherHas2faQuery } from "../../../app/api"

const UserDoesNotHave2fa: React.FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  return (
    <>
      <Typography variant="h5">Two factor authentication</Typography>
      <Typography>
        Use your smartphone or tablet to enhance your account&apos;s security by
        using an authenticator app.
      </Typography>
      <Button
        onClick={() => {
          navigate(paths.teacher.dashboard.account.setup2FA._)
        }}
        sx={{ marginTop: theme.spacing(3) }}
      >
        Setup two factor authentication
      </Button>
    </>
  )
}

export interface AccountProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
  view?: "otp"
}

const UserHas2fa: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [disable2fa] = useDisable2faMutation()
  const { refetch } = useTeacherHas2faQuery(null)
  const handleDisable2fa: () => void = () => {
    disable2fa(null)
      .unwrap()
      .then(refetch)
      .catch(error => {
        console.error(error)
      })
  }
  return (
    <Grid container>
      <Grid sm={6} marginTop={theme.spacing(4)}>
        <Typography variant="h6">Backup tokens</Typography>
        <Typography>
          If you don&apos;t have your smartphone or tablet with you, you can
          access your account using backup tokens. You have 0 backup tokens
          remaining.
        </Typography>
        <Typography>View and create backup tokens for your account.</Typography>
        <Button
          className="body"
          onClick={() => {
            navigate(paths.teacher.dashboard.account.backupTokens._)
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
          onClick={handleDisable2fa}
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

const Manage2FAForm: React.FC = () => {
  const { data = { has2fa: false }, isLoading } = useTeacherHas2faQuery(null)
  const { has2fa } = data
  return (
    <Stack>
      {isLoading ? null : has2fa ? <UserHas2fa /> : <UserDoesNotHave2fa />}
    </Stack>
  )
}

export default Manage2FAForm
