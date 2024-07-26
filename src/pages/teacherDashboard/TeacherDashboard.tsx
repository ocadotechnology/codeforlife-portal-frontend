import * as page from "codeforlife/components/page"
import { type FC, useEffect } from "react"
import { type Parameters } from "codeforlife/utils/router"
import { type SchoolTeacherUser } from "codeforlife/api"
import { useNavigate } from "codeforlife/hooks"

// import YourAccount from "./account/YourAccount"
// import Classes from "./classes/Classes"
// import MoveClasses from "./classes/MoveClasses"
import {
  type RetrieveUserResult,
  useLazyRetrieveUserQuery,
} from "../../api/user"
import School from "./school/School"
import { paths } from "../../router"

export interface TeacherDashboardProps {}

const TeacherDashboard: FC<TeacherDashboardProps> = () => {
  const [retrieveUser, { data: user, isError }] = useLazyRetrieveUserQuery()
  const navigate = useNavigate()

  const isNonSchoolTeacher = user && !user.teacher?.school

  useEffect(() => {
    if (isNonSchoolTeacher) navigate(paths.teacher.onboarding._)
  }, [isNonSchoolTeacher, navigate])

  if (isNonSchoolTeacher) return <></>

  // TODO: handle this better
  if (isError) return <>There was an error!</>

  return (
    <page.Page session={{ userType: "teacher" }}>
      {({ user_id }) => {
        if (!user) {
          retrieveUser(user_id)
          return <>Loading...</>
        }

        const schoolTeacherUser = user as SchoolTeacherUser<RetrieveUserResult>

        return (
          <page.TabBar
            header={`Welcome back, ${user.first_name} ${user.last_name}`}
            originalPath={paths.teacher.dashboard.tab._}
            tabs={[
              {
                label: "Your school",
                children: <School user={schoolTeacherUser} />,
                path: (paths.teacher.dashboard.tab.school.__ as Parameters).tab,
              },
              // {
              //   label: "Your classes",
              //   children: movingClass ? (
              //     <MoveClasses />
              //   ) : (
              //     <Classes data={data} />
              //   ),
              //   path: "classes",
              // },
              // {
              //   label: "Your account",
              //   children: <YourAccount />,
              //   path: "account",
              // },
            ]}
          />
        )
      }}
    </page.Page>
  )
}

export default TeacherDashboard
