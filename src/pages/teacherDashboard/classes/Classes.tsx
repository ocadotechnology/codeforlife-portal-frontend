import * as pages from "codeforlife/components/page"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"

import Class from "./Class"
import ClassTable from "./ClassTable"
import JoinClassRequest from "./JoinClassRequest"
import JoinClassRequestTable from "./JoinClassRequestTable"
import { type RetrieveUserResult } from "../../../api/user"

export interface ClassesProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
  view?: "class" | "join-class-request"
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Classes: FC<ClassesProps> = ({ authUser, view }) => {
  if (view) {
    return {
      class: <Class />,
      "join-class-request": <JoinClassRequest />,
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
    </>
  )
}

export default Classes
