import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { Typography } from "@mui/material"

export interface HowToContactUsProps {}

const HowToContactUs: FC<HowToContactUsProps> = () => (
  <>
    <Typography mb={0}>
      Please contact our Data Protection Officer at&nbsp;
      <Link to="mailto:individualrights@ocado.com" target="_blank">
        individualrights@ocado.com
      </Link>
      &nbsp;if you have any questions about this Privacy Notice or the
      information we hold about you.
    </Typography>
  </>
)

export default HowToContactUs
