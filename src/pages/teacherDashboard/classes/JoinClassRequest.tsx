import * as form from "codeforlife/components/form"
import * as page from "codeforlife/components/page"
import * as yup from "yup"
import {
  CircularProgress,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material"
import { type FC, useEffect, useState } from "react"
import { type IndependentUser, type StudentUser } from "codeforlife/api"
import { Link, LinkButton } from "codeforlife/components/router"
import { useNavigate, useParams } from "codeforlife/hooks"
import { TablePagination } from "codeforlife/components"
import { generatePath } from "react-router"
import { submitForm } from "codeforlife/utils/form"

import {
  type RetrieveClassResult,
  useLazyRetrieveClassQuery,
} from "../../../api/klass"
import {
  type RetrieveUserResult,
  useHandleJoinClassRequestMutation,
  useLazyListUsersQuery,
  useLazyRetrieveUserQuery,
} from "../../../api/user"
import { classIdSchema } from "../../../app/schemas"
import { paths } from "../../../routes"

const AddedStudent: FC<{
  klass: RetrieveClassResult
  user: StudentUser<RetrieveUserResult>
}> = ({ klass, user }) => (
  <>
    <page.Section>
      <Typography variant="h4" align="center" mb={0}>
        External student added to class {klass.name} ({klass.id})
      </Typography>
    </page.Section>
    <page.Section>
      <Typography>
        The student has been successfully added to the class {klass.name}.
      </Typography>
      <Typography>
        Please provide the student with their new login details:
      </Typography>
    </page.Section>
    <page.Section boxProps={{ bgcolor: "info.main" }}>
      <Typography>
        <strong>Class Access Code:</strong> {klass.id}
      </Typography>
      <Typography>
        <strong>Name:</strong> {user.first_name}
      </Typography>
    </page.Section>
    <page.Section>
      <Typography>
        {user.first_name} should now login as a student with these details.
      </Typography>
      <Typography mb={7}>
        {user.first_name}&apos;s password is unchanged. You may manage this
        student, including changing their name and password, as with other
        students.
      </Typography>
      <Link
        className="back-to"
        to={generatePath(paths.teacher.dashboard.tab.classes.class._, {
          classId: klass.id,
        })}
      >
        Class
      </Link>
    </page.Section>
  </>
)

const HandleRequest: FC<{
  klass: RetrieveClassResult
  user: IndependentUser<RetrieveUserResult>
  onAcceptRequest: () => void
}> = ({ klass, user, onAcceptRequest }) => {
  const [handleJoinClassRequest] = useHandleJoinClassRequestMutation()

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
                onSubmit={submitForm(handleJoinClassRequest, {
                  then: onAcceptRequest,
                })}
              >
                <form.FirstNameField
                  required
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

export interface JoinClassRequestProps {}

const JoinClassRequest: FC<JoinClassRequestProps> = () => {
  const navigate = useNavigate()
  const [wasAccepted, setWasAccepted] = useState(false)
  const params = useParams({
    classId: classIdSchema.required(),
    userId: yup.number().required(),
  })

  const [
    retrieveUser,
    { data: user, isLoading: userIsLoading, isError: userIsError },
  ] = useLazyRetrieveUserQuery()
  const [
    retrieveClass,
    { data: klass, isLoading: classIsLoading, isError: classIsError },
  ] = useLazyRetrieveClassQuery()

  useEffect(() => {
    if (params) {
      void retrieveUser(params.userId)
      void retrieveClass(params.classId)
    } else navigate(paths.error.type.pageNotFound._)
  }, [params, navigate, retrieveUser, retrieveClass])

  if (!params) return <></>

  if (!user || userIsLoading || !klass || classIsLoading)
    return <CircularProgress />

  if (userIsError || classIsError) alert("TODO: handle error")

  return wasAccepted ? (
    <AddedStudent
      klass={klass}
      user={user as StudentUser<RetrieveUserResult>}
    />
  ) : (
    <HandleRequest
      klass={klass}
      user={user as IndependentUser<RetrieveUserResult>}
      onAcceptRequest={() => {
        setWasAccepted(true)
      }}
    />
  )
}

export default JoinClassRequest
