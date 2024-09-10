import * as pages from "codeforlife/components/page"
import { type FC, useState } from "react"
import { Button } from "@mui/material"
import { SecurityOutlined as SecurityOutlinedIcon } from "@mui/icons-material"
import { type StudentUser } from "codeforlife/api"

import { type ListUsersResult } from "../../../../api/user"
import ResetStudentsPasswordDialog from "./ResetStudentsPasswordDialog"

export interface ClassProps {}

const Class: FC<ClassProps> = () => {
  const [dialog, setDialog] = useState<"reset-students-password">()
  // @ts-expect-error temp fix until setStudentUsers is used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [studentUsers, setStudentUsers] = useState<
    Record<
      ListUsersResult["data"][number]["id"],
      StudentUser<ListUsersResult["data"][number]>
    >
  >({
    // For testing purposes until this component is implemented
    27: {
      id: 27,
      first_name: "Student1",
      is_active: true,
      date_joined: new Date(),
      student: { id: 17, klass: "ZZ111", school: 2 },
    },
  })

  function closeDialog() {
    setDialog(undefined)
  }

  return (
    <>
      <pages.Section>
        <Button
          onClick={() => {
            setDialog("reset-students-password")
          }}
          endIcon={<SecurityOutlinedIcon />}
        >
          Reset password and login link
        </Button>
      </pages.Section>
      <ResetStudentsPasswordDialog
        open={dialog === "reset-students-password"}
        onClose={closeDialog}
        studentUsers={Object.values(studentUsers)}
      />
    </>
  )
}

export default Class
