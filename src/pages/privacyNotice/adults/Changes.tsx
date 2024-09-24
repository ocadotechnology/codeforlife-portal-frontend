import { type FC } from "react"
import { Typography } from "@mui/material"

export interface ChangesProps {
  lastUpdated: string
}

const Changes: FC<ChangesProps> = ({ lastUpdated }) => (
  <>
    <Typography>
      This Privacy Notice was last updated on {lastUpdated}.
    </Typography>
    <Typography mb={0}>
      We may change this Privacy Notice from time to time and you should check
      it regularly. If we make any material changes to this notice we will
      inform via appropriate means (e.g. email).
    </Typography>
  </>
)

export default Changes
