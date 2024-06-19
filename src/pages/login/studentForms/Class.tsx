import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { Stack, Typography } from "@mui/material"
import { useEffect, type FC } from "react"
import { generatePath } from "react-router-dom"
import * as yup from "yup"

import * as form from "codeforlife/components/form"
import { useNavigate, useSearchParamEntries } from "codeforlife/hooks"
import { tryValidateSync } from "codeforlife/utils/schema"

import { useAutoLoginAsStudentMutation } from "../../../api/sso"
import { classIdSchema } from "../../../app/schemas"
import { paths } from "../../../router"
import BaseForm from "../BaseForm"

export interface ClassProps {}

const Class: FC<ClassProps> = () => {
  const [autoLoginAsStudent] = useAutoLoginAsStudentMutation()
  const navigate = useNavigate()

  const searchParams = tryValidateSync(
    useSearchParamEntries(),
    yup.object({
      id: yup.number().required(),
      agp: yup.string().required(),
    }),
  )

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
        >
          <form.TextField
            name="classId"
            label="Access code"
            placeholder="Enter your access code"
            schema={classIdSchema}
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
