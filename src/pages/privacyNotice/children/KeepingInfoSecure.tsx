import { type FC } from "react"
import { Typography } from "@mui/material"

export interface KeepingInfoSecureProps {}

const KeepingInfoSecure: FC<KeepingInfoSecureProps> = () => (
  <>
    <Typography>
      Everyone at Ocado understands the need to keep your personal information
      safe so we’ve put steps in place to help prevent it from being
      accidentally lost or used in ways you wouldn’t expect.
    </Typography>
    <Typography mb={0}>
      Only those people in Ocado who have a business need to know your personal
      information are allowed to have access to it, and they have to keep it
      confidential.
    </Typography>
  </>
)

export default KeepingInfoSecure
