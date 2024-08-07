import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"

import { type RetrieveUserResult } from "../../../api/user"

export interface ClassesProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
}

const Classes: FC<ClassesProps> = ({ authUser }) => {
  return <>TODO</>
}

export default Classes
