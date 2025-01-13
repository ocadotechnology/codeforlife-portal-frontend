import { type FC } from "react"
import { type RetrieveUserResult } from "../../../api/user"
import { type SchoolTeacherUser } from "codeforlife/api"

export interface OtpBypassTokensProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
}

const OtpBypassTokens: FC<OtpBypassTokensProps> = () => {
  return <>TODO</>
}

export default OtpBypassTokens
