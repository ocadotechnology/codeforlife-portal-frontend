import { type FC } from "react"
import { type RetrieveUserResult } from "../../../api/user"
import { type SchoolTeacherUser } from "codeforlife/api"

export interface SetupOtpProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
}

const SetupOtp: FC<SetupOtpProps> = () => {
  return <>TODO</>
}

export default SetupOtp
