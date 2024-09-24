import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { Typography } from "@mui/material"

export interface HowToComplainProps {}

const HowToComplain: FC<HowToComplainProps> = () => (
  <>
    <Typography>
      If you have a complaint about how we’ve used your personal information,
      you can write to our Data Protection Officer at&nbsp;
      <Link to="mailto:individualrights@ocado.com" target="_blank">
        individualrights@ocado.com
      </Link>
      .
    </Typography>
    <Typography>
      You also have the right to complain to the Information Commissioner’s
      Office (the ICO). The ICO’s role is to make sure organisations like Ocado
      use your personal information fairly and keep it safe. You may contact the
      ICO by telephoning them on the number below or by visiting their website.
    </Typography>
    <Typography>Telephone: +44 303 123 1113</Typography>
    <Typography mb={0}>
      Website:&nbsp;
      <Link to="https://ico.org.uk/concerns" target="_blank">
        https://ico.org.uk/concerns
      </Link>
    </Typography>
  </>
)

export default HowToComplain
