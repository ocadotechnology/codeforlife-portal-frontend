import * as form from "codeforlife/components/form"
import { Stack, Typography, useTheme } from "@mui/material"
import { useInputRef, useNavigate, useSession } from "codeforlife/hooks"
import type { FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { schemas } from "codeforlife/api"

import BaseForm from "../BaseForm"
import { paths } from "../../../routes"
import { useLoginWithOtpBypassTokenMutation } from "../../../api/sso"

export interface OtpBypassTokenProps {}

const OtpBypassToken: FC<OtpBypassTokenProps> = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const tokenFieldRed = useInputRef()

  return useSession(
    <BaseForm
      themedBoxProps={{ userType: "teacher" }}
      header="Welcome"
      initialValues={{ token: "" }}
      useMutation={useLoginWithOtpBypassTokenMutation}
      submitOptions={{
        then: () => {
          navigate(paths.teacher.dashboard.tab.school._)
        },
      }}
      fieldRefs={[{ name: "token", inputRef: tokenFieldRed }]}
    >
      <Typography marginBottom={theme.spacing(6)}>
        Use this form for entering backup tokens for logging in. These tokens
        have been generated for you to print and keep safe. Please enter one of
        these backup tokens to login to your account.
      </Typography>
      <form.TextField
        inputRef={tokenFieldRed}
        name="token"
        label="OTP-bypass token"
        placeholder="Enter one of your otp-bypass tokens"
        schema={schemas.otpBypassToken.token}
        required
      />
      <Stack
        marginTop={theme.spacing(3.5)}
        marginBottom={theme.spacing(1)}
        direction="row"
        spacing={2}
        justifyContent="space-between"
      >
        <LinkButton to={paths.login.teacher._} variant="outlined">
          Cancel
        </LinkButton>
        <form.SubmitButton>Log in</form.SubmitButton>
      </Stack>
    </BaseForm>,
    { userType: "teacher", next: false },
  )
}

export default OtpBypassToken
