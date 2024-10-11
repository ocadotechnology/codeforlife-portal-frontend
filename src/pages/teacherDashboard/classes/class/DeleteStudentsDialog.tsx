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
  onClose,
  ...otherBaseDialogProps
}) => {
  const [destroyStudents] = useDestroyStudentsMutation()
  const navigate = useNavigate()

  return (
    <BaseDialog
      {...otherBaseDialogProps}
      onClose={onClose}
      header="Delete students"
      body="These students will be permanently deleted. Are you sure?"
      onConfirm={() => {
        destroyStudents(studentUsers.map(({ student: { id } }) => id))
          .unwrap()
          .then(() => {
            onClose()
            navigate(".", {
              replace: true,
              state: {
                notifications: [
                  {
                    props: {
                      children: "Successfully deleted students from class.",
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
