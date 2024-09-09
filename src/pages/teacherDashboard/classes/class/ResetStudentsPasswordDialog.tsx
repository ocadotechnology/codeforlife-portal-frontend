import { Button, Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { generatePath } from "react-router"
import { useNavigate } from "codeforlife/hooks"

import BaseStudentsDialog, {
  type BaseStudentsDialogProps,
} from "./BaseStudentsDialog"
import {
  type ResetStudentsPasswordArg,
  useResetStudentsPasswordMutation,
} from "../../../../api/student"
import { type ResetStudentsPasswordState } from "./ResetStudentsPassword"
import { paths } from "../../../../routes"
import { useClassIdParam } from "../../../../app/hooks"

export interface ResetStudentsPasswordDialogProps
  extends BaseStudentsDialogProps {}

const ResetStudentsPasswordDialog: FC<
  ResetStudentsPasswordDialogProps
> = props => {
  const { studentUsers, onClose } = props

  const { classId } = useClassIdParam()!
  const [resetStudentsPassword] = useResetStudentsPasswordMutation()
  const navigate = useNavigate()

  return (
    <BaseStudentsDialog {...props}>
      <Typography variant="h5" textAlign="center">
        Delete students
      </Typography>
      <Typography>
        These students will be permanently deleted. Are you sure?
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} mt={5}>
        <Button variant="outlined" className="body" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            const resetStudentsPasswordArg = studentUsers.reduce(
              (arg, { student: { id } }) => ({ ...arg, [id]: {} }),
              {} as ResetStudentsPasswordArg,
            )

            void resetStudentsPassword(resetStudentsPasswordArg)
              .unwrap()
              .then(resetStudentsPasswordResult => {
                navigate<ResetStudentsPasswordState>(
                  generatePath(
                    paths.teacher.dashboard.tab.classes.class.students
                      .resetPassword._,
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
        >
          Confirm
        </Button>
      </Stack>
    </BaseStudentsDialog>
  )
}

export default ResetStudentsPasswordDialog
