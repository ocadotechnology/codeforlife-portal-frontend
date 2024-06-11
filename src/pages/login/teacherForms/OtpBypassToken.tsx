import { Stack } from "@mui/material"
import type { FC } from "react"

import * as form from "codeforlife/components/form"
import { useNavigate } from "codeforlife/hooks"
import { submitForm } from "codeforlife/utils/form"

import { useLoginWithOtpBypassTokenMutation } from "../../../api/sso"
import { paths } from "../../../router"
import BaseForm from "../BaseForm"

export interface OtpBypassTokenProps {}

const OtpBypassToken: FC<OtpBypassTokenProps> = () => {
  const [loginWithOtpBypassToken] = useLoginWithOtpBypassTokenMutation()
  const navigate = useNavigate()

  return (
    <BaseForm
      themedBoxProps={{ userType: "teacher" }}
      header="text"
      subheader="text"
      initialValues={{ token: "" }}
      onSubmit={submitForm(loginWithOtpBypassToken, {
        then: () => {
          navigate(paths.teacher.dashboard.school._)
        },
      })}
    >
      <Stack alignItems="end">
        <form.SubmitButton>Log in</form.SubmitButton>
      </Stack>
    </BaseForm>
  )
}

export default OtpBypassToken
