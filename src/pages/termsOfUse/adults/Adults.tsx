import * as pages from "codeforlife/components/page"
import { type FC } from "react"

import Alerting from "./Alerting.tsx"
import IntellectualProperty from "./IntellectualProperty.tsx"
import Introduction from "./Introduction.tsx"
import Liability from "./Liability.tsx"
import Miscellaneous from "./Miscellaneous.tsx"
import Misuse from "./Misuse.tsx"
import Prohibitions from "./Prohibitions.tsx"
import { TableOfContents } from "../../../components"
import TypesOfMembership from "./TypesOfMembership.tsx"

export interface AdultsProps {}

const Adults: FC<AdultsProps> = () => (
  <pages.Section>
    <TableOfContents
      contents={[
        {
          header: "Introduction",
          children: <Introduction />,
        },
        {
          header: "Registration and Types of Membership",
          children: <TypesOfMembership />,
        },
        {
          header: "Misuse of Code for Life",
          children: <Misuse />,
        },
        {
          header: "Prohibitions",
          children: <Prohibitions />,
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
          header: "Our Liability",
          children: <Liability />,
        },
        {
          header: "Miscellaneous",
          children: <Miscellaneous />,
        },
      ]}
    />
  </pages.Section>
)

export default Adults
