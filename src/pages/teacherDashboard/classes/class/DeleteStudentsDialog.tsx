import { type FC } from "react"
import { type StudentUser } from "codeforlife/api"
import { useNavigate } from "codeforlife/hooks"

import BaseDialog, { type BaseDialogProps } from "./BaseDialog"
import { type ListUsersResult } from "../../../../api/user"
import { useDestroyStudentsMutation } from "../../../../api/student"

export interface DeleteStudentsDialogProps
  extends Omit<BaseDialogProps, "header" | "body" | "onConfirm"> {
  studentUsers: Array<StudentUser<ListUsersResult["data"][number]>>
}

const DeleteStudentsDialog: FC<DeleteStudentsDialogProps> = ({
  studentUsers,
  ...baseDialogProps
}) => {
  const [destroyStudents] = useDestroyStudentsMutation()
  const navigate = useNavigate()

  return (
    <BaseDialog
      {...baseDialogProps}
      header="Delete students"
      body="These students will be permanently deleted. Are you sure?"
      onConfirm={() => {
        destroyStudents(studentUsers.map(({ student: { id } }) => id))
          .unwrap()
          .then(() => {
            navigate(".", {
              replace: true,
              state: {
                notifications: [
                  {
                    props: {
                      children: "Successfully delete students from class.",
                    },
                  },
                ],
              },
            })
          })
          .catch(() => {
            navigate(".", {
              state: {
                replace: true,
                notifications: [
                  {
                    props: {
                      error: true,
                      children: "Failed to delete students from class.",
                    },
                  },
                ],
              },
            })
          })
      }}
    />
  )
}

export default DeleteStudentsDialog
