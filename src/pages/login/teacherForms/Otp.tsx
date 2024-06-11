import { Stack } from "@mui/material"
import type { FC } from "react"

import * as form from "codeforlife/components/form"
import { useNavigate } from "codeforlife/hooks"
import { submitForm } from "codeforlife/utils/form"

import { useLoginWithOtpMutation } from "../../../api/sso"
import { paths } from "../../../router"
import BaseForm from "../BaseForm"

export interface OtpProps {}

const Otp: FC<OtpProps> = () => {
  const [loginWithOtp] = useLoginWithOtpMutation()
  const navigate = useNavigate()

  return (
    <BaseForm
      themedBoxProps={{ userType: "teacher" }}
      header="text"
      subheader="text"
      initialValues={{ otp: 0 }}
      onSubmit={submitForm(loginWithOtp, {
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

export default Otp
