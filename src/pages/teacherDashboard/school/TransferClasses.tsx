import * as form from "codeforlife/components/form"
import * as page from "codeforlife/components/page"
import * as tables from "codeforlife/components/table"
import { Link, LinkButton } from "codeforlife/components/router"
import { type SchoolTeacher, type User } from "codeforlife/api"
import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { TablePagination } from "codeforlife/components"
import { useNavigate } from "codeforlife/hooks"

import {
  useLazyListClassesQuery,
  useUpdateClassesMutation,
} from "../../../api/klass"
import { TeacherAutocompleteField } from "../../../components/form"
import { paths } from "../../../routes"
import { useRemoveTeacherFromSchoolMutation } from "../../../api/teacher"

export interface TransferClassesProps {
  authUserId: User["id"]
  user: Pick<User, "id" | "first_name" | "last_name"> & {
    teacher: Pick<SchoolTeacher, "id" | "school">
  }
}

const TransferClasses: FC<TransferClassesProps> = ({ authUserId, user }) => {
  const [removeTeacherFromSchool] = useRemoveTeacherFromSchoolMutation()
  const navigate = useNavigate()

  const isSelf = user.id === authUserId

  function handleRemoveTeacherFromSchool() {
    removeTeacherFromSchool(user.teacher.id)
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
          Move all classes for teacher {user.first_name} {user.last_name}
        </Typography>
        {/* TODO: discuss if this link is needed since cancel button is below */}
        <Link className="back-to" to={paths.teacher.dashboard.tab.school._}>
          dashboard
        </Link>
        <Typography marginY={3}>
          Please specify which teacher you would like the classes below to be
          moved to.
        </Typography>
        <TablePagination
          useLazyListQuery={useLazyListClassesQuery}
          filters={{ teacher: user.teacher.id }}
        >
          {classes => {
            if (!classes.length) {
              handleRemoveTeacherFromSchool()
              return <></>
            }

            return (
              <form.Form
                initialValues={classes.reduce(
                  (values, klass) => ({
                    ...values,
                    [klass.id]: { teacher: undefined },
                  }),
                  {},
                )}
                useMutation={useUpdateClassesMutation}
              >
                <tables.Table
                  className="body"
                  headers={["Class name", "New teacher"]}
                >
                  {classes.map(klass => (
                    <tables.BodyRow key={klass.id}>
                      <tables.Cell>
                        <Typography variant="subtitle1">
                          {klass.name}
                        </Typography>
                      </tables.Cell>
                      <tables.CellStack alignItems="flex-start">
                        <TeacherAutocompleteField
                          required
                          name={`${klass.id}.teacher`}
                          _id={user.id}
                        />
                      </tables.CellStack>
                    </tables.BodyRow>
                  ))}
                </tables.Table>
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
            )
          }}
        </TablePagination>
      </page.Section>
    </>
  )
}

export default TransferClasses
