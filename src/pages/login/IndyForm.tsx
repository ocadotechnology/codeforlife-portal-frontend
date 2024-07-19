import * as form from "codeforlife/components/form"
import { Stack, Typography } from "@mui/material"
import type { FC } from "react"
import { Link } from "codeforlife/components/router"
import { submitForm } from "codeforlife/utils/form"
import { useNavigate } from "codeforlife/hooks"

import BaseForm from "./BaseForm"
import { paths } from "../../router"
import { useLoginWithEmailMutation } from "../../api/sso"

export interface IndyFormProps {}

const IndyForm: FC<IndyFormProps> = () => {
  const [loginWithEmail] = useLoginWithEmailMutation()
  const navigate = useNavigate()

  return (
    <BaseForm
      themedBoxProps={{ userType: "independent" }}
      header="Welcome"
      subheader="Please enter your login details."
      initialValues={{ email: "", password: "" }}
      onSubmit={submitForm(loginWithEmail, {
        then: () => {
          navigate(paths.indy.dashboard._)
        },
      })}
    >
      <form.EmailField required />
      <form.PasswordField required />
      <Stack>
        <Typography variant="body2" fontWeight="bold" mb={0}>
          Forgotten your password?
        </Typography>
        <Typography variant="body2">
          Don&apos;t worry, you can&nbsp;
          <Link to={paths.resetPassword.indy._}>reset your password</Link>.
        </Typography>
      </Stack>
      <Stack direction="row">
        <Typography variant="body2" fontWeight="bold" my={0}>
          Part of a school or club?&nbsp;
          <Link fontWeight="normal" to={paths.login.student._}>
            Log in here
          </Link>
        </Typography>
      </Stack>
      <Stack alignItems="end">
        <form.SubmitButton>Log in</form.SubmitButton>
      </Stack>
    </BaseForm>
  )
}

export default IndyForm
