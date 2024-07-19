import * as page from "codeforlife/components/page"
import { type FC, useEffect } from "react"
import { useNavigate, useSessionMetadata } from "codeforlife/hooks"
import { Unstable_Grid2 as Grid } from "@mui/material"

import IndyForm from "./IndyForm"
import TeacherForm from "./TeacherForm"
import { paths } from "../../router"

export interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const navigate = useNavigate()
  const sessionMetadata = useSessionMetadata()

  useEffect(() => {
    if (sessionMetadata) {
      navigate(
        sessionMetadata.auth_factors.length
          ? // Send user to login page if they need to finish authenticating.
            {
              teacher: paths.login.teacher._,
              student: paths.login.student._,
              indy: paths.login.indy._,
            }[sessionMetadata.user_type]
          : // Send user to dashboard page if they finished authenticating.
            {
              teacher: paths.teacher.dashboard.tab.school._,
              student: paths.student.dashboard._,
              indy: paths.indy.dashboard._,
            }[sessionMetadata.user_type],
      )
    }
  }, [sessionMetadata, navigate])

  return (
    <page.Page>
      <page.Section>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <TeacherForm />
          </Grid>
          <Grid xs={12} md={6}>
            <IndyForm />
          </Grid>
        </Grid>
      </page.Section>
    </page.Page>
  )
}

export default Register
