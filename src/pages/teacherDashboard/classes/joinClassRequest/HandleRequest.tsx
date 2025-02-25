import * as form from "codeforlife/components/form"
import * as page from "codeforlife/components/page"
import { Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material"
import { Link, LinkButton } from "codeforlife/components/router"
import { type FC } from "react"
import { type IndependentUser } from "codeforlife/api"
import { TablePagination } from "codeforlife/components"
import { generatePath } from "react-router"
import { useInputRef } from "codeforlife/hooks"

import {
  type RetrieveUserResult,
  useHandleJoinClassRequestMutation,
  useLazyListUsersQuery,
} from "../../../../api/user"
import { type RetrieveClassResult } from "../../../../api/klass"
import { paths } from "../../../../routes"

export interface HandleRequestProps {
  klass: RetrieveClassResult
  user: IndependentUser<RetrieveUserResult>
  onAcceptRequest: () => void
}

const HandleRequest: FC<HandleRequestProps> = ({
  klass,
  user,
  onAcceptRequest,
}) => {
  const firstNameFieldRef = useInputRef()

  return (
    <>
      <page.Section>
        <Typography variant="h4" align="center" mb={0}>
          Add external student to class {klass.name} ({klass.id})
        </Typography>
      </page.Section>
      <page.Section>
        <Grid container spacing={{ xs: 2, lg: 3 }} display="flex">
          <Grid xs={12} md={6}>
            <TablePagination
              useLazyListQuery={useLazyListUsersQuery}
              filters={{ students_in_class: klass.id }}
            >
              {studentUsers => (
                <Stack sx={{ height: "100%" }} margin={3}>
                  <Typography variant="h4">
                    Students currently in class
                  </Typography>
                  {studentUsers.length ? (
                    <>
                      <Typography mb={5}>
                        {user.first_name}, the new external student, will be
                        joining students in the class {klass.name} ({klass.id})
                      </Typography>
                      <Typography variant="h6">Student Name</Typography>
                      {studentUsers.map((studentUser, index) => (
                        <Typography key={index} variant="subtitle1">
                          {studentUser.first_name}
                        </Typography>
                      ))}
                    </>
                  ) : (
                    <Typography>
                      The new external student {user.first_name} is joining the
                      class {klass.name} ({klass.id}) in which there are
                      currently no other students.
                    </Typography>
                  )}
                </Stack>
              )}
            </TablePagination>
          </Grid>
          <Grid xs={12} md={6} bgcolor="info.main">
            <Stack sx={{ height: "100%" }} margin={3}>
              <Typography variant="h4">Add external student</Typography>
              <Typography>
                Please confirm the name of the new external student joining your
                class. Their name will be used in their new login details, so
                please ensure it is different from any other existing student in
                the class.
              </Typography>
              <form.Form
                initialValues={{
                  id: user.id,
                  first_name: user.first_name,
                  accept: true,
                }}
                fieldRefs={[
                  { name: "first_name", inputRef: firstNameFieldRef },
                ]}
                useMutation={useHandleJoinClassRequestMutation}
                submitOptions={{ then: onAcceptRequest }}
              >
                <form.FirstNameField
                  required
                  inputRef={firstNameFieldRef}
                  label="Student name"
                  placeholder="Enter student's name"
                />
                <Stack
                  direction="row"
                  spacing={5}
                  justifyContent={"center"}
                  marginY={3}
                >
                  <LinkButton variant="outlined" to={-1}>
                    Cancel
                  </LinkButton>
                  <form.SubmitButton>Save</form.SubmitButton>
                </Stack>
              </form.Form>
            </Stack>
          </Grid>
        </Grid>
        <Grid xs={12} md={6} marginTop={7}>
          <Link
            className="back-to"
            to={generatePath(paths.teacher.dashboard.tab.classes.class._, {
              classId: klass.id,
            })}
          >
            Class
          </Link>
        </Grid>
      </page.Section>
    </>
  )
}

export default HandleRequest
