import * as pages from "codeforlife/components/page"
import { type FC } from "react"
import { getParam } from "codeforlife/utils/router"

import Adults from "./adults/Adults"
import Children from "./children/Children"
import { paths } from "../../routes"

export interface TermsOfUseProps {}

const TermsOfUse: FC<TermsOfUseProps> = () => (
  <pages.Page>
    <pages.TabBar
      header="Terms Of Use"
      originalPath={paths.termsOfUse.tab._}
      tabs={[
        {
          label: "Terms of use",
          children: <Adults />,
          path: getParam(paths.termsOfUse.tab.termsOfUse, "tab"),
        },
        {
          label: "Child-friendly",
          children: <Children />,
          path: getParam(paths.termsOfUse.tab.childFriendly, "tab"),
        },
      ]}
    />
  </pages.Page>
)

export default TermsOfUse
