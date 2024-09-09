import * as pages from "codeforlife/components/page"
import { type FC, useEffect } from "react"
import { useLocation, useNavigate } from "codeforlife/hooks"
import { type StudentUser } from "codeforlife/api"
import { generatePath } from "react-router"

import { type ListUsersResult } from "../../../../api/user"
import { type ResetStudentsPasswordResult } from "../../../../api/student"
// import { StudentCredentialsTable } from "../../../components"
import { paths } from "../../../../routes"
import { useClassIdParam } from "../../../../app/hooks"

export interface ResetStudentsPasswordState {
  studentUsers: Array<StudentUser<ListUsersResult["data"][number]>>
  resetStudentsPasswordResult: ResetStudentsPasswordResult
}

export interface ResetStudentsPasswordProps {}

const ResetStudentsPassword: FC<ResetStudentsPasswordProps> = () => {
  const { classId } = useClassIdParam()!
  const { state } = useLocation<ResetStudentsPasswordState>()
  const navigate = useNavigate()

  const { studentUsers, resetStudentsPasswordResult } = state || {}
  const validState =
    studentUsers && studentUsers.length && resetStudentsPasswordResult

  useEffect(() => {
    if (!validState) {
      navigate(
        generatePath(paths.teacher.dashboard.tab.classes.class._, { classId }),
        { replace: true },
      )
    }
  }, [classId, navigate, validState])

  if (!validState) return <></>

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
