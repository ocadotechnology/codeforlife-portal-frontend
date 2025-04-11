import * as pages from "codeforlife/components/page"
import { type FC } from "react"

import Alerting from "./Alerting.tsx"
import IntellectualProperty from "./IntellectualProperty.tsx"
import Introduction from "./Introduction.tsx"
import Misuse from "./Misuse.tsx"
import OtherLimits from "./OtherLimits.tsx"
import Responsibilities from "./Responsibilities.tsx"
import { TableOfContents } from "../../../components"

export interface ChildrenProps {}

const Children: FC<ChildrenProps> = () => (
  <pages.Section>
    <TableOfContents
      contents={[
        {
          header: "Introduction",
          children: <Introduction />,
        },
        {
          header: "Misuse of the Code for Life site",
          children: <Misuse />,
        },
        {
          header: "Other limits of use",
          children: <OtherLimits />,
        },
        {
          header: "Alerting Code for Life",
          children: <Alerting />,
        },
        {
          header: "Intellectual Property",
          children: <IntellectualProperty />,
        },
        {
          header: "Our responsibilities",
          children: <Responsibilities />,
        },
      ]}
    />
  </pages.Section>
)

export default Children
