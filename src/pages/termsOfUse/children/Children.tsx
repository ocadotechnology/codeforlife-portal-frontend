import * as pages from "codeforlife/components/page"
import { type FC } from "react"

import Alerting from "./Alerting"
import IntellectualProperty from "./IntellectualProperty"
import Introduction from "./Introduction"
import Misuse from "./Misuse"
import OtherLimits from "./OtherLimits"
import Responsibilities from "./Responsibilities"
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
