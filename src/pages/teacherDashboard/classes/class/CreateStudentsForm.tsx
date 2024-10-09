import * as forms from "codeforlife/components/form"
import { Button, Typography } from "@mui/material"
import { type Class } from "codeforlife/api"
import { type FC } from "react"
import { Upload as UploadIcon } from "@mui/icons-material"
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
  const navigate = useNavigate()

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
      <Button endIcon={<UploadIcon />} variant="outlined" className="body">
        Import CSV file
      </Button>
      <forms.Form
        initialValues={{ first_names: [] as string[] }}
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
        {/* <forms.MutiTextField name="first_names" delimiter="," newline /> */}
      </forms.Form>
    </>
  )
}

export default CreateStudentsForm
