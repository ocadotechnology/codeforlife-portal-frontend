import { type AuthFactor, type User } from "codeforlife/api"
import { Button, Grid, Typography } from "@mui/material"
import { ErrorOutlineOutlined } from "@mui/icons-material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { handleResultState } from "codeforlife/utils/api"
import { useNavigate } from "codeforlife/hooks"

import {
  useDestroyAuthFactorMutation,
  useListAuthFactorsQuery,
} from "../../../api/authFactor"
import { paths } from "../../../routes"
import { useListOtpBypassTokensQuery } from "../../../api/otpBypassToken"

const OtpExists: FC<{ authFactorId: AuthFactor["id"] }> = ({
  authFactorId,
}) => {
  const [destroyAuthFactor] = useDestroyAuthFactorMutation()
  const navigate = useNavigate()

  return (
    <Grid container>
      <Grid size={{ sm: 6 }} mt={4}>
        {/* TODO: rename number of "backup tokens" to "bypass tokens". */}
        <Typography variant="h6">Backup tokens</Typography>
        <Typography>
          If you don&apos;t have your smartphone or tablet with you, you can
          access your account using backup tokens.
        </Typography>
        {handleResultState(
          useListOtpBypassTokensQuery({ offset: 0, limit: 0 }),
          ({ count }) => (
            <Typography variant="body2">
              You have {count} backup tokens remaining.
            </Typography>
          ),
          {
            loading: (
              <Typography variant="body2">
                Counting remaining backup tokens...
              </Typography>
            ),
            error: (
              <Typography variant="body2" color="error.main">
                Failed to count remaining backup tokens.
              </Typography>
            ),
          },
        )}
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
      <Grid size={{ sm: 6 }} mt={4}>
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
                navigate(".", {
                  replace: true,
                  state: {
                    notifications: [
                      { props: { children: "Successfully disabled OTP." } },
                    ],
                  },
                })
              })
              .catch(() => {
                navigate(".", {
                  replace: true,
                  state: {
                    notifications: [
                      {
                        props: {
                          error: true,
                          children: "Failed to disable OTP.",
                        },
                      },
                    ],
                  },
                })
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
      useListAuthFactorsQuery(
        { offset: 0, limit: 1, user: authUserId, type: "otp" },
        { refetchOnMountOrArgChange: true },
      ),
      ({ count: exists, data: authFactors }) =>
        exists ? (
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
