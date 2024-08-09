import * as page from "codeforlife/components/page"
import { type SessionMetadata, useQueryManager } from "codeforlife/hooks"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { Typography } from "@mui/material"

import UpdateAccountForm from "./UpdateAccountForm"
import { paths } from "../../router"
import { useRetrieveUserQuery } from "../../api/user"

export interface StudentAccountProps {
  userType: "student" | "indy"
}

const _StudentAccount: FC<SessionMetadata> = ({ user_type, user_id }) =>
  useQueryManager(useRetrieveUserQuery, user_id, user => (
    <>
      <page.Banner
        header={`Welcome, ${user.first_name}`}
        textAlign="center"
        bgcolor={user_type === "student" ? "tertiary" : "secondary"}
      />
      <page.Section>
        <UpdateAccountForm user={user} />
      </page.Section>
      {user_type === "indy" && (
        <>
          <page.Section boxProps={{ bgcolor: "info.main" }}>
            <Typography variant="h5">Join a school or club</Typography>
            <Typography>
              To find out about linking your Code For Life account with a school
              or club, click &apos;Join&apos;.
            </Typography>
            <LinkButton to={paths.indy.dashboard.joinClass._}>Join</LinkButton>
          </page.Section>
          <page.Section>
            {/* <DeleteAccountForm userType="independent" /> */}
          </page.Section>
        </>
      )}
    </>
  ))

const StudentAccount: FC<StudentAccountProps> = ({ userType }) => (
  <page.Page session={{ userType }}>{_StudentAccount}</page.Page>
)

export default StudentAccount
