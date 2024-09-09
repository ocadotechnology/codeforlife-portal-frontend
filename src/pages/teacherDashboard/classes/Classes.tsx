import * as pages from "codeforlife/components/page"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"

import Class from "./class/Class"
import ClassTable from "./ClassTable"
import CreateClassForm from "./CreateClassForm"
import JoinClassRequest from "./JoinClassRequest"
import JoinClassRequestTable from "./JoinClassRequestTable"
import ResetStudentsPassword from "./class/ResetStudentsPassword"
import { type RetrieveUserResult } from "../../../api/user"

export interface ClassesProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
  view?: "class" | "join-class-request" | "reset-students-password"
}

const Classes: FC<ClassesProps> = ({ authUser, view }) => {
  if (view) {
    return {
      class: <Class />,
      "join-class-request": <JoinClassRequest />,
      "reset-students-password": <ResetStudentsPassword />,
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
