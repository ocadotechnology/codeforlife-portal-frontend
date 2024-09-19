import { type FC } from "react"
import { Typography } from "@mui/material"

export interface KeepInfoProps {}

const KeepInfo: FC<KeepInfoProps> = () => (
  <>
    <Typography>
      We will only retain your personal information for as long as you have an
      active account, unless we need to retain this information for longer,
      after your account is deactivated, in order to protect our legal interests
      and establish, exercise or defend a legal claim. If you deactivate your
      account, we may anonymise your information and use it for a period of time
      in an anonymous format for research and other business purposes, such as
      business analytics.
    </Typography>
    <Typography mb={0}>
      For users that have registered but whose accounts are inactive, we will
      delete your personal information after 3 years of inactivity.
    </Typography>
  </>
)

export default KeepInfo
