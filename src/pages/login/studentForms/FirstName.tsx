import * as form from "codeforlife/components/form"
import { type FC, useEffect } from "react"
import { useInputRef, useNavigate, useParams } from "codeforlife/hooks"
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { Stack } from "@mui/material"
import { idSchema as classIdSchema } from "codeforlife/schemas/klass"

import BaseForm from "../BaseForm"
import { paths } from "../../../routes"
import { useLoginAsStudentMutation } from "../../../api/sso"

export interface FirstNameProps {}

const FirstName: FC<FirstNameProps> = () => {
  const navigate = useNavigate()
  const firstNameFieldRef = useInputRef()
  const passwordFieldRef = useInputRef()

  const params = useParams({ classId: classIdSchema.required() })

  useEffect(() => {
    if (!params) {
      navigate(paths.login.student._, {
        state: {
          notifications: [
            {
              props: {
                error: true,
                children: "Please provide the correct code for your class.",
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
          useMutation={useLoginAsStudentMutation}
          submitOptions={{
            then: () => {
              navigate(paths.student.dashboard._)
            },
          }}
          fieldRefs={[
            { name: "first_name", inputRef: firstNameFieldRef },
            { name: "password", inputRef: passwordFieldRef },
          ]}
        >
          <form.FirstNameField required inputRef={firstNameFieldRef} />
          <form.PasswordField required inputRef={passwordFieldRef} />
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
