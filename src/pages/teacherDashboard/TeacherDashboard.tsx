import * as page from "codeforlife/components/page"
import { type FC } from "react"
import { Navigate } from "codeforlife/components/router"
import { type SchoolTeacherUser } from "codeforlife/api"
import { type SessionMetadata } from "codeforlife/hooks"
import { getParam } from "codeforlife/utils/router"
import { handleResultState } from "codeforlife/utils/api"

import Account, { type AccountProps } from "./account/Account"
import Classes, { type ClassesProps } from "./classes/Classes"
import School, { type SchoolProps } from "./school/School"
import { paths } from "../../routes"
import { useRetrieveUserQuery } from "../../api/user"

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

const Tabs: FC<TeacherDashboardProps & SessionMetadata> = ({
  tab,
  view,
  user_id,
}) =>
  handleResultState(useRetrieveUserQuery(user_id), authUser => {
    if (!authUser.teacher!.school) {
      return <Navigate to={paths.teacher.onboarding._} />
    }

    const authSchoolTeacherUser = authUser as SchoolTeacherUser<typeof authUser>

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
  })

const TeacherDashboard: FC<TeacherDashboardProps> = props => (
  <page.Page session={{ userType: "teacher" }}>
    {sessionMetadata => <Tabs {...props} {...sessionMetadata} />}
  </page.Page>
)

export default TeacherDashboard
