import * as page from "codeforlife/components/page"
import { type FC, useEffect } from "react"
import { type SessionMetadata, useNavigate } from "codeforlife/hooks"
import { CircularProgress } from "@mui/material"
import { type SchoolTeacherUser } from "codeforlife/api"
import { getParam } from "codeforlife/utils/router"

import {
  type RetrieveUserResult,
  useLazyRetrieveUserQuery,
} from "../../api/user"
import Account from "./account/Account"
import Classes from "./classes/Classes"
import School from "./school/School"
import { paths } from "../../router"

export interface TeacherDashboardProps {}

const TeacherDashboard: FC<TeacherDashboardProps> = () => {
  let [retrieveUser, { data: authUser, isError }] = useLazyRetrieveUserQuery()
  const navigate = useNavigate()

  const isNonSchoolTeacher = authUser && !authUser.teacher?.school

  useEffect(() => {
    if (isNonSchoolTeacher) navigate(paths.teacher.onboarding._)
  }, [isNonSchoolTeacher, navigate])

  if (isNonSchoolTeacher) return <></>

  // TODO: handle this better
  if (isError) return <>There was an error!</>

  const Tabs: FC<SessionMetadata> = ({ user_id }) => {
    useEffect(() => {
      if (!authUser) retrieveUser(user_id)
    }, [user_id])

    if (!authUser) return <CircularProgress />

    const authSchoolTeacherUser =
      authUser as SchoolTeacherUser<RetrieveUserResult>

    return (
      <page.TabBar
        header={`Welcome back, ${authUser.first_name} ${authUser.last_name}`}
        originalPath={paths.teacher.dashboard.tab._}
        tabs={[
          {
            label: "Your school",
            children: <School authUser={authSchoolTeacherUser} />,
            path: getParam(paths.teacher.dashboard.tab.school, "tab"),
          },
          {
            label: "Your classes",
            children: <Classes authUser={authSchoolTeacherUser} />,
            path: getParam(paths.teacher.dashboard.tab.classes, "tab"),
          },
          {
            label: "Your account",
            children: <Account authUser={authSchoolTeacherUser} />,
            path: getParam(paths.teacher.dashboard.tab.account, "tab"),
          },
        ]}
      />
    )
  }

  return <page.Page session={{ userType: "teacher" }}>{Tabs}</page.Page>
}

export default TeacherDashboard
