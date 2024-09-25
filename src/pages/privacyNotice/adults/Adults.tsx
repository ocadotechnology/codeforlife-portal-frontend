import * as pages from "codeforlife/components/page"
import { type FC } from "react"
import { Typography } from "@mui/material"

import ChangeOfPurpose from "./ChangeOfPurpose"
import Changes from "./Changes"
import ContactUs from "./ContactUs"
import Cookies from "./Cookies"
import ExtraHelp from "./ExtraHelp"
import HowToComplain from "./HowToComplain"
import HowWeUseInfo from "./HowWeUseInfo"
import InfoSecurity from "./InfoSecurity"
import KeepInfo from "./KeepInfo"
import OurCommitment from "./OurCommitment"
import SharingInfo from "./SharingInfo"
import { TableOfContents } from "../../../components"
import TypesOfInfo from "./TypesOfInfo"
import WhoWeAre from "./WhoWeAre"
import YourRights from "./YourRights"

export interface AdultsProps {}

const Adults: FC<AdultsProps> = () => {
  const lastUpdated = "11th April 2024"

  return (
    <pages.Section>
      <Typography fontWeight="bold">Last Updated: {lastUpdated}</Typography>
      <Typography>
        Please read this notice carefully. This notice contains important
        information on who manages the Code for Life portal, how and why we
        collect information about you (for example, your name and email
        address), how we use your information, and with which persons we share
        your information. We also explain what rights you have in relation to
        your personal information, for example, the right to say no to the use
        of your information in certain cases, and how to contact us if you want
        to find out more about your rights or if you have other questions about
        this notice.
      </Typography>
      <TableOfContents
        contents={[
          {
            header: "Our commitment",
            children: <OurCommitment />,
          },
          {
            header: "Who we are",
            children: <WhoWeAre />,
          },
          {
            header: "Types of information we hold about you",
            children: <TypesOfInfo />,
          },
          {
            header: "How we will use information about you",
            children: <HowWeUseInfo />,
          },
          {
            header: "Change of purpose",
            children: <ChangeOfPurpose />,
          },
          {
            header: "Cookies",
            children: <Cookies />,
          },
          {
            header: "Sharing your personal information with other persons",
            children: <SharingInfo />,
          },
          {
            header: "How long will we keep your personal information?",
            children: <KeepInfo />,
          },
          {
            header: "Your rights",
            children: <YourRights />,
          },
          {
            header: "Keeping your personal information secure",
            children: <InfoSecurity />,
          },
          {
            header: "How to complain",
            children: <HowToComplain />,
          },
          {
            header: "Changes to this Privacy Notice",
            children: <Changes lastUpdated={lastUpdated} />,
          },
          {
            header: "How to contact us",
            children: <ContactUs />,
          },
          {
            header: "Do you need extra help?",
            children: <ExtraHelp />,
          },
        ]}
      />
    </pages.Section>
  )
}

export default Adults
