import { type Class } from "codeforlife/api"
import { type FC } from "react"
import { useNavigate } from "codeforlife/hooks"

import BaseDialog, { type BaseDialogProps } from "./BaseDialog"
import { paths } from "../../../../routes"
import { useDestroyClassMutation } from "../../../../api/klass"

export interface DeleteClassDialogProps
  extends Omit<BaseDialogProps, "header" | "body" | "onConfirm"> {
  classId: Class["id"]
}

const DeleteClassDialog: FC<DeleteClassDialogProps> = ({
  classId,
  ...baseDialogProps
}) => {
  const [destroyClass] = useDestroyClassMutation()
  const navigate = useNavigate()

  return (
    <BaseDialog
      {...baseDialogProps}
      header="Delete class"
      body="This class will be permanently deleted. Are you sure?"
      onConfirm={() => {
        destroyClass(classId)
          .unwrap()
          .then(() => {
            navigate(paths.teacher.dashboard.tab.classes._, {
              replace: true,
              state: {
                notifications: [
                  { props: { children: "Successfully delete class." } },
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
                    props: { error: true, children: "Failed to delete class." },
                  },
                ],
              },
            })
          })
      }}
    />
  )
}

export default DeleteClassDialog
