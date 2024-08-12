import * as form from "codeforlife/components/form"
import { Stack, Typography } from "@mui/material"
import { CheckCircleOutline as CheckCircleOutlineIcon } from "@mui/icons-material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { submitForm } from "codeforlife/utils/form"

import { NewPasswordField } from "../../components/form"
import { paths } from "../../router"
import { useResetPasswordMutation } from "../../api/user"

export interface PasswordFormProps {
  userType: "teacher" | "independent"
  userId: number
  token: string
}

const PasswordForm: FC<PasswordFormProps> = ({ userType, userId, token }) => {
  const [resetPassword, { isSuccess }] = useResetPasswordMutation()

  return isSuccess ? (
    <Stack gap={1} alignItems="center">
      <Typography textAlign="center" variant="h4">
        Your password has been reset
      </Typography>
      <CheckCircleOutlineIcon
        color="white"
        sx={{ fontSize: "100px", marginY: 5 }}
      />
      <Typography>Please log in.</Typography>
      <LinkButton
        to={userType === "teacher" ? paths.login.teacher._ : paths.login.indy._}
      >
        OK
      </LinkButton>
    </Stack>
  ) : (
    <Stack gap={1}>
      <Typography textAlign="center" variant="h4">
        Password Reset
      </Typography>
      <Typography>
        Please enter a new password and confirm it in the box below to reset
        your account’s password.
      </Typography>
      <form.Form
        initialValues={{
          id: userId,
          token,
          password: "",
          password_repeat: "",
        }}
        onSubmit={submitForm(resetPassword, {
          exclude: ["password_repeat"],
        })}
      >
        <NewPasswordField userType={userType} />
        <Stack mt={3} direction="row" gap={5} justifyContent="center">
          <LinkButton variant="outlined" to={paths._}>
            Cancel
          </LinkButton>
          <form.SubmitButton>Reset password</form.SubmitButton>
        </Stack>
      </form.Form>
    </Stack>
  )
}

export default PasswordForm
