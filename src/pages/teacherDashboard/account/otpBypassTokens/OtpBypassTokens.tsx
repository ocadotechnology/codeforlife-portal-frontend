import * as pages from "codeforlife/components/page"
import { type FC } from "react"
import { Navigate } from "codeforlife/components/router"
import { type User } from "codeforlife/api"
import { handleResultState } from "codeforlife/utils/api"

import OtpExists from "./OtpExists"
import { paths } from "../../../../routes"
import { useListAuthFactorsQuery } from "../../../../api/authFactor"

export interface OtpBypassTokensProps {
  authUserId: User["id"]
}

const OtpBypassTokens: FC<OtpBypassTokensProps> = ({ authUserId }) => (
  <pages.Section>
    {handleResultState(
      useListAuthFactorsQuery(
        {
          offset: 0,
          limit: 1,
          user: authUserId,
          type: "otp",
        },
        { refetchOnMountOrArgChange: true },
      ),
      ({ count: exists }) =>
        exists ? (
          <OtpExists />
        ) : (
          <Navigate
            to={paths.teacher.dashboard.tab.account.otp.setup._}
            replace
            state={{
              notifications: [
                {
                  props: {
                    error: true,
                    children: "One-time password not set up.",
                  },
                },
              ],
            }}
          />
        ),
    )}
  </pages.Section>
)

export default OtpBypassTokens
