import { type FC } from "react"
import { Typography } from "@mui/material"

export interface ChangesProps {}

const Changes: FC<ChangesProps> = () => (
  <>
    <Typography>
      This Privacy Notice was last updated on 25th January 2023.
    </Typography>
    <Typography mb={0}>
      We may change this Privacy Notice from time to time and you should check
      it regularly. If we make any material changes to this notice we will
      inform via appropriate means (e.g. email).
    </Typography>
  </>
)

export default Changes
