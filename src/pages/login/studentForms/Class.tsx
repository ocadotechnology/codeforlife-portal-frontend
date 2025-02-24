import * as form from "codeforlife/components/form"
import * as yup from "yup"
import { type FC, useEffect } from "react"
import { Stack, Typography } from "@mui/material"
import { useInputRef, useNavigate, useSearchParams } from "codeforlife/hooks"
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { generatePath } from "react-router-dom"

import BaseForm from "../BaseForm"
import { classIdSchema } from "../../../app/schemas"
import { paths } from "../../../routes"
import { useAutoLoginAsStudentMutation } from "../../../api/sso"

export interface ClassProps {}

const Class: FC<ClassProps> = () => {
  const [autoLoginAsStudent] = useAutoLoginAsStudentMutation()
  const navigate = useNavigate()
  const searchParams = useSearchParams({
    id: yup.number().required(),
    agp: yup.string().required(),
  })
  const classIdFieldRef = useInputRef()

  useEffect(() => {
    if (searchParams) {
      autoLoginAsStudent({
        student_id: searchParams.id,
        auto_gen_password: searchParams.agp,
      })
        .unwrap()
        .then(() => {
          navigate(paths.student.dashboard._)
        })
        .catch(() => {
          navigate(".", {
            replace: true,
            state: {
              notifications: [
                {
                  props: {
                    error: true,
                    children:
                      "Failed to automatically log in student. Please log" +
                      "in manually.",
                  },
                },
              ],
            },
          })
        })
    }
  }, [searchParams, autoLoginAsStudent, navigate])

  return (
    <>
      {!searchParams && (
        <BaseForm
          themedBoxProps={{ userType: "student" }}
          header="Welcome"
          subheader="Please enter your class code."
          initialValues={{ classId: "" }}
          onSubmit={({ classId }) => {
            navigate(generatePath(paths.login.student.class._, { classId }))
          }}
          order={[{ name: "classId", inputRef: classIdFieldRef }]}
        >
          <form.TextField
            name="classId"
            label="Class code"
            placeholder="Enter your class code"
            schema={classIdSchema}
            inputRef={classIdFieldRef}
            required
          />
          <Typography variant="body2" fontWeight="bold">
            Forgotten your login details? Please check with your teacher.
          </Typography>
          <Stack alignItems="end">
            <form.SubmitButton endIcon={<ChevronRightIcon />}>
              Next
            </form.SubmitButton>
          </Stack>
        </BaseForm>
      )}
    </>
  )
}

export default Class
