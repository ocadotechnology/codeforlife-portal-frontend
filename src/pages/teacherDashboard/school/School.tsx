import * as page from "codeforlife/components/page"
import {
  Button,
  CircularProgress,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material"
import { useLocation, useNavigate } from "codeforlife/hooks"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"

import TransferClasses, { type TransferClassesProps } from "./TransferClasses"
import InviteTeacherForm from "./InviteTeacherForm"
import { type RetrieveUserResult } from "../../../api/user"
import TeacherInvitationTable from "./TeacherInvitationTable"
import TeacherTable from "./TeacherTable"
import UpdateSchoolForm from "./UpdateSchoolForm"
import { useRetrieveSchoolQuery } from "../../../api/school"

export interface SchoolProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
}

const School: FC<SchoolProps> = ({ authUser }) => {
  const { data: school, isError } = useRetrieveSchoolQuery(
    authUser.teacher.school,
  )
  const { state } = useLocation<{
    transferClasses: TransferClassesProps["user"]
  }>()
  const navigate = useNavigate<{
    transferClasses?: TransferClassesProps["user"]
  }>()

  if (state?.transferClasses) {
    return (
      <TransferClasses authUserId={authUser.id} user={state.transferClasses} />
    )
  }

  // TODO: handle this better
  if (isError) return <>There was an error!</>

  if (!school) return <CircularProgress />

  return (
    <>
      <page.Section>
        <Typography align="center" variant="h4" marginBottom={0}>
          Your school: {school.name}
        </Typography>
      </page.Section>
      <page.Section sx={{ paddingTop: 0 }}>
        {authUser.teacher.is_admin ? (
          <>
            <Typography mb={0}>
              As an administrator of your school or club, you can select other
              teachers to whom you can provide or revoke administrative rights.
              You can also add and remove teachers from your school or club. As
              administrator, you have the ability to see and amend other
              teachers&apos; classes. Please bear this in mind when assigning
              admin rights to other teachers.
            </Typography>
            <page.Section sx={{ paddingBottom: 0 }}>
              <InviteTeacherForm />
            </page.Section>
          </>
        ) : (
          <Stack alignItems="center">
            <Typography variant="h5" marginTop={0} marginBottom={5}>
              You can see which other teachers in your school or club are
              registered here. Should you need to leave the school or club, you
              can do so below.
            </Typography>
            <Button
              onClick={() => {
                navigate(".", { state: { transferClasses: authUser } })
              }}
            >
              Leave school or club
            </Button>
          </Stack>
        )}
      </page.Section>
      <page.Section>
        <Typography variant="h5">
          These teachers are already part of your school or club
        </Typography>
        <TeacherTable authUser={authUser} />
        {authUser.teacher.is_admin && (
          <Grid container columnSpacing={5}>
            <Grid sm={6}>
              <Typography mb={0}>
                Select &apos;Delete&apos; to delete a teacher from your school
                or club. You will be able to move any existing classes assigned
                to that teacher to other teachers in your school or club.
              </Typography>
            </Grid>
            <Grid sm={6}>
              <Typography fontWeight="bold" color="error" mb={0}>
                We strongly recommend that administrators who are using 2FA
                ensure there is another administrator who will be able to
                disable their 2FA should they have problems with their
                smartphone or tablet.
              </Typography>
            </Grid>
          </Grid>
        )}
      </page.Section>
      {authUser.teacher.is_admin && (
        <page.Section>
          <Typography variant="h5">
            These teachers are invited to your school but have not joined yet
          </Typography>
          <TeacherInvitationTable authUser={authUser} />
        </page.Section>
      )}
      {authUser.teacher.is_admin && (
        <page.Section boxProps={{ bgcolor: "info.main" }}>
          <UpdateSchoolForm school={school} />
        </page.Section>
      )}
    </>
  )
}

export default School
