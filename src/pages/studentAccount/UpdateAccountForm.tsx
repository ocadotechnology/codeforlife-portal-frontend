import * as forms from "codeforlife/components/form"
import { Stack, Typography } from "@mui/material"
import { getDirty, isDirty } from "codeforlife/utils/form"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { useNavigate } from "codeforlife/hooks"

import {
  type RetrieveUserResult,
  type UpdateUserArg,
  type UpdateUserResult,
  useUpdateUserMutation,
} from "../../api/user"
import { indyPasswordSchema, studentPasswordSchema } from "../../app/schemas"
import { LastNameField } from "../../components/form"

export interface UpdateAccountFormProps {
  user: RetrieveUserResult
}

const UpdateAccountForm: FC<UpdateAccountFormProps> = ({ user }) => {
  const navigate = useNavigate()

  const initialValues = user.student
    ? {
        id: user.id,
        password: "",
        password_repeat: "",
        current_password: "",
      }
    : {
        id: user.id,
        password: "",
        password_repeat: "",
        current_password: "",
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      }

  return (
    <>
      {user.student ? (
        <>
          <Typography align="center" variant="h4">
            Update your password
          </Typography>
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
          <Typography align="center" variant="h4">
            Update your account details
          </Typography>
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
            if (user.student || isDirty(values, initialValues, "password")) {
              arg.password = values.password
              arg.current_password = values.current_password
            } else if (isDirty(values, initialValues, "email")) {
              arg.email = values.email
              arg.current_password = values.current_password
            } else if (isDirty(values, initialValues, "first_name")) {
              arg.first_name = values.first_name
            } else if (isDirty(values, initialValues, "last_name")) {
              arg.last_name = values.last_name
            }

            return arg
          },
          then: (_: UpdateUserResult, values: typeof initialValues) => {
            const messages = [
              "Your account details have been changed successfully.",
            ]
            if (isDirty(values, initialValues, "email")) {
              // TODO: implement this behavior on the backend.
              messages.push(
                "Your email will be changed once you have verified it, until then you can still log in with your old email.",
              )
            }
            if (isDirty(values, initialValues, "password")) {
              messages.push(
                "Going forward, please login using your new password.",
              )
            }

            navigate(".", {
              state: {
                notifications: messages.map(message => ({
                  props: { children: message },
                })),
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

          let passwordSchema = user.student
            ? studentPasswordSchema
            : indyPasswordSchema
          if (isDirty(form.values, initialValues, "current_password")) {
            passwordSchema = passwordSchema.notOneOf(
              [form.values.current_password],
              "cannot match your current password",
            )
          }

          return (
            <>
              {!user.student && (
                <>
                  <forms.FirstNameField />
                  <LastNameField />
                  <forms.EmailField />
                </>
              )}
              <forms.PasswordField
                required={Boolean(user.student)}
                label="New password"
                repeatFieldProps={{ label: "Repeat new password" }}
                withRepeatField={Boolean(user.student) || dirty.password}
                schema={passwordSchema}
              />
              {(Boolean(user.student) || dirty.email || dirty.password) && (
                <forms.PasswordField
                  required
                  name="current_password"
                  label="Current password"
                  placeholder="Enter your current password"
                />
              )}
              <Stack direction="row" spacing={2} paddingY={3}>
                <LinkButton variant="outlined" to={-1}>
                  Cancel
                </LinkButton>
                <forms.SubmitButton>Update details</forms.SubmitButton>
              </Stack>
            </>
          )
        }}
      </forms.Form>
    </>
  )
}

export default UpdateAccountForm
