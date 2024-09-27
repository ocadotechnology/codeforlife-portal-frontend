import * as form from "codeforlife/components/form"
import * as page from "codeforlife/components/page"
import * as tables from "codeforlife/components/table"
import * as yup from "yup"
import { CircularProgress, Stack, Typography } from "@mui/material"
import { type FC, useEffect } from "react"
import { Link, LinkButton } from "codeforlife/components/router"
import { useNavigate, useParams } from "codeforlife/hooks"
import { TablePagination } from "codeforlife/components"
import { type User } from "codeforlife/api"
import { submitForm } from "codeforlife/utils/form"

import {
  useLazyListClassesQuery,
  useUpdateClassesMutation,
} from "../../../../api/klass"
import { TeacherAutocompleteField } from "../../../../components/form"
import { paths } from "../../../../routes"
import { useLazyRetrieveUserQuery } from "../../../../api/user"
import { useRemoveTeacherFromSchoolMutation } from "../../../../api/teacher"

export interface LeaveProps {
  authUserId: User["id"]
}

const Leave: FC<LeaveProps> = ({ authUserId }) => {
  const [updateClasses] = useUpdateClassesMutation()
  const [removeTeacherFromSchool] = useRemoveTeacherFromSchoolMutation()
  const [retrieveUser, { data: user, isLoading, isError }] =
    useLazyRetrieveUserQuery()

  const navigate = useNavigate()
  const params = useParams({ userId: yup.number().required() })

  useEffect(() => {
    function navigateToSchoolTabWithErrorNotification(message: string) {
      navigate(paths.teacher.dashboard.tab.school._, {
        state: {
          notifications: [
            {
              props: { children: message, error: true },
            },
          ],
        },
      })
    }

    if (!params) navigate(paths.error.type.pageNotFound._)
    else if (isError)
      navigateToSchoolTabWithErrorNotification("Failed to retrieve user.")
    else if (!isLoading && !user) void retrieveUser(params.userId)
    else if (user && !user.teacher)
      navigateToSchoolTabWithErrorNotification("This user is not a teacher.")
  }, [params, navigate, isError, isLoading, user, retrieveUser])

  if (!params || isError) return <></>
  if (isLoading || !user) return <CircularProgress />
  if (!user.teacher) return <></>

  const isSelf = params.userId === authUserId

  function handleRemoveTeacherFromSchool() {
    removeTeacherFromSchool(user!.teacher!.id)
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

export default Leave
