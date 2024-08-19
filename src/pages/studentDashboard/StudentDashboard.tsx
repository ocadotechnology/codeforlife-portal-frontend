import * as page from "codeforlife/components/page"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { type SessionMetadata } from "codeforlife/hooks"
import { handleQueryState } from "codeforlife/utils/api"

import Games from "./Games"
import RapidRouterProgress from "./RapidRouterProgress"
import { paths } from "../../router"
import { useRetrieveUserQuery } from "../../api/user"

export interface StudentDashboardProps {
  userType: "student" | "indy"
}

const BaseDashboard: FC<SessionMetadata> = ({ user_id, user_type }) => {
  const isStudent = user_type === "student"

  return handleQueryState(useRetrieveUserQuery(user_id), user => {
    return (
      <>
        <page.Banner
          header={`Welcome, ${user.first_name}`}
          subheader={"This is where you can access your games"}
          textAlign="center"
          bgcolor={isStudent ? "tertiary" : "secondary"}
        />
        <page.Notification bgcolor={isStudent ? "tertiary" : "secondary"}>
          {isStudent ? (
            <>You are logged in to class: {user.student!.klass}</>
          ) : (
            <>
              You are logged in as an independent student. If you want to join a
              school, you need to&nbsp;
              <Link to={paths.indy.dashboard.joinClass._} color="inherit">
                request to join one
              </Link>
              .
            </>
          )}
        </page.Notification>
        <page.Section>
          <Games isStudent={isStudent} />
        </page.Section>
        <page.Section boxProps={{ bgcolor: "info.main" }}>
          <RapidRouterProgress />
        </page.Section>
      </>
    )
  })
}

const StudentDashboard: FC<StudentDashboardProps> = ({ userType }) => (
  <page.Page session={{ userType }}>{BaseDashboard}</page.Page>
)

export default StudentDashboard
