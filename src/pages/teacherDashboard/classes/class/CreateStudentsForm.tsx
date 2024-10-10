import * as forms from "codeforlife/components/form"
import { Add as AddIcon, Upload as UploadIcon } from "@mui/icons-material"
import {
  type FC,
  type MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react"
import { type Class } from "codeforlife/api"
import { InputFileButton } from "codeforlife/components"
import { Typography } from "@mui/material"
import { firstNameSchema } from "codeforlife/schemas/user"
import { generatePath } from "react-router-dom"
import { useNavigate } from "codeforlife/hooks"

import {
  type CreateStudentsArg,
  useCreateStudentsMutation,
} from "../../../../api/student"
import { type ResetStudentsPasswordState } from "../resetStudentsPassword/ResetStudentsPassword"
import { paths } from "../../../../routes"

export interface CreateStudentsFormProps {
  classId: Class["id"]
}

const CreateStudentsForm: FC<CreateStudentsFormProps> = ({ classId }) => {
  const [initialValues, setInitialValues] = useState({
    first_names: [] as string[],
  })
  const fileInput = useRef<HTMLInputElement>()
  const navigate = useNavigate()

  const split = /\r\n|\n|\r|,/

  const reader = new FileReader()
  reader.onload = () => {
    const result = reader.result as string
    setInitialValues({ first_names: result.split(split) })
  }

  useEffect(() => {
    if (fileInput.current?.files && fileInput.current.files.length) {
      reader.readAsText(fileInput.current.files[0])
    }
  }, [fileInput.current?.files]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Typography variant="h4">Add new students</Typography>
      <Typography>
        Add the student names to the box with one name per line or separated by
        a comma.
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
        initialValues={initialValues}
        useMutation={useCreateStudentsMutation}
        submitOptions={{
          clean: ({ first_names }) =>
            first_names.reduce(
              (arg, first_name) => [
                ...arg,
                { klass: classId, user: { first_name } },
              ],
              [] as CreateStudentsArg,
            ),
          then: result => {
            navigate<ResetStudentsPasswordState>(
              generatePath(
                paths.teacher.dashboard.tab.classes.class.students.resetPassword
                  ._,
                { classId },
              ),
              // TODO: pass in correct state.
              { state: { studentUsers: result } },
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
        {/* <forms.TextField
          name="first_names"
          required
          split={split}
          multiline
          rows={5}
          className="resize-vertical"
          placeholder="You can import names from a .CSV file, or copy and paste them from a spreadsheet directly into this text box"
          schema={firstNameSchema}
        /> */}
        <forms.SubmitButton endIcon={<AddIcon />}>
          Add students
        </forms.SubmitButton>
      </forms.Form>
    </>
  )
}

export default CreateStudentsForm
