import * as page from "codeforlife/components/page"
import { Button, Stack, Typography } from "@mui/material"
import { useLocation, useNavigate } from "codeforlife/hooks"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"

import InviteTeacherForm from "./InviteTeacherForm"
import { type RetrieveUserResult } from "../../../api/user"
import TransferClasses from "./TransferClasses"
import { paths } from "../../../router"
import { useRemoveTeacherFromSchoolMutation } from "../../../api/teacher"
import { useRetrieveSchoolQuery } from "../../../api/school"

export interface SchoolProps {
  user: SchoolTeacherUser<RetrieveUserResult>
}

const School: FC<SchoolProps> = ({ user }) => {
  const { data: school } = useRetrieveSchoolQuery(user.teacher.school)
  const { state } = useLocation<{ transferClasses: boolean }>()
  const [removeTeacherFromSchool] = useRemoveTeacherFromSchoolMutation()
  const navigate = useNavigate()

  const { transferClasses } = state || {}

  const onLeaveOrganisation = (): void => {
    removeTeacherFromSchool(user.id)
      .unwrap()
      .then(() => {
        // if (moveClassData?.classes) {
        //   navigate(paths.teacher.dashboard.school.leave._, {
        //     state: moveClassData,
        //   })
        // } else {
        //   navigate(paths.teacher.onboarding._, {
        //     state: { leftOrganisation: true },
        //   })
        // }
      })
      .catch(error => {
        console.error(error)
      })
  }

  if (!school) return <>TODO</>

  return true ? (
    <TransferClasses loggedInTeacherId={user.teacher.id} teacherUser={user} />
  ) : (
    <>
      <page.Section>
        <Typography align="center" variant="h4" marginBottom={0}>
          Your school: {school.name}
        </Typography>
      </page.Section>
      <page.Section sx={{ paddingTop: 0 }}>
        {user.teacher.is_admin ? (
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
                removeTeacherFromSchool(user.teacher.id)
                  .unwrap()
                  .then(() => {
                    navigate(paths.teacher.onboarding._)
                  })
                  .catch(() => {
                    // TODO: error handling strategy.
                    alert("Failed to leave school")
                  })
              }}
            >
              Leave school or club
            </Button>
          </Stack>
        )}
      </page.Section>
      {/* <page.Section>
        <Typography variant="h5">
          These teachers are already part of your school or club
        </Typography>
        <TeachersTable
          teacherData={data.teacher}
          coworkersData={data.coworkers}
          sentInvites={data.sentInvites}
          setDialog={setDialog}
        />
        {isAdmin && (
          <Grid container columnSpacing={5}>
            <Grid item sm={6}>
              <Typography mb={0}>
                Select &apos;Delete&apos; to delete a teacher from your school
                or club. You will be able to move any existing classes assigned
                to that teacher to other teachers in your school or club.
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography fontWeight="bold" color="error" mb={0}>
                We strongly recommend that administrators who are using 2FA
                ensure there is another administrator who will be able to
                disable their 2FA should they have problems with their
                smartphone or tablet.
              </Typography>
            </Grid>
          </Grid>
        )}
      </page.Section> */}
      {/* {isAdmin && (
        <page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
          <UpdateSchoolDetailsForm schoolData={data.school} />
        </page.Section>
      )} */}
    </>
  )
}

export default School
