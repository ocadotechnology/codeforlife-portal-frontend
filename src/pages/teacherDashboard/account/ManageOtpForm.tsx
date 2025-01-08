import { Button, Grid, Typography } from "@mui/material"
import { ErrorOutlineOutlined } from "@mui/icons-material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { type SchoolTeacherUser } from "codeforlife/api"
import { generatePath } from "react-router"

import { type RetrieveUserResult } from "../../../api/user"
import { paths } from "../../../routes"
import { useListAuthFactorsQuery } from "../../../api/authFactor"

const SetupOtpForm: FC<{ authUser: SchoolTeacherUser<RetrieveUserResult> }> = ({
  authUser,
}) => {
  return (
    <>
      <LinkButton
        to={
          generatePath(paths.teacher.dashboard.tab.account.setup2FA._, {
            authUser: authUser,
          })
        }
        mt={3}
      >
        Setup two factor authentication
      </LinkButton>
    </>
  )
}

const EditOtpForm: FC<{ authUser: SchoolTeacherUser<RetrieveUserResult> }> = ({
  authUser,
}) => {
  // TODO: Uncomment when implementing Otp disabling
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
      <Grid sm={6} mt={4}>
        <Typography variant="h6">Backup tokens</Typography>
        {/*TODO: Update text to show the actual number of backup tokens*/}
        <Typography>
          If you don&apos;t have your smartphone or tablet with you, you can
          access your account using backup tokens. You have 0 backup tokens
          remaining.
        </Typography>
        <Typography>View and create backup tokens for your account.</Typography>
        <LinkButton
          className="body"
          to={
            generatePath(paths.teacher.dashboard.tab.account.backupTokens._, {
              authUser: authUser,
            })
          }
          mt={4}
        >
          Manage backup tokens
        </LinkButton>
        <Typography
          variant="body2"
          fontWeight="bold"
          color="error"
          mb={0}
          mt={3}
        >
          Note: Please make that you store any login details in a secure place.
        </Typography>
      </Grid>
      <Grid sm={6} mt={4}>
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
          mt={3}
        >
          Disable 2FA
        </Button>
      </Grid>
    </Grid>
  )
}

export interface ManageOtpFormProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
}

const ManageOtpForm: FC<ManageOtpFormProps> = ({ authUser }) => {
  const { data: authFactors } = useListAuthFactorsQuery({
    limit: 50,
    offset: 0,
  })

  if (!authFactors || authFactors.count === 0) {
    return (
      <>
        <SetupOtpForm authUser={authUser} />
      </>
    )
  }

  authFactors.data.forEach(authFactor => {
    if (authFactor.user === authUser && authFactor.type === "otp") {
      return (
        <>
          <EditOtpForm authUser={authUser} />
        </>
      )
    }
  })

  return (
    <>
      <SetupOtpForm authUser={authUser} />
    </>
  )
}

export default ManageOtpForm
