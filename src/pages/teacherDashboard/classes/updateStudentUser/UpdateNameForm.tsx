import * as forms from "codeforlife/components/form"
import { type FC } from "react"
import { Typography } from "@mui/material"
import { type User } from "codeforlife/api"
import { useNavigate } from "codeforlife/hooks"

import { useUpdateUserMutation } from "../../../../api/user"

export interface UpdateNameFormProps {
  classPath: string
  studentUser: Pick<User, "id" | "first_name">
}

const UpdateNameForm: FC<UpdateNameFormProps> = ({
  classPath,
  studentUser,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <Typography variant="h5">Update name</Typography>
      <Typography>
        Remember this is the name they use to log in with, so you should tell
        them what you&apos;ve changed it to.
      </Typography>
      <forms.Form
        initialValues={studentUser}
        useMutation={useUpdateUserMutation}
        submitOptions={{
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
        }}
      >
        <forms.FirstNameField
          required
          dirty
          label="First name of student"
          placeholder="Enter first name of student"
        />
        <forms.SubmitButton>Update</forms.SubmitButton>
      </forms.Form>
    </>
  )
}

export default UpdateNameForm
