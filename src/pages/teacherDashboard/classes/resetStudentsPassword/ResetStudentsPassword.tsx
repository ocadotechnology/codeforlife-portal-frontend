import * as pages from "codeforlife/components/page"
import { useLocation, useParams } from "codeforlife/hooks"
import { type FC } from "react"
import { Navigate } from "codeforlife/components/router"
import { type StudentUser } from "codeforlife/api"
import { generatePath } from "react-router-dom"

import {
  type ListUsersResult,
  type RetrieveUserResult,
} from "../../../../api/user"
import { type ResetStudentsPasswordResult } from "../../../../api/student"
// import { StudentCredentialsTable } from "../../../components"
import { classIdSchema } from "../../../../app/schemas"
import { paths } from "../../../../routes"

export interface ResetStudentsPasswordState {
  studentUsers: Array<
    StudentUser<RetrieveUserResult | ListUsersResult["data"][number]>
  >
  resetStudentsPasswordResult: ResetStudentsPasswordResult
}

export interface ResetStudentsPasswordProps {}

const ResetStudentsPassword: FC<ResetStudentsPasswordProps> = () => {
  const params = useParams({ classId: classIdSchema.required() })
  const { state } = useLocation<ResetStudentsPasswordState>()

  const { studentUsers, resetStudentsPasswordResult } = state || {}
  const validState =
    studentUsers && studentUsers.length && resetStudentsPasswordResult

  if (!params)
    return <Navigate to={paths.teacher.dashboard.tab.classes._} replace />

  const { classId } = params

  if (!validState)
    return (
      <Navigate
        to={generatePath(paths.teacher.dashboard.tab.classes.class._, {
          classId,
        })}
        replace
      />
    )

  const students = resetStudentsPasswordResult.reduce(
    (students, student) => ({ ...students, [student.id]: student }),
    {} as Record<
      ResetStudentsPasswordResult[number]["id"],
      ResetStudentsPasswordResult[number]
    >,
  )

  return (
    <pages.Section>
      {/* TODO: replace delete and replace with component when implemented. */}
      {classId}
      {studentUsers.map(({ student, ...fields }) =>
        JSON.stringify({
          ...fields,
          password: students[student.id].user.password,
          student: {
            ...student,
            auto_gen_password: students[student.id].auto_gen_password,
          },
        }),
      )}
      {/* <StudentCredentialsTable
        classId={classId}
        studentUsers={studentUsers.map(({ student, ...fields }) =>
          JSON.stringify({
            ...fields,
            password: students[student.id].user.password,
            student: {
              ...student,
              auto_gen_password: students[student.id].auto_gen_password,
            },
          }),
        )}
      /> */}
    </pages.Section>
  )
}

export default ResetStudentsPassword
