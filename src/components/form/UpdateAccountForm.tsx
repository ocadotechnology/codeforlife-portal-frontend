import * as forms from "codeforlife/components/form"
import { getDirty, isDirty } from "codeforlife/utils/form"
import { type FC } from "react"
import { Typography } from "@mui/material"
import { useNavigate } from "codeforlife/hooks"

import {
  type RetrieveUserResult,
  type UpdateUserArg,
  useUpdateUserMutation,
} from "../../api/user"
import {
  indyPasswordSchema,
  studentPasswordSchema,
  teacherPasswordSchema,
} from "../../app/schemas"
import { LastNameField } from "./index"

export interface UpdateAccountFormProps {
  authUser: RetrieveUserResult
}

// TODO: Split this form into two or three forms. Needs UX work
const UpdateAccountForm: FC<UpdateAccountFormProps> = ({ authUser }) => {
  const navigate = useNavigate()

  const initialValues = authUser.student
    ? {
        id: authUser.id,
        password: "",
        password_repeat: "",
        current_password: "",
      }
    : {
        id: authUser.id,
        password: undefined as string | undefined,
        password_repeat: undefined as string | undefined,
        current_password: undefined as string | undefined,
        first_name: authUser.first_name,
        last_name: authUser.last_name,
        email: authUser.email,
      }

  return (
    <>
      {authUser.student ? (
        <>
          <Typography variant="h5">Update your password</Typography>
          <Typography>
            You may edit your password below. It must be long enough and hard
            enough to stop your friends guessing it and stealing all of your
            hard work. Choose something memorable though.
          </Typography>
          <Typography>
            If you have any problems, ask a teacher to help you.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h5">Update your account details</Typography>
          <Typography>You can update your account details below.</Typography>
          <Typography>
            Please note: If you change your email address, you will need to
            re-verify it. Please ensure your password is strong enough to be
            secure.
          </Typography>
        </>
      )}
      <forms.Form
        initialValues={initialValues}
        useMutation={useUpdateUserMutation}
        submitOptions={{
          exclude: ["password_repeat"],
          clean: (values: typeof initialValues) => {
            const arg: UpdateUserArg = { id: values.id }
            if (isDirty(values, initialValues, "password")) {
              arg.password = values.password
              arg.current_password = values.current_password
            }
            if (isDirty(values, initialValues, "email")) {
              arg.email = values.email
              arg.current_password = values.current_password
            }
            if (isDirty(values, initialValues, "first_name")) {
              arg.first_name = values.first_name
            }
            if (isDirty(values, initialValues, "last_name")) {
              arg.last_name = values.last_name
            }

            return arg
          },
          // TODO: Update backend to log user out and show a message if credential fields were updated
          then: () => {
            navigate(".", {
              state: {
                notifications: [
                  {
                    props: {
                      children:
                        "Your account details have been changed successfully.",
                    },
                  },
                ],
              },
            })
          },
        }}
      >
        {form => {
          const dirty = getDirty(form.values, initialValues, [
            "email",
            "password",
          ])

          let passwordSchema = indyPasswordSchema

          if (authUser.student) {
            passwordSchema = studentPasswordSchema
          } else if (authUser.teacher) {
            passwordSchema = teacherPasswordSchema
          }

          if (isDirty(form.values, initialValues, "current_password")) {
            passwordSchema = passwordSchema.notOneOf(
              [form.values.current_password],
              "cannot match your current password",
            )
          }

          return (
            <>
              {!authUser.student && (
                <>
                  <forms.FirstNameField />
                  <LastNameField />
                  <forms.EmailField />
                </>
              )}
              <forms.PasswordField
                required={Boolean(authUser.student)}
                label="New password"
                repeatFieldProps={{ label: "Repeat new password" }}
                withRepeatField={Boolean(authUser.student) || dirty.password}
                schema={passwordSchema}
              />
              {(Boolean(authUser.student) || dirty.email || dirty.password) && (
                <forms.PasswordField
                  required
                  name="current_password"
                  label="Current password"
                  placeholder="Enter your current password"
                />
              )}
              <forms.SubmitButton sx={{ marginTop: 3 }}>
                Update details
              </forms.SubmitButton>
            </>
          )
        }}
      </forms.Form>
    </>
  )
}

export default UpdateAccountForm
