import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { Stack, Typography } from "@mui/material"
import type { FC } from "react"
import { generatePath } from "react-router-dom"

import * as form from "codeforlife/components/form"
import { useNavigate } from "codeforlife/hooks"

import { classIdSchema } from "../../../app/schemas"
import { paths } from "../../../router"
import BaseForm from "../BaseForm"

export interface ClassProps {}

const Class: FC<ClassProps> = () => {
  const navigate = useNavigate()

  return (
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
        placeholder="Access code"
        helperText="Enter your access code"
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
  )
}

export default Class
