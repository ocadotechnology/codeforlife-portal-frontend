import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"

import { type RetrieveUserResult } from "../../../api/user"

export interface AccountProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
}

const Account: FC<AccountProps> = ({ authUser }) => {
  return <>TODO</>
}

export default Account
