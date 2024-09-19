import { type Class, type StudentUser } from "codeforlife/api"
import { type FC } from "react"
import { generatePath } from "react-router-dom"
import { useNavigate } from "codeforlife/hooks"

import BaseDialog, { type BaseDialogProps } from "./BaseDialog"
import {
  type ResetStudentsPasswordArg,
  useResetStudentsPasswordMutation,
} from "../../../../api/student"
import { type ListUsersResult } from "../../../../api/user"
import { type ResetStudentsPasswordState } from "./ResetStudentsPassword"
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
        const resetStudentsPasswordArg = studentUsers.reduce(
          (arg, { student: { id } }) => ({ ...arg, [id]: {} }),
          {} as ResetStudentsPasswordArg,
        )

        void resetStudentsPassword(resetStudentsPasswordArg)
          .unwrap()
          .then(resetStudentsPasswordResult => {
            navigate<ResetStudentsPasswordState>(
              generatePath(
                paths.teacher.dashboard.tab.classes.class.students.resetPassword
                  ._,
                { classId },
              ),
              { state: { studentUsers, resetStudentsPasswordResult } },
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
