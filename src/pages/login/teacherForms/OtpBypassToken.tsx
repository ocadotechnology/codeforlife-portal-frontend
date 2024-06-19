import { Stack, Typography, useTheme } from "@mui/material"
import type { FC } from "react"
import * as yup from "yup"

import * as form from "codeforlife/components/form"
import { LinkButton } from "codeforlife/components/router"
import { useNavigate, useSession } from "codeforlife/hooks"
import { submitForm } from "codeforlife/utils/form"

import { useLoginWithOtpBypassTokenMutation } from "../../../api/sso"
import { paths } from "../../../router"
import BaseForm from "../BaseForm"

export interface OtpBypassTokenProps {}

const OtpBypassToken: FC<OtpBypassTokenProps> = () => {
  const [loginWithOtpBypassToken] = useLoginWithOtpBypassTokenMutation()
  const navigate = useNavigate()
  const theme = useTheme()

  return useSession(
    <BaseForm
      themedBoxProps={{ userType: "teacher" }}
      header="Login as a teacher"
      initialValues={{ token: "" }}
      onSubmit={submitForm(loginWithOtpBypassToken, {
        then: () => {
          navigate(paths.teacher.dashboard.school._)
        },
      })}
    >
      <Typography marginBottom={theme.spacing(6)}>
        Use this form for entering backup tokens for logging in. These tokens
        have been generated for you to print and keep safe. Please enter one of
        these backup tokens to login to your account.
      </Typography>
      <Typography fontWeight="bold">Token:</Typography>
      <form.TextField
        name="token"
        helperText="Enter one of your tokens"
        schema={yup.string().matches(/^[a-z0-9]{8}$/, "Invalid token")}
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
