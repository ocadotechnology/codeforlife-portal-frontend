import * as pages from "codeforlife/components/page"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"

import Class from "./class/Class"
import ClassTable from "./ClassTable"
import CreateClassForm from "./CreateClassForm"
import JoinClassRequest from "./joinClassRequest/JoinClassRequest"
import JoinClassRequestTable from "./JoinClassRequestTable"
import ResetStudentsPassword from "./resetStudentsPassword/ResetStudentsPassword"
import { type RetrieveUserResult } from "../../../api/user"
import TransferStudents from "./transferStudents/TransferStudents"
import UpdateStudentUser from "./updateStudentUser/UpdateStudentUser"

export interface ClassesProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
  view?:
    | "class"
    | "join-class-request"
    | "reset-students-password"
    | "update-student-user"
    | "transfer-students"
}

const Classes: FC<ClassesProps> = ({ authUser, view }) => {
  if (view) {
    return {
      class: <Class />,
      "join-class-request": <JoinClassRequest />,
      "reset-students-password": <ResetStudentsPassword />,
      "update-student-user": <UpdateStudentUser />,
      "transfer-students": <TransferStudents />,
    }[view]
  }

  return (
    <>
      <pages.Section>
        <ClassTable authUser={authUser} />
      </pages.Section>
      <pages.Section>
        <JoinClassRequestTable authUser={authUser} />
      </pages.Section>
      <pages.Section boxProps={{ bgcolor: "info.main" }}>
        <CreateClassForm authUser={authUser} />
      </pages.Section>
    </>
  )
}

export default Classes
