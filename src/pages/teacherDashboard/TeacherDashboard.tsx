import * as page from "codeforlife/components/page"
import { type FC, useEffect } from "react"
import { type SessionMetadata, useNavigate } from "codeforlife/hooks"
import { CircularProgress } from "@mui/material"
import { type SchoolTeacherUser } from "codeforlife/api"
import { getParam } from "codeforlife/utils/router"

import Account, { type AccountProps } from "./account/Account"
import Classes, { type ClassesProps } from "./classes/Classes"
import {
  type RetrieveUserResult,
  useLazyRetrieveUserQuery,
} from "../../api/user"
import School, { type SchoolProps } from "./school/School"
import { paths } from "../../router"

export type TeacherDashboardProps =
  | {
      tab: "school"
      view?: SchoolProps["view"]
    }
  | {
      tab: "classes"
      view?: ClassesProps["view"]
    }
  | {
      tab: "account"
      view?: AccountProps["view"]
    }

const TeacherDashboard: FC<TeacherDashboardProps> = ({ tab, view }) => {
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

    const tabs: page.TabBarProps["tabs"] = [
      {
        label: "Your school",
        children: (
          <School
            authUser={authSchoolTeacherUser}
            view={view as SchoolProps["view"]}
          />
        ),
        path: getParam(paths.teacher.dashboard.tab.school, "tab"),
      },
      {
        label: "Your classes",
        children: (
          <Classes
            authUser={authSchoolTeacherUser}
            view={view as ClassesProps["view"]}
          />
        ),
        path: getParam(paths.teacher.dashboard.tab.classes, "tab"),
      },
      {
        label: "Your account",
        children: (
          <Account
            authUser={authSchoolTeacherUser}
            view={view as AccountProps["view"]}
          />
        ),
        path: getParam(paths.teacher.dashboard.tab.account, "tab"),
      },
    ]

    return (
      <page.TabBar
        header={`Welcome back, ${authUser.first_name} ${authUser.last_name}`}
        originalPath={paths.teacher.dashboard.tab._}
        value={tabs.findIndex(t => t.path === tab)}
        tabs={tabs}
      />
    )
  }

  return <page.Page session={{ userType: "teacher" }}>{Tabs}</page.Page>
}

export default TeacherDashboard
