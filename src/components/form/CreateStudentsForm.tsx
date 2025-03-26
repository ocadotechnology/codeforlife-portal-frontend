import * as forms from "codeforlife/components/form"
import { Add as AddIcon, Upload as UploadIcon } from "@mui/icons-material"
import { type Class, schemas } from "codeforlife/api"
import { type FC, type MutableRefObject, useEffect, useRef } from "react"
import { Stack, Typography } from "@mui/material"
import { useInputRef, useNavigate } from "codeforlife/hooks"
import { InputFileButton } from "codeforlife/components"
import { type SubmitFormOptions } from "codeforlife/utils/form"

import {
  type CreateStudentsArg,
  type CreateStudentsResult,
  useCreateStudentsMutation,
} from "../../api/student"

export interface CreateStudentsFormProps {
  classId: Class["id"]
  submitOptions: Omit<
    SubmitFormOptions<
      { first_names: string[] },
      CreateStudentsArg,
      CreateStudentsResult
    >,
    "clean" | "catch"
  >
}

const CreateStudentsForm: FC<CreateStudentsFormProps> = ({
  classId,
  submitOptions,
}) => {
  const fileInput = useRef<HTMLInputElement>()
  const firstNamesFieldRef = useInputRef()
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
        fieldRefs={[{ name: "first_names", inputRef: firstNamesFieldRef }]}
        useMutation={useCreateStudentsMutation}
        submitOptions={{
          ...submitOptions,
          clean: ({ first_names }) =>
            first_names.reduce((arg, first_name) => {
              first_name = first_name.trim()
              return first_name
                ? [...arg, { klass: classId, user: { first_name } }]
                : arg
            }, [] as CreateStudentsArg),
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
                inputRef={firstNamesFieldRef}
                required
                split={split}
                uniqueCaseInsensitive
                multiline
                rows={5}
                className="resize-vertical"
                placeholder="You can import names from a .CSV file, or copy and paste them from a spreadsheet directly into this text box"
                schema={schemas.user.first_name}
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
