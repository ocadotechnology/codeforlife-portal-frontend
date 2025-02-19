import * as form from "codeforlife/components/form"
import { Link, LinkButton } from "codeforlife/components/router"
import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { Send as SendIcon } from "@mui/icons-material"
import { useInputRef } from "codeforlife/hooks"

import { GMAIL_FILTERS_PASSWORD_RESET_REQUEST } from "../../app/settings"
import { OpenInEmailButtons } from "../../components"
import { paths } from "../../routes"
import { useLazyRequestPasswordResetQuery } from "../../api/user"

export interface EmailFormProps {}

const EmailForm: FC<EmailFormProps> = () => {
  const [requestPasswordReset, result] = useLazyRequestPasswordResetQuery()
  const emailFieldRef = useInputRef()

  return result.isSuccess ? (
    <Stack gap={1} alignItems="center">
      <Typography textAlign="center" variant="h4">
        Thank you
      </Typography>
      <Typography>
        If you have entered a valid email address, you will receive a link to
        reset your password. Make sure to check your <strong>spam</strong>.
      </Typography>
      <SendIcon color="white" sx={{ fontSize: "100px", marginY: 5 }} />
      <OpenInEmailButtons gmailFilters={GMAIL_FILTERS_PASSWORD_RESET_REQUEST} />
      <Link to={paths._} className="back-to">
        homepage
      </Link>
    </Stack>
  ) : (
    <Stack gap={1}>
      <Typography textAlign="center" variant="h4">
        Reset password
      </Typography>
      <Typography textAlign="center" variant="h5">
        Please enter your email address
      </Typography>
      <Typography>
        We will send an email with a link to reset your password.
      </Typography>
      <form.Form
        initialValues={{ email: "" }}
        order={[{ name: "email", inputRef: emailFieldRef }]}
        onSubmit={values => {
          void requestPasswordReset(values)
        }}
      >
        <form.EmailField required inputRef={emailFieldRef} />
        <Stack direction="row" gap={5} justifyContent="center" paddingY={3}>
          <LinkButton variant="outlined" to={-1}>
            Cancel
          </LinkButton>
          <form.SubmitButton>Reset password</form.SubmitButton>
        </Stack>
      </form.Form>
    </Stack>
  )
}

export default EmailForm
