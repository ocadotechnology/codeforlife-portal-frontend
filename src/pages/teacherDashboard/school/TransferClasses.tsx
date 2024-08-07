import * as form from "codeforlife/components/form"
import * as page from "codeforlife/components/page"
import { Link, LinkButton } from "codeforlife/components/router"
import { type SchoolTeacher, type User } from "codeforlife/api"
import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { TablePagination } from "codeforlife/components"
import { submitForm } from "codeforlife/utils/form"
import { useNavigate } from "codeforlife/hooks"

import * as table from "../../../components/table"
import {
  useLazyListClassesQuery,
  useUpdateClassesMutation,
} from "../../../api/klass"
import { paths } from "../../../router"
import { useLazyListUsersQuery } from "../../../api/user"
import { useRemoveTeacherFromSchoolMutation } from "../../../api/teacher"

export interface TransferClassesProps {
  authUserId: User["id"]
  user: Pick<User, "id" | "first_name" | "last_name"> & {
    teacher: Pick<SchoolTeacher, "id" | "school">
  }
}

const TransferClasses: FC<TransferClassesProps> = ({ authUserId, user }) => {
  const [updateClasses] = useUpdateClassesMutation()
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
                onSubmit={submitForm(updateClasses)}
              >
                <table.Table
                  className="body"
                  titles={["Class name", "New teacher"]}
                >
                  {classes.map(klass => (
                    <table.Body key={klass.id}>
                      <table.Cell>
                        <Typography variant="subtitle1">
                          {klass.name}
                        </Typography>
                      </table.Cell>
                      <table.Cell direction="column" alignItems="flex-start">
                        <form.ApiAutocompleteField
                          useLazyListQuery={useLazyListUsersQuery}
                          filterOptions={{ only_teachers: true, _id: user.id }}
                          getOptionLabel={({ first_name, last_name }) =>
                            `${first_name} ${last_name}`
                          }
                          getOptionKey={({ teacher }) =>
                            (teacher as SchoolTeacher).id
                          }
                          textFieldProps={{
                            required: true,
                            name: `${klass.id}.teacher`,
                          }}
                          searchKey="name"
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
            )
          }}
        </TablePagination>
      </page.Section>
    </>
  )
}

export default TransferClasses
