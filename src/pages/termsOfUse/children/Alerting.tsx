import { Link as MuiLink, Typography } from "@mui/material"
import { type FC } from "react"

export interface AlertingProps {}

const Alerting: FC<AlertingProps> = () => (
  <>
    {/*TODO: Use Freshdesk hook*/}
    <Typography>
      If you see anything on the Code for Life portal which you think breaks the
      rules in our Terms of Use, then please let us know by using the{" "}
      <MuiLink>Contact Us</MuiLink> section of the site.
    </Typography>
    <Typography>
      The Code for Life site has links to websites that are run by other
      organisations, and other organisation websites will sometimes have links
      to our site. We have no control over these other websites and so are not
      responsible for their contents.
    </Typography>
  </>
)

export default Alerting
