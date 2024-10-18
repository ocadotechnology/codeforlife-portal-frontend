import * as forms from "codeforlife/components/form"
import { type Class, type StudentUser } from "codeforlife/api"
import { type FC } from "react"
import { Typography } from "@mui/material"
import { generatePath } from "react-router-dom"
import { useNavigate } from "codeforlife/hooks"

import { NewPasswordField } from "../../../../components/form"
import { type RetrieveUserResult } from "../../../../api/user"
import { type StudentsCredentialsState } from "../studentsCredentials/StudentsCredentials"
import { paths } from "../../../../routes"
import { useResetStudentsPasswordMutation } from "../../../../api/student"

export interface UpdatePasswordFormProps {
  classId: Class["id"]
  user: StudentUser<RetrieveUserResult>
}

const UpdatePasswordForm: FC<UpdatePasswordFormProps> = ({ classId, user }) => {
  const navigate = useNavigate()

  return (
    <>
      <Typography variant="h5">Update password</Typography>
      <Typography>
        You can set this student&apos;s password. Setting the password will also
        regenerate their direct access link. Enter and confirm the password in
        the boxes below. Try to prevent others from being able to guess the new
        password when making this decision.
      </Typography>
      <forms.Form
        initialValues={{
          [user.student.id]: {
            user: { password: "", password_repeat: "" },
          },
        }}
        useMutation={useResetStudentsPasswordMutation}
        submitOptions={{
          exclude: [`${user.student.id}.user.password_repeat`],
          then: ([student]) => {
            navigate<StudentsCredentialsState>(
              generatePath(
                paths.teacher.dashboard.tab.classes.class.students.credentials
                  ._,
                { classId },
              ),
              {
                state: {
                  flow: "reset-single",
                  students: [
                    {
                      ...student,
                      user: {
                        ...student.user,
                        first_name: user.first_name,
                      },
                    },
                  ],
                },
              },
            )
          },
        }}
      >
        <NewPasswordField
          name={`${user.student.id}.user.password`}
          userType="student"
          label="Password of student"
          placeholder="Enter password of student"
          repeatFieldProps={{
            label: "Repeat password of student",
            placeholder: "Enter password of student again",
          }}
        />
        <forms.SubmitButton>Update</forms.SubmitButton>
      </forms.Form>
    </>
  )
}

export default UpdatePasswordForm
