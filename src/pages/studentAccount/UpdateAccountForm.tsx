import * as forms from "codeforlife/components/form"
import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { submitForm } from "codeforlife/utils/form"
import { useNavigate } from "codeforlife/hooks"

import {
  type RetrieveUserResult,
  type UpdateUserArg,
  useUpdateUserMutation,
} from "../../api/user"
import { LastNameField } from "../../components/form"

export interface UpdateAccountFormProps {
  user: RetrieveUserResult
}

const UpdateAccountForm: FC<UpdateAccountFormProps> = ({ user }) => {
  const [updateUser] = useUpdateUserMutation()
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
        onSubmit={submitForm(updateUser, {
          onlyDirtyValues: initialValues,
          exclude: ["password_repeat"],
          clean: values => {
            if (user.student) {
              const { id, password, current_password } =
                values as typeof initialStudentValues

              return { id, password, current_password }
            }

            const { id, first_name, last_name } =
              values as typeof initialIndyValues

            return { id, first_name, last_name }
          },
          then: (_, values) => {
            const messages = [
              "Your account details have been changed successfully.",
            ]
            if (values.email !== initialValues.email) {
              // TODO: implement this behavior on the backend.
              messages.push(
                "Your email will be changed once you have verified it, until then you can still log in with your old email.",
              )
            }
            if (values.password !== initialValues.password) {
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
        })}
      >
        {form => {
          // Checking if individual fields are dirty is not currently supported.
          // https://github.com/jaredpalmer/formik/issues/1421
          const dirty = {
            email: form.values.email !== form.initialValues.email,
            password: form.values.password !== form.initialValues.password,
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
                withRepeatField={Boolean(user.student) || dirty.password}
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
