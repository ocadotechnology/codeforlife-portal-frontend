import * as pages from "codeforlife/components/page"
import { type FC, useState } from "react"
import { Navigate } from "codeforlife/components/router"
import { type User } from "codeforlife/api"
import { handleResultState } from "codeforlife/utils/api"

import SetupCompleted from "./SetupCompleted"
import SetupPending from "./SetupPending"
import { paths } from "../../../../routes"
import { useListAuthFactorsQuery } from "../../../../api/authFactor"

export interface SetupOtpProps {
  authUserId: User["id"]
}

const SetupOtp: FC<SetupOtpProps> = ({ authUserId }) => {
  const [completed, setCompleted] = useState(false)

  return handleResultState(
    useListAuthFactorsQuery({
      offset: 0,
      limit: 1,
      user: authUserId,
      type: "otp",
    }),
    ({ count }) =>
      count ? (
        <Navigate
          to={paths.teacher.dashboard.tab.account._}
          state={{
            notifications: [
              {
                props: {
                  error: true,
                  children: "One-time password already set up.",
                },
              },
            ],
          }}
        />
      ) : (
        <pages.Section>
          {completed ? (
            <SetupCompleted />
          ) : (
            <SetupPending
              onSetup={() => {
                setCompleted(true)
              }}
            />
          )}
        </pages.Section>
      ),
  )
}

export default SetupOtp
