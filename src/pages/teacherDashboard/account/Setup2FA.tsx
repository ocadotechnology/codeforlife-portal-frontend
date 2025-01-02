import { type FC } from "react"
import { type RetrieveUserResult } from "../../../api/user"
import { type SchoolTeacherUser } from "codeforlife/api"

export interface Setup2FAProps {
  user: SchoolTeacherUser<RetrieveUserResult>
}

const Setup2FA: FC<Setup2FAProps> = () => {
  return <>TODO</>
}

export default Setup2FA
