import { Stack } from "@mui/material"
import type { FC } from "react"

import * as form from "codeforlife/components/form"
import { useNavigate } from "codeforlife/hooks"
import { submitForm } from "codeforlife/utils/form"

import { useLoginAsStudentMutation } from "../../api/sso"
import { paths } from "../../router"
import BaseForm from "./BaseForm"

export interface StudentFormProps {}

const StudentForm: FC<StudentFormProps> = () => {
  const [loginAsStudent] = useLoginAsStudentMutation()
  const navigate = useNavigate()

  return (
    <BaseForm
      themedBoxProps={{ userType: "student" }}
      header="text"
      subheader="text"
      initialValues={{ first_name: "", password: "", class_id: "" }}
      onSubmit={submitForm(loginAsStudent, {
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

export default StudentForm
