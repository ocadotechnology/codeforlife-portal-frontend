import * as forms from "codeforlife/components/form"
import { getDirty, isDirty } from "codeforlife/utils/form"
import { type FC } from "react"
import { Typography } from "@mui/material"
import { generatePath } from "react-router"
import { useNavigate } from "codeforlife/hooks"

import {
  type RetrieveUserResult,
  type UpdateUserArg,
  type UpdateUserResult,
  useUpdateUserMutation,
} from "../../api/user"
import {
  indyPasswordSchema,
  nullableSchema,
  studentPasswordSchema,
  teacherPasswordSchema,
} from "../../app/schemas"
import { LastNameField } from "./index"
import { paths } from "../../routes"
import { useLogoutMutation } from "../../api"

export interface UpdateAccountFormProps {
  authUser: RetrieveUserResult
}

// TODO: Split this form into two or three forms. Needs UX work
const UpdateAccountForm: FC<UpdateAccountFormProps> = ({ authUser }) => {
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()

  const initialValues = authUser.student
    ? {
        id: authUser.id,
        password: "",
        password_repeat: "",
        current_password: "",
      }
    : {
        id: authUser.id,
        password: "",
        password_repeat: "",
        current_password: "",
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
          then: (_: UpdateUserResult, values: typeof initialValues) => {
            const isEmailDirty = isDirty(values, initialValues, "email")
            const isPasswordDirty = isDirty(values, initialValues, "password")
            const messages = [
              "Your account details have been changed successfully.",
            ]

            if (isEmailDirty || isPasswordDirty) {
              const teacherLoginPath = generatePath(paths.login.teacher._)
              if (isEmailDirty) {
                void logout(null)
                  .unwrap()
                  .then(() => {
                    messages.push(
                      "Your email will be changed once you have verified it, until then you can still log in with your old email.",
                    )
                    navigate(teacherLoginPath, {
                      state: {
                        notifications: messages.map(message => ({
                          props: { children: message },
                        })),
                      },
                    })
                  })
                  // TODO: Check what happens here - is the field still updated?
                  .catch(() => {
                    navigate(".", {
                      replace: true,
                      state: {
                        notifications: [
                          {
                            props: {
                              error: true,
                              children: "Failed to log you out.",
                            },
                          },
                        ],
                      },
                    })
                  })
              }
              if (isPasswordDirty) {
                void logout(null)
                  .unwrap()
                  .then(() => {
                    messages.push(
                      "Going forward, please log in using your new password.",
                    )
                    navigate(teacherLoginPath, {
                      state: {
                        notifications: messages.map(message => ({
                          props: { children: message },
                        })),
                      },
                    })
                  })
                  .catch(() => {
                    navigate(".", {
                      replace: true,
                      state: {
                        notifications: [
                          {
                            props: {
                              error: true,
                              children: "Failed to log you out.",
                            },
                          },
                        ],
                      },
                    })
                  })
              }
            } else {
              navigate(".", {
                state: {
                  notifications: messages.map(message => ({
                    props: { children: message },
                  })),
                },
              })
            }
          },
        }}
      >
        {form => {
          const dirty = getDirty(form.values, initialValues, [
            "email",
            "password",
          ])

          let passwordSchema = indyPasswordSchema.concat(nullableSchema)

          if (authUser.student) {
            passwordSchema = studentPasswordSchema
          } else if (authUser.teacher) {
            passwordSchema = teacherPasswordSchema.concat(nullableSchema)
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
              <forms.SubmitButton
                sx={theme => ({ marginTop: theme.spacing(3) })}
              >
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
