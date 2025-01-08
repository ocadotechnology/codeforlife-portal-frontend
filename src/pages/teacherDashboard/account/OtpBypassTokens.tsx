import { type FC } from "react"
import { type RetrieveUserResult } from "../../../api/user"
import { type SchoolTeacherUser } from "codeforlife/api"

export interface OtpBackupTokensProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
}

const OtpBypassTokens: FC<OtpBackupTokensProps> = () => {
  return <>TODO</>
}

export default OtpBypassTokens
