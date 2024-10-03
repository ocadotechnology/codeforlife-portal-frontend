import * as forms from "codeforlife/components/form"
import {
  EmailOutlined as EmailOutlinedIcon,
  PersonRemoveAlt1Outlined as PersonRemoveAlt1OutlinedIcon,
} from "@mui/icons-material"
import { InputAdornment, Stack } from "@mui/material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { type StudentUser } from "codeforlife/api"
import { submitForm } from "codeforlife/utils/form"
import { useNavigate } from "codeforlife/hooks"

import {
  type ReleaseStudentsArg,
  useReleaseStudentsMutation,
} from "../../../../api/student"
import { type ListUsersResult } from "../../../../api/user"

export interface ReleaseStudentsFormProps {
  studentUsers: Array<StudentUser<ListUsersResult["data"][number]>>
  classPath: string
}

const ReleaseStudentsForm: FC<ReleaseStudentsFormProps> = ({
  studentUsers,
  classPath,
}) => {
  const [releaseStudents] = useReleaseStudentsMutation()
  const navigate = useNavigate()

  return (
    <forms.Form
      initialValues={studentUsers.reduce(
        (arg, studentUser) => ({
          ...arg,
          [studentUser.student.id]: {
            user: {
              original_first_name: studentUser.first_name,
              first_name: studentUser.first_name,
              email: "",
              email_repeat: "",
            },
          },
        }),
        {} as ReleaseStudentsArg,
      )}
      onSubmit={submitForm(releaseStudents, {
        exclude: studentUsers.reduce(
          (exclude, studentUser) => [
            ...exclude,
            `${studentUser.student.id}.user.original_first_name`,
            `${studentUser.student.id}.user.email_repeat`,
          ],
          [] as string[],
        ),
        then: () => {
          navigate(classPath, {
            state: {
              notifications: [
                {
                  props: {
                    children: "The students have been released successfully",
                  },
                },
              ],
            },
          })
        },
        catch: () => {
          navigate(classPath, {
            state: {
              notifications: [
                {
                  props: {
                    error: true,
                    children: "Failed to release students",
                  },
                },
              ],
            },
          })
        },
      })}
    >
      {studentUsers.map(studentUser => (
        <Stack key={`user-${studentUser.id}`} gap={2}>
          <Stack direction="row" gap={2}>
            <forms.FirstNameField
              disabled
              name={`${studentUser.student.id}.user.original_first_name`}
              label="Original student name"
            />
            <forms.FirstNameField
              required
              name={`${studentUser.student.id}.user.first_name`}
              label="New student name"
              placeholder="Enter student address"
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <forms.EmailField
              required
              name={`${studentUser.student.id}.user.email`}
              label="New email address"
              placeholder="Enter email address"
            />
            <forms.RepeatField
              name={`${studentUser.student.id}.user.email`}
              label="Repeat email address"
              placeholder="Repeat email address"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>
      ))}
      <Stack direction="row" gap={2}>
        <LinkButton to={classPath} variant="outlined">
          Cancel
        </LinkButton>
        <forms.SubmitButton
          className="alert"
          endIcon={<PersonRemoveAlt1OutlinedIcon />}
        >
          Remove students
        </forms.SubmitButton>
      </Stack>
    </forms.Form>
  )
}

export default ReleaseStudentsForm
