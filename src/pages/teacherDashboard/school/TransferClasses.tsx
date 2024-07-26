import * as form from "codeforlife/components/form"
import * as page from "codeforlife/components/page"
import { Link, LinkButton } from "codeforlife/components/router"
import { type SchoolTeacher, type User } from "codeforlife/api"
import { Stack, Typography } from "@mui/material"
import { useFullList, useNavigate } from "codeforlife/hooks"
import { type FC } from "react"

import * as table from "../../../components/table"
import {
  useLazyListClassesQuery,
  useUpdateClassesMutation,
} from "../../../api/klass"
import { paths } from "../../../router"
import { submitForm } from "codeforlife/utils/form"
import { useLazyListUsersQuery } from "../../../api/user"
import { useRemoveTeacherFromSchoolMutation } from "../../../api/teacher"

export interface TransferClassesProps {
  loggedInTeacherId: number
  teacherUser: Pick<User, "id" | "first_name" | "last_name"> & {
    teacher: Pick<SchoolTeacher, "id" | "school">
  }
}

const TransferClasses: FC<TransferClassesProps> = ({
  loggedInTeacherId,
  teacherUser,
}) => {
  const [updateClasses] = useUpdateClassesMutation()
  const [removeTeacherFromSchool] = useRemoveTeacherFromSchoolMutation()
  const navigate = useNavigate()

  const { data: teacherUsers } = useFullList(useLazyListUsersQuery, {
    teachers_in_school: teacherUser.teacher.school,
    _id: teacherUser.id,
  })
  const { data: classes } = useFullList(useLazyListClassesQuery, {
    teacher: teacherUser.teacher.id,
  })

  if (!teacherUsers) return <>TODO</>
  if (!classes) return <>TODO</>

  const isSelf = teacherUser.teacher.id === loggedInTeacherId

  const usersByTeacherId = Object.fromEntries(
    teacherUsers.map(user => [user.teacher!.id, user]),
  )

  function handleRemoveTeacherFromSchool() {
    removeTeacherFromSchool(teacherUser.teacher.id)
      .unwrap()
      .then(() => {
        if (isSelf) {
          navigate(paths.teacher.onboarding._)
        } else {
          navigate(paths.teacher.dashboard.tab.school._, {
            state: {
              notifications: [
                {
                  props: {
                    children:
                      "The teacher has been successfully removed from your school or club, and their classes were successfully transferred.",
                  },
                },
              ],
            },
          })
        }
      })
      .catch(() => {
        // TODO: error handling strategy.
        alert("Failed to remove teacher from school")
      })
  }

  return (
    <>
      <page.Notification>
        {isSelf
          ? "You still have classes, you must first move them to another teacher within your school or club."
          : "This teacher still has classes assigned to them. You must first move them to another teacher in your school or club."}
      </page.Notification>
      <page.Section>
        <Typography variant="h4" align="center" marginBottom={5}>
          Move all classes for teacher {teacherUser.first_name}{" "}
          {teacherUser.last_name}
        </Typography>
        <Link className="back-to" to={paths.teacher.dashboard.tab.school._}>
          dashboard
        </Link>
        <Typography marginY={3}>
          Please specify which teacher you would like the classes below to be
          moved to.
        </Typography>
        <form.Form
          initialValues={classes.reduce(
            (values, klass) => ({
              ...values,
              [klass.id]: { teacher: undefined },
            }),
            {},
          )}
          onSubmit={submitForm(updateClasses, {
            then: handleRemoveTeacherFromSchool,
          })}
        >
          <table.Table className="body" titles={["Class name", "New teacher"]}>
            {classes.map(klass => (
              <table.Body key={klass.id}>
                <table.Cell>
                  <Typography variant="subtitle1">{klass.name}</Typography>
                </table.Cell>
                <table.Cell direction="column" alignItems="flex-start">
                  <form.AutocompleteField
                    options={Object.keys(usersByTeacherId).map(Number)}
                    getOptionLabel={teacherId => {
                      const user = usersByTeacherId[teacherId]
                      return `${user.first_name} ${user.last_name}`
                    }}
                    textFieldProps={{
                      required: true,
                      name: `${klass.id}.teacher`,
                    }}
                  />
                </table.Cell>
              </table.Body>
            ))}
          </table.Table>
          <Stack direction="row" spacing={2}>
            <LinkButton
              variant="outlined"
              to={paths.teacher.dashboard.tab.school._}
            >
              Cancel
            </LinkButton>
            <form.SubmitButton>
              {isSelf
                ? "Move classes and leave"
                : "Move classes and remove teacher"}
            </form.SubmitButton>
          </Stack>
        </form.Form>
      </page.Section>
    </>
  )
}

export default TransferClasses
