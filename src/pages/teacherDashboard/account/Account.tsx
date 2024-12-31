import * as page from "codeforlife/components/page"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"
import { Typography } from "@mui/material"

import * as forms from "../../../components/form"
import BackupTokens from "./BackupTokens"
import Manage2FAForm from "./Manage2FAForm"
import { type RetrieveUserResult } from "../../../api/user"
import Setup2FA from "./Setup2FA.tsx"

export interface AccountProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
  view?: "otp" | "backupTokens"
}

const Account: FC<AccountProps> = ({ authUser, view }) => {
  if (view) {
    return {
      otp: <Setup2FA user={authUser} />,
      backupTokens: <BackupTokens user={authUser} />,
    }[view]
  }

  return (
    <>
      <page.Section>
        <Typography align="center" variant="h4">
          Your account
        </Typography>
        <forms.UpdateAccountForm user={authUser} />
      </page.Section>
      <page.Section boxProps={{ bgcolor: "info.main" }}>
        <Typography variant="h5">Two factor authentication</Typography>
        <Typography>
          Use your smartphone or tablet to enhance your account&apos;s security
          by using an authenticator app.
        </Typography>
        <Manage2FAForm user={authUser} />
      </page.Section>
      <page.Section>
        <forms.DeleteAccountForm user={authUser} />
      </page.Section>
    </>
  )
}

export default Account
