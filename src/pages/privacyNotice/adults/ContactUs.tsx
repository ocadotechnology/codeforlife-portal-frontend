import { Link, Typography } from "@mui/material"
import { type FC } from "react"

export interface ContactUsProps {}

const ContactUs: FC<ContactUsProps> = () => (
  <>
    <Typography mb={0}>
      Please contact our Data Protection Officer or us at&nbsp;
      <Link href="mailto:individualrights@ocado.com">
        individualrights@ocado.com
      </Link>
      &nbsp;if you have any questions about this Privacy Notice or the
      information we hold about you.
    </Typography>
  </>
)

export default ContactUs
