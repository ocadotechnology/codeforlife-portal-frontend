import { ListItemText, Link as MuiLink, Typography } from "@mui/material"
import { type FC } from "react"
import { ItemizedList } from "codeforlife/components"

import { LeftRightSplit } from "../../../components"

export interface IntroductionProps {}

const Introduction: FC<IntroductionProps> = () => (
  <LeftRightSplit
    left={
      <>
        <Typography fontWeight="bold">
          We ask that you take the time to read and understand our Terms of Use
          and the Privacy Notice before registering for Code for Life. These
          Terms were last updated on 11th July 2022.
        </Typography>
        <Typography>
          Our Terms of Use set out the rules that we ask you to follow when
          using Code for Life. The rules cover:
        </Typography>
        <ItemizedList styleType="disc">
          <ListItemText>
            all Code for Life websites used to play the games, platforms and any
            other products or services that we make available to you
          </ListItemText>
          <ListItemText>
            all versions of “Rapid Router”, “Python Den”, “Kurono” and any other
            games, platforms and other products or services we released (whether
            online or otherwise)
          </ListItemText>
        </ItemizedList>
        <Typography fontWeight="bold">
          When you visit the Code for Life site or register with us you agree to
          follow these rules.
        </Typography>
      </>
    }
    right={
      <>
        <Typography fontWeight="bold">
          We may need to update our Terms of Use every now and then. If you have
          registered with us then we will email you to tell you about any
          changes we’ve made. We’ll also post a message up on the site so that
          any visitors will know that our Terms have changed. This page shows
          the date we last made a change so you’ll always be able to check when
          the Terms were most recently updated.
        </Typography>
        <Typography fontWeight="bold">
          Important: Please make sure to keep your email address up to date as
          we will use this to send you important messages about Code for Life.
          If you don’t keep it updated then it could lead to your access being
          restricted or your account deleted.
        </Typography>
        {/*TODO: Use Freshdesk hook*/}
        <Typography fontWeight="bold">
          You should use the <MuiLink>Contact Us form</MuiLink> if you need help
          or advice on how to use the site. Please be aware that we will never
          ask for personal information other than what is required to identify
          your account and answer your questions, and we will never ask for your
          password.
        </Typography>
      </>
    }
  />
)

export default Introduction
