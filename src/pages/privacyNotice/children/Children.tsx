import * as pages from "codeforlife/components/page"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { Typography } from "@mui/material"

import ChangeOfPurpose from "./ChangeOfPurpose"
import ChangesToPrivacyNotice from "./ChangesToPrivacyNotice"
import Cookies from "./Cookies"
import ExtraHelp from "./ExtraHelp"
import HowLongWeKeepData from "./HowLongWeKeepData"
import HowToComplain from "./HowToComplain"
import HowToContactUs from "./HowToContactUs"
import HowWeUseInfo from "./HowWeUseInfo"
import KeepingInfoSecure from "./KeepingInfoSecure"
import PersonalInfo from "./PersonalInfo"
import { TableOfContents } from "../../../components"
import WhoWeAre from "./WhoWeAre"
import WhoWeShareInfoWith from "./WhoWeShareInfoWith"
import YourRights from "./YourRights"
import { paths } from "../../../routes"

export interface ChildrenProps {}

const Children: FC<ChildrenProps> = () => (
  <pages.Section>
    <Typography fontWeight="bold">Last Updated: 17th February 2025</Typography>
    <Typography>
      This Privacy Notice will tell you what information we collect about you,
      how we use it, who we share it with, how long we keep it and how you can
      ask us about it.
    </Typography>
    <Typography>
      This is the version of the Privacy Notice without all the legal jargon (we
      understand how overly complicated some privacy policies can be!) A full
      version of the Privacy Notice can be found by clicking&nbsp;
      <Link to={paths.privacyNotice.tab.privacyNotice._}>here</Link>.
    </Typography>
    <Typography>
      What we mean by ‘personal information’ is any information that can be used
      to identify you, such as your name and email address.
    </Typography>
    <TableOfContents
      contents={[
        {
          header: "Who we are",
          children: <WhoWeAre />,
        },
        {
          header: "Personal information we collect about you",
          children: <PersonalInfo />,
        },
        {
          header: "How we will use the information",
          children: <HowWeUseInfo />,
        },
        {
          header: "Change of purpose",
          children: <ChangeOfPurpose />,
        },
        {
          header: "Cookies & Similar technologies",
          children: <Cookies />,
        },
        {
          header: "Who might we share your personal information with?",
          children: <WhoWeShareInfoWith />,
        },
        {
          header: "How long will we keep your personal data?",
          children: <HowLongWeKeepData />,
        },
        {
          header: "Your rights",
          children: <YourRights />,
        },
        {
          header: "Keeping your information secure",
          children: <KeepingInfoSecure />,
        },
        {
          header: "How to complain",
          children: <HowToComplain />,
        },
        {
          header: "Changes to the Privacy Notice",
          children: <ChangesToPrivacyNotice />,
        },
        {
          header: "How to contact us",
          children: <HowToContactUs />,
        },
        {
          header: "Do you need extra help?",
          children: <ExtraHelp />,
        },
      ]}
    />
  </pages.Section>
)

export default Children
