import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { Stack } from "@mui/material"
import { useEffect, type FC } from "react"
import { useParams } from "react-router-dom"
import * as yup from "yup"

import * as form from "codeforlife/components/form"
import { useNavigate } from "codeforlife/hooks"
import { submitForm } from "codeforlife/utils/form"
import { tryValidateSync } from "codeforlife/utils/schema"

import { useLoginAsStudentMutation } from "../../../api/sso"
import { classIdSchema } from "../../../app/schemas"
import { paths } from "../../../router"
import BaseForm from "../BaseForm"

export interface FirstNameProps {}

const FirstName: FC<FirstNameProps> = () => {
  const [loginAsStudent] = useLoginAsStudentMutation()
  const navigate = useNavigate()

  const params = tryValidateSync(
    useParams(),
    yup.object({ classId: classIdSchema.required() }),
  )

  useEffect(() => {
    if (!params) {
      navigate(paths.login.student._, {
        state: {
          notifications: [
            {
              props: {
                error: true,
                children: "Please provide a valid access code for your class.",
              },
            },
          ],
        },
      })
    }
  }, [navigate, params])

  return (
    <>
      {params && (
        <BaseForm
          themedBoxProps={{ userType: "student" }}
          header={`Welcome to class: ${params.classId}`}
          subheader="Please enter your login details."
          initialValues={{
            first_name: "",
            password: "",
            class_id: params.classId,
          }}
          onSubmit={submitForm(loginAsStudent, {
            then: () => {
              navigate(paths.student.dashboard._)
            },
          })}
        >
          <form.FirstNameField
            placeholder="Username"
            helperText="Enter your username"
            required
          />
          <form.PasswordField helperText="Enter your password" required />
          <Stack alignItems="end">
            <form.SubmitButton endIcon={<ChevronRightIcon />}>
              Log in
            </form.SubmitButton>
          </Stack>
        </BaseForm>
      )}
    </>
  )
}

export default FirstName
