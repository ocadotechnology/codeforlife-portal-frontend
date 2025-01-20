import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"

import { type RetrieveUserResult } from "../../../api/user"
import SetupOtp from "./setupOtp/SetupOtp"

export interface AccountProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
  view?: "setup-otp"
}

const Account: FC<AccountProps> = ({ authUser, view }) => {
  if (view) {
    return {
      "setup-otp": <SetupOtp authUserId={authUser.id} />,
    }[view]
  }

  return <>TODO</>
}

export default Account
