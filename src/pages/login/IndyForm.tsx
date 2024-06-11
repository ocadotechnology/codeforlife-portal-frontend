import { Stack } from "@mui/material"
import type { FC } from "react"

import * as form from "codeforlife/components/form"
import { useNavigate } from "codeforlife/hooks"
import { submitForm } from "codeforlife/utils/form"

import { useLoginWithEmailMutation } from "../../api/sso"
import { paths } from "../../router"
import BaseForm from "./BaseForm"

export interface IndyFormProps {}

const IndyForm: FC<IndyFormProps> = () => {
  const [loginWithEmail] = useLoginWithEmailMutation()
  const navigate = useNavigate()

  return (
    <BaseForm
      themedBoxProps={{ userType: "independent" }}
      header="text"
      subheader="text"
      initialValues={{ email: "", password: "" }}
      onSubmit={submitForm(loginWithEmail, {
        then: () => {
          navigate(paths.indy.dashboard._)
        },
      })}
    >
      <Stack alignItems="end">
        <form.SubmitButton>Log in</form.SubmitButton>
      </Stack>
    </BaseForm>
  )
}

export default IndyForm
