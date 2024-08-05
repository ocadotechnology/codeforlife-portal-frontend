import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"

import Class from "./Class"
import JoinClassRequest from "./JoinClassRequest"
import { type RetrieveUserResult } from "../../../api/user"

export interface ClassesProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
  view?: "class" | "join-class-request"
}

const Classes: FC<ClassesProps> = ({ authUser, view }) => {
  if (view) {
    return {
      class: <Class />,
      "join-class-request": <JoinClassRequest />,
    }[view]
  }

  return <>Classes</>
}

export default Classes
