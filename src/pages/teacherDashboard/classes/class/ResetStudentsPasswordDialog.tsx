import { type Class, type Student, type StudentUser } from "codeforlife/api"
import { type FC } from "react"
import { generatePath } from "react-router-dom"
import { useNavigate } from "codeforlife/hooks"

import BaseDialog, { type BaseDialogProps } from "./BaseDialog"
import {
  type ResetStudentsPasswordArg,
  useResetStudentsPasswordMutation,
} from "../../../../api/student"
import { type ListUsersResult } from "../../../../api/user"
import { type StudentsCredentialsState } from "../studentsCredentials/StudentsCredentials"
import { paths } from "../../../../routes"

export interface ResetStudentsPasswordDialogProps
  extends Omit<BaseDialogProps, "header" | "body" | "onConfirm"> {
  classId: Class["id"]
  studentUsers: Array<StudentUser<ListUsersResult["data"][number]>>
}

const ResetStudentsPasswordDialog: FC<ResetStudentsPasswordDialogProps> = ({
  classId,
  studentUsers,
  ...baseDialogProps
}) => {
  const [resetStudentsPassword] = useResetStudentsPasswordMutation()
  const navigate = useNavigate()

  return (
    <BaseDialog
      {...baseDialogProps}
      header="Reset students' password"
      body="These students will have their passwords permanently changed. You will be given the option to print out the new passwords. Are you sure that you want to continue?"
      onConfirm={() => {
        const arg = studentUsers.reduce(
          (arg, { student: { id } }) => ({ ...arg, [id]: {} }),
          {} as ResetStudentsPasswordArg,
        )

        void resetStudentsPassword(arg)
          .unwrap()
          .then(result => {
            const first_names = studentUsers.reduce(
              (first_names, { first_name, student: { id } }) => ({
                ...first_names,
                [id]: first_name,
              }),
              {} as Record<Student["id"], StudentUser["first_name"]>,
            )

            navigate<StudentsCredentialsState>(
              generatePath(
                paths.teacher.dashboard.tab.classes.class.students.credentials
                  ._,
                { classId },
              ),
              {
                state: {
                  flow: "reset-multiple",
                  students: result.reduce(
                    (students, student) => [
                      ...students,
                      {
                        ...student,
                        user: {
                          ...student.user,
                          first_name: first_names[student.id],
                        },
                      },
                    ],
                    [] as StudentsCredentialsState["students"],
                  ),
                },
              },
            )
          })
          .catch(() => {
            navigate(
              generatePath(paths.teacher.dashboard.tab.classes.class._, {
                classId,
              }),
              {
                replace: true,
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
              },
            )
          })
      }}
    />
  )
}

export default ResetStudentsPasswordDialog
