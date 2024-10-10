import * as pages from "codeforlife/components/page"
import { type Student, type User } from "codeforlife/api"
import { useLocation, useParams } from "codeforlife/hooks"
import { type FC } from "react"
import { Navigate } from "codeforlife/components/router"
import { generatePath } from "react-router-dom"

// import { StudentCredentialsTable } from "../../../components"
import { classIdSchema } from "../../../../app/schemas"
import { paths } from "../../../../routes"

export interface ResetStudentsPasswordState {
  students: Array<
    Pick<Student, "id" | "auto_gen_password"> & {
      user: Pick<User, "id" | "first_name" | "password">
    }
  >
}

export interface ResetStudentsPasswordProps {}

const ResetStudentsPassword: FC<ResetStudentsPasswordProps> = () => {
  const params = useParams({ classId: classIdSchema.required() })
  const { state } = useLocation<ResetStudentsPasswordState>()

  if (!params)
    return <Navigate to={paths.teacher.dashboard.tab.classes._} replace />

  const { classId } = params
  const { students } = state || {}

  if (!students || !students.length) {
    return (
      <Navigate
        to={generatePath(paths.teacher.dashboard.tab.classes.class._, {
          classId,
        })}
        replace
      />
    )
  }

  return (
    <pages.Section>
      {/* TODO: replace delete and replace with component when implemented. */}
      {classId}
      {students.map(student => JSON.stringify(student))}
      {/* <StudentCredentialsTable classId={classId} studentUsers={studentUsers} /> */}
    </pages.Section>
  )
}

export default ResetStudentsPassword
