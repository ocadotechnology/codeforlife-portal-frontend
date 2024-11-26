import * as page from "codeforlife/components/page"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"
import { Typography } from "@mui/material"

import * as forms from "../../../components/form"
// import Manage2FAForm from "./Manage2FAForm"
import { type RetrieveUserResult } from "../../../api/user"

export interface AccountProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
  view?: "otp"
}

const Account: FC<AccountProps> = ({ authUser }) => {
  return (
    <>
      <page.Section>
        <Typography align="center" variant="h4">
          Your account
        </Typography>
        <forms.UpdateAccountForm user={authUser} />
      </page.Section>
      {/*<page.Section boxProps={{ bgcolor: "info.main" }}>*/}
      {/*  <Manage2FAForm />*/}
      {/*</page.Section>*/}
      <page.Section>
        <forms.DeleteAccountForm user={authUser} />
      </page.Section>
    </>
  )
}

export default Account
