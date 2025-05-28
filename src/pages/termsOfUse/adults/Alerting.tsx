import { Link as MuiLink, Typography } from "@mui/material"
import { type FC } from "react"

export interface AlertingProps {}

const Alerting: FC<AlertingProps> = () => (
  <>
    {/*TODO: Use Freshdesk hook*/}
    <Typography>
      If you see anything on the Code for Life portal which appears to infringe
      any part of the Terms & Conditions, then please inform us via the{" "}
      <MuiLink>Contact Us</MuiLink> section of this site.
    </Typography>
    <Typography>
      We do not endorse or take responsibility for the content of any third
      party sites that link to or from Code for Life.
    </Typography>
  </>
)

export default Alerting
