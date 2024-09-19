import * as pages from "codeforlife/components/page"
import { type FC } from "react"
import { getParam } from "codeforlife/utils/router"

import Adults from "./adults/Adults"
import Children from "./children/Children"
import { paths } from "../../routes"

export interface PrivacyNoticeProps {}

const PrivacyNotice: FC<PrivacyNoticeProps> = () => (
  <pages.Page>
    <pages.TabBar
      header="Privacy notice"
      originalPath={paths.privacyNotice.tab._}
      tabs={[
        {
          label: "Privacy notice",
          children: <Adults />,
          path: getParam(paths.privacyNotice.tab.privacyNotice, "tab"),
        },
        {
          label: "Child-friendly",
          children: <Children />,
          path: getParam(paths.privacyNotice.tab.childFriendly, "tab"),
        },
      ]}
    />
  </pages.Page>
)

export default PrivacyNotice
