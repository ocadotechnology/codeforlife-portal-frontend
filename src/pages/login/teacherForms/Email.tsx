import { Stack, Typography } from "@mui/material"
import type { FC } from "react"

import * as form from "codeforlife/components/form"
import { Link } from "codeforlife/components/router"
import { useNavigate } from "codeforlife/hooks"
import { submitForm } from "codeforlife/utils/form"

import { useLoginWithEmailMutation } from "../../../api/sso"
import { paths } from "../../../router"
import BaseForm from "../BaseForm"

export interface EmailProps {}

const Email: FC<EmailProps> = () => {
  const [loginWithEmail] = useLoginWithEmailMutation()
  const navigate = useNavigate()

  return (
    <BaseForm
      themedBoxProps={{ userType: "teacher" }}
      header="Welcome"
      subheader="Please enter your login details."
      initialValues={{ email: "", password: "" }}
      onSubmit={submitForm(loginWithEmail, {
        then: ({ auth_factors }) => {
          navigate(
            auth_factors.includes("otp")
              ? paths.login.teacher.otp._
              : paths.teacher.dashboard.school._,
          )
        },
      })}
    >
      <form.EmailField required />
      <form.PasswordField required />
      <Stack>
        <Typography variant="body2" fontWeight="bold" my={0}>
          Forgotten your password?
        </Typography>
        <Typography variant="body2">
          Don&apos;t worry, you can&nbsp;
          <Link to={paths.resetPassword.teacher._}>reset your password</Link>.
        </Typography>
      </Stack>
      <Stack alignItems="end">
        <form.SubmitButton>Log in</form.SubmitButton>
      </Stack>
    </BaseForm>
  )
}

export default Email
