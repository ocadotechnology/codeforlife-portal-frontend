import * as forms from "codeforlife/components/form"
import { Add as AddIcon, Upload as UploadIcon } from "@mui/icons-material"
import { type FC, type MutableRefObject, useEffect, useRef } from "react"
import { Stack, Typography } from "@mui/material"
import { type Class } from "codeforlife/api"
import { InputFileButton } from "codeforlife/components"
import { firstNameSchema } from "codeforlife/schemas/user"
import { generatePath } from "react-router-dom"
import { useNavigate } from "codeforlife/hooks"

import {
  type CreateStudentsArg,
  useCreateStudentsMutation,
} from "../../../../api/student"
import { type StudentsCredentialsState } from "../studentsCredentials/StudentsCredentials"
import { paths } from "../../../../routes"

export interface CreateStudentsFormProps {
  classId: Class["id"]
}

const CreateStudentsForm: FC<CreateStudentsFormProps> = ({ classId }) => {
  const fileInput = useRef<HTMLInputElement>()
  const navigate = useNavigate()

  const reader = new FileReader()
  const split = /\r\n|\n|\r|,/

  useEffect(() => {
    if (fileInput.current?.files && fileInput.current.files.length) {
      reader.readAsText(fileInput.current.files[0])
    }
  }, [fileInput.current?.files]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Typography variant="h4">Add new students</Typography>
      <Typography>
        Add the student names to the box and separate them with a comma.
      </Typography>
      <Typography>
        Student names and the class access code are required to sign in.
      </Typography>
      <InputFileButton
        endIcon={<UploadIcon />}
        variant="outlined"
        className="body"
        inputProps={{
          ref: fileInput as MutableRefObject<HTMLInputElement>,
          accept: ".csv",
        }}
      >
        Import CSV file
      </InputFileButton>
      <forms.Form
        initialValues={{ first_names: [] as string[] }}
        useMutation={useCreateStudentsMutation}
        submitOptions={{
          clean: ({ first_names }) =>
            first_names.reduce((arg, first_name) => {
              first_name = first_name.trim()
              return first_name
                ? [...arg, { klass: classId, user: { first_name } }]
                : arg
            }, [] as CreateStudentsArg),
          then: students => {
            navigate<StudentsCredentialsState>(
              generatePath(
                paths.teacher.dashboard.tab.classes.class.students.credentials
                  ._,
                { classId },
              ),
              { state: { flow: "create", students } },
            )
          },
          catch: () => {
            navigate(".", {
              state: {
                notifications: [
                  {
                    props: {
                      error: true,
                      children: "Failed to add students to class.",
                    },
                  },
                ],
              },
            })
          },
        }}
      >
        {({ setFieldValue }) => {
          reader.onload = () => {
            void setFieldValue("first_names", reader.result, true)
          }

          return (
            <Stack
              gap={3}
              alignItems="end"
              direction={{ xs: "column", md: "row" }}
              width={{ xs: "100%", md: "75%" }}
            >
              {/* TODO: show errors from backend */}
              <forms.TextField
                name="first_names"
                required
                split={split}
                multiline
                rows={5}
                className="resize-vertical"
                placeholder="You can import names from a .CSV file, or copy and paste them from a spreadsheet directly into this text box"
                schema={firstNameSchema}
              />
              <forms.SubmitButton endIcon={<AddIcon />}>
                Add students
              </forms.SubmitButton>
            </Stack>
          )
        }}
      </forms.Form>
    </>
  )
}

export default CreateStudentsForm
