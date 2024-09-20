import { Button, Stack } from "@mui/material"
import { type Class, type StudentUser } from "codeforlife/api"
import { type FC, useState } from "react"
import { LinkButton } from "codeforlife/components/router"
import { SecurityOutlined as SecurityOutlinedIcon } from "@mui/icons-material"
import { generatePath } from "react-router-dom"

import { type ListUsersResult } from "../../../../api/user"
import ResetStudentsPasswordDialog from "./ResetStudentsPasswordDialog"
import { type TransferStudentsState } from "../transferStudents/TransferStudents"
import { paths } from "../../../../routes"

export interface StudentTableProps {
  classId: Class["id"]
}

const StudentTable: FC<StudentTableProps> = ({ classId }) => {
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
      <Stack className="button-row">
        <Button
          onClick={() => {
            setDialog("reset-students-password")
          }}
          endIcon={<SecurityOutlinedIcon />}
        >
          Reset password and login link
        </Button>
        {LinkButton<TransferStudentsState>({
          children: "Move",
          to: generatePath(
            paths.teacher.dashboard.tab.classes.class.students.transfer._,
            { classId },
          ),
          state: { studentUsers: Object.values(studentUsers) },
        })}
      </Stack>
      <ResetStudentsPasswordDialog
        classId={classId}
        open={dialog === "reset-students-password"}
        onClose={closeDialog}
        studentUsers={Object.values(studentUsers)}
      />
    </>
  )
}

export default StudentTable
