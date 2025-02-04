import * as page from "codeforlife/components/page"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"
import { Typography } from "@mui/material"

import * as forms from "../../../components/form"
import ManageOtpForm from "./ManageOtpForm.tsx"
import OtpBypassTokens from "./OtpBypassTokens.tsx"
import { type RetrieveUserResult } from "../../../api/user"
import SetupOtp from "./SetupOtp.tsx"

export interface AccountProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
  view?: "otp" | "otp-bypass-tokens"
}

const Account: FC<AccountProps> = ({ authUser, view }) => {
  if (view) {
    return {
      otp: <SetupOtp authUser={authUser} />,
      "otp-bypass-tokens": <OtpBypassTokens authUser={authUser} />,
    }[view]
  }

  return (
    <>
      <page.Section>
        <Typography align="center" variant="h4">
          Your account
        </Typography>
        <forms.UpdateAccountForm authUser={authUser} />
      </page.Section>
      <page.Section boxProps={{ bgcolor: "info.main" }}>
        <Typography variant="h5">Two factor authentication</Typography>
        <Typography>
          Use your smartphone or tablet to enhance your account&apos;s security
          by using an authenticator app.
        </Typography>
        <ManageOtpForm authUser={authUser} />
      </page.Section>
      <page.Section>
        <forms.DeleteAccountForm authUser={authUser} />
      </page.Section>
    </>
  )
}

export default Account
