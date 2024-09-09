import { Dialog, type DialogProps } from "@mui/material"
import { type FC } from "react"
import { type StudentUser } from "codeforlife/api"

import { type ListUsersResult } from "../../../../api/user"

export interface BaseStudentsDialogProps extends Omit<DialogProps, "onClose"> {
  studentUsers: Array<StudentUser<ListUsersResult["data"][number]>>
  onClose: () => void
}

const BaseStudentsDialog: FC<BaseStudentsDialogProps> = ({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  studentUsers,
  /* eslint-enable @typescript-eslint/no-unused-vars */
  ...dialogProps
}) => {
  return <Dialog {...dialogProps} />
}

export default BaseStudentsDialog
