import { type AuthFactor, type User } from "codeforlife/api"
import { Button, Grid, Typography } from "@mui/material"
import { ErrorOutlineOutlined } from "@mui/icons-material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { handleResultState } from "codeforlife/utils/api"

import {
  useDestroyAuthFactorMutation,
  useListAuthFactorsQuery,
} from "../../../api/authFactor"
import { paths } from "../../../routes"

const OtpExists: FC<{ authFactorId: AuthFactor["id"] }> = ({
  authFactorId,
}) => {
  const [destroyAuthFactor] = useDestroyAuthFactorMutation()

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
          to={paths.teacher.dashboard.tab.account.otp.bypassTokens._}
          sx={{ marginTop: 4 }}
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
          onClick={() => {
            destroyAuthFactor(authFactorId)
              .unwrap()
              .then(() => {
                // TODO: show confirmation popup
              })
              .catch(() => {
                // TODO: show error message
              })
          }}
          className="alert"
          endIcon={<ErrorOutlineOutlined />}
          sx={{ marginTop: 3 }}
        >
          Disable 2FA
        </Button>
      </Grid>
    </Grid>
  )
}

export interface OtpProps {
  authUserId: User["id"]
}

const Otp: FC<OtpProps> = ({ authUserId }) => (
  <>
    <Typography variant="h5">Two factor authentication</Typography>
    <Typography>
      Use your smartphone or tablet to enhance your account&apos;s security by
      using an authenticator app.
    </Typography>
    {handleResultState(
      useListAuthFactorsQuery({
        offset: 0,
        limit: 1,
        user: authUserId,
        type: "otp",
      }),
      ({ count, data: authFactors }) =>
        count ? (
          <OtpExists authFactorId={authFactors[0].id} />
        ) : (
          <LinkButton
            to={paths.teacher.dashboard.tab.account.otp.setup._}
            sx={{ marginTop: 3 }}
          >
            Setup two factor authentication
          </LinkButton>
        ),
    )}
  </>
)

export default Otp
