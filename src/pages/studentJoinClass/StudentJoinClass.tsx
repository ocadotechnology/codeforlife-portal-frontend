import * as page from "codeforlife/components/page"
import { type FC } from "react"
import type { IndependentUser } from "codeforlife/api"
import type { SessionMetadata } from "codeforlife/hooks"
import { Typography } from "@mui/material"
import { handleResultState } from "codeforlife/utils/api"

import { type RetrieveUserResult, useRetrieveUserQuery } from "../../api/user"
import RequestPending from "./RequestPending.tsx"
import RequestToJoinClassForm from "./RequestToJoinClassForm.tsx"

const _StudentJoinClass: FC<SessionMetadata> = ({ user_id }) => {
  return handleResultState(useRetrieveUserQuery(user_id), authUser => {
    const user = authUser as IndependentUser<RetrieveUserResult>

    return (
      <page.Section>
        <Typography align="center" variant="h4">
          Join a school or club
        </Typography>
        {user.requesting_to_join_class ? (
          <RequestPending user={user} />
        ) : (
          <>
            <Typography variant="h5">
              Request to join a school or club
            </Typography>
            <Typography>
              If you want to link your Code For Life account with a school or
              club, ask a teacher to enable external requests and provide you
              with the Class Access Code for the class you want to join. Simply
              add the Class Access Code to the form below and submit.
            </Typography>
            <Typography>
              <strong>Warning:</strong> once the teacher accepts you to their
              class, that teacher and the school or club will manage your
              account.
            </Typography>
            <Typography>
              If successful, the teacher will contact you with your new login
              details.
            </Typography>
            <RequestToJoinClassForm
              indyUser={{
                id: user.id,
                requesting_to_join_class: user.requesting_to_join_class!.id,
              }}
            />
          </>
        )}
      </page.Section>
    )
  })
}

export interface StudentJoinClassProps {}

const StudentJoinClass: FC<StudentJoinClassProps> = () => (
  <page.Page session={{ userType: "indy" }}>{_StudentJoinClass}</page.Page>
)

export default StudentJoinClass
