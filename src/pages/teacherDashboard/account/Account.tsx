import * as pages from "codeforlife/components/page"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"
import { Typography } from "@mui/material"

import { DeleteAccountForm, UpdateAccountForm } from "../../../components/form"
import Otp from "./Otp"
import OtpBypassTokens from "./otpBypassTokens/OtpBypassTokens"
import { type RetrieveUserResult } from "../../../api/user"
import SetupOtp from "./setupOtp/SetupOtp"

export interface AccountProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
  view?: "setup-otp" | "otp-bypass-tokens"
}

const Account: FC<AccountProps> = ({ authUser, view }) => {
  if (view) {
    return {
      "setup-otp": <SetupOtp authUserId={authUser.id} />,
      "otp-bypass-tokens": <OtpBypassTokens authUser={authUser} />,
    }[view]
  }

  return (
    <>
      <pages.Section>
        <Typography align="center" variant="h4">
          Your account
        </Typography>
        <UpdateAccountForm authUser={authUser} />
      </pages.Section>
      <pages.Section boxProps={{ bgcolor: "info.main" }}>
        <Otp authUserId={authUser.id} />
      </pages.Section>
      <pages.Section>
        <DeleteAccountForm authUser={authUser} />
      </pages.Section>
    </>
  )
}

export default Account
