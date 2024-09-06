import * as pages from "codeforlife/components/page"
import * as yup from "yup"
import { type FC, useEffect } from "react"
import { type Student, type StudentUser } from "codeforlife/api"
import { useLocation, useNavigate, useParams } from "codeforlife/hooks"

import {
  type ResetStudentsPasswordArg,
  type ResetStudentsPasswordResult,
  useResetStudentsPasswordMutation,
} from "../../../api/student"
import { type ListUsersResult } from "../../../api/user"
import { StudentCredentialsTable } from "../../../components"

export interface ResetStudentsPasswordState {
  studentUsers: Array<StudentUser<ListUsersResult["data"][number]>>
  resetStudentsPasswordResult?: ResetStudentsPasswordResult
}

export interface ResetStudentsPasswordProps {}

const ResetStudentsPassword: FC<ResetStudentsPasswordProps> = () => {
  const [resetStudentsPassword] = useResetStudentsPasswordMutation()
  const { state } = useLocation<ResetStudentsPasswordState>()
  const navigate = useNavigate<ResetStudentsPasswordState>()
  const { classId } = useParams({ classId: yup.string().required() })!

  const { studentUsers, resetStudentsPasswordResult } = state || {}

  useEffect(() => {
    if (!studentUsers) navigate(-1, { replace: true })
    else if (!resetStudentsPasswordResult) {
      const resetStudentsPasswordArg = studentUsers.reduce((arg, { id }) => {
        arg[id] = {}
        return arg
      }, {} as ResetStudentsPasswordArg)

      void resetStudentsPassword(resetStudentsPasswordArg)
        .unwrap()
        .then(resetStudentsPasswordResult => {
          navigate(".", {
            replace: true,
            state: { studentUsers, resetStudentsPasswordResult },
          })
        })
        .catch(() => {
          navigate(-1, {
            state: {
              notifications: [
                {
                  props: {
                    error: true,
                    children: "Failed to reset students' password.",
                  },
                },
              ],
            },
          })
        })
    }
  }, [
    studentUsers,
    resetStudentsPasswordResult,
    resetStudentsPassword,
    navigate,
  ])

  if (!studentUsers || !resetStudentsPasswordResult) return <></>

  const passwords = resetStudentsPasswordResult.reduce(
    (passwords, { id, auto_gen_password, user: { password } }) => {
      passwords[id] = { auto_gen_password, password }
      return passwords
    },
    {} as Record<
      Student["id"],
      Pick<Student, "auto_gen_password"> & Pick<StudentUser, "password">
    >,
  )

  return (
    <pages.Section>
      <StudentCredentialsTable
        classId={classId}
        studentUsers={studentUsers.map(({ student, ...fields }) => ({
          ...fields,
          password: passwords[student.id].password,
          student: {
            ...student,
            auto_gen_password: passwords[student.id].auto_gen_password,
          },
        }))}
      />
    </pages.Section>
  )
}

export default ResetStudentsPassword
