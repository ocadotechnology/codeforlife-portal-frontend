import * as forms from "codeforlife/components/form"
import * as pages from "codeforlife/components/page"
import { type Class, type User } from "codeforlife/api"
import { Navigate, generatePath } from "react-router-dom"
import { useNavigate, useParams } from "codeforlife/hooks"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { type StudentUser } from "codeforlife/api"
import { Typography } from "@mui/material"
import { handleResultState } from "codeforlife/utils/api"
import { submitForm } from "codeforlife/utils/form"

import {
  type RetrieveUserResult,
  useRetrieveUserQuery,
  useUpdateUserMutation,
} from "../../../../api/user"
import { classIdSchema, userIdSchema } from "../../../../app/schemas"
import { NewPasswordField } from "../../../../components/form"
import { type ResetStudentsPasswordState } from "./ResetStudentsPassword"
import { paths } from "../../../../routes"
import { useResetStudentsPasswordMutation } from "../../../../api/student"
import { useRetrieveClassQuery } from "../../../../api/klass"

const UpdateStudentUserFormsSection: FC<{
  classId: Class["id"]
  studentUserId: User["id"]
}> = ({ classId, studentUserId }) => {
  const retrieveClassResult = useRetrieveClassQuery(classId)
  const retrieveUserResult = useRetrieveUserQuery(studentUserId)
  const [resetStudentsPassword] = useResetStudentsPasswordMutation()
  const [updateUser] = useUpdateUserMutation()
  const navigate = useNavigate()

  const classPath = generatePath(paths.teacher.dashboard.tab.classes.class._, {
    classId,
  })

  return handleResultState(retrieveClassResult, klass =>
    handleResultState(retrieveUserResult, user => (
      <>
        <pages.Section>
          <Typography align="center" variant="h4" marginBottom={11.5}>
            Edit student details for {user.first_name}
            from class {klass.name} ({klass.id})
          </Typography>
          <Link className="back-to" to={classPath}>
            Class
          </Link>
          <Typography mb={0}>
            Edit this student&apos;s name and manage their password and direct
            access link.
          </Typography>
        </pages.Section>
        <pages.Section>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Update name
          </Typography>
          <Typography>
            Remember this is the name they use to log in with, so you should
            tell them what you&apos;ve changed it to.
          </Typography>
          <forms.Form
            initialValues={{ id: studentUserId, first_name: user.first_name }}
            onSubmit={submitForm(updateUser, {
              then: () => {
                navigate(classPath, {
                  state: {
                    notifications: [
                      {
                        index: 1,
                        props: {
                          children: "Student's details successfully updated.",
                        },
                      },
                    ],
                  },
                })
              },
            })}
          >
            <forms.FirstNameField />
            <forms.SubmitButton>Update</forms.SubmitButton>
          </forms.Form>
        </pages.Section>
        <pages.Section>
          {/* TODO: create global fix for margin bottom */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            Update password
          </Typography>
          <Typography>
            You can set this student&apos;s password. Setting the password will
            also regenerate their direct access link. Enter and confirm the
            password in the boxes below. Try to prevent others from being able
            to guess the new password when making this decision.
          </Typography>
          <forms.Form
            initialValues={{
              [user.student!.id]: {
                user: { password: "", password_repeat: "" },
              },
            }}
            onSubmit={submitForm(resetStudentsPassword, {
              then: resetStudentsPasswordResult => {
                navigate<ResetStudentsPasswordState>(
                  generatePath(
                    paths.teacher.dashboard.tab.classes.class.students
                      .resetPassword._,
                    { classId },
                  ),
                  {
                    state: {
                      studentUsers: [user as StudentUser<RetrieveUserResult>],
                      resetStudentsPasswordResult,
                    },
                  },
                )
              },
            })}
          >
            <NewPasswordField
              name={`${user.student!.id}.user.password`}
              userType="student"
            />
            <forms.SubmitButton>Update</forms.SubmitButton>
          </forms.Form>
        </pages.Section>
      </>
    )),
  )
}

export interface UpdateStudentUserProps {}

const UpdateStudentUser: FC<UpdateStudentUserProps> = () => {
  const params = useParams({
    classId: classIdSchema().required(),
    studentUserId: userIdSchema.required(),
  })

  return params ? (
    <UpdateStudentUserFormsSection {...params} />
  ) : (
    <Navigate to="../.." />
  )
}

export default UpdateStudentUser
