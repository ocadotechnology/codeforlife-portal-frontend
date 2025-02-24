import * as form from "codeforlife/components/form"
import { Stack, Typography } from "@mui/material"
import { useInputRef, useNavigate } from "codeforlife/hooks"
import type { FC } from "react"
import { Link } from "codeforlife/components/router"

import BaseForm from "./BaseForm"
import { paths } from "../../routes"
import { useLoginWithEmailMutation } from "../../api/sso"

export interface IndyFormProps {}

const IndyForm: FC<IndyFormProps> = () => {
  const navigate = useNavigate()
  const emailFieldRef = useInputRef()
  const passwordFieldRef = useInputRef()

  return (
    <BaseForm
      themedBoxProps={{ userType: "independent" }}
      header="Welcome"
      subheader="Please enter your login details."
      initialValues={{ email: "", password: "" }}
      useMutation={useLoginWithEmailMutation}
      submitOptions={{
        then: () => {
          navigate(paths.indy.dashboard._)
        },
      }}
      order={[
        { name: "email", inputRef: emailFieldRef },
        { name: "password", inputRef: passwordFieldRef },
      ]}
    >
      <form.EmailField required inputRef={emailFieldRef} />
      <form.PasswordField required inputRef={passwordFieldRef} />
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
