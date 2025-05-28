import { type FC } from "react"
import { Typography } from "@mui/material"

export interface MiscellaneousProps {}

const Miscellaneous: FC<MiscellaneousProps> = () => (
  <Typography>
    The delay or failure of any party to exercise its rights provided for in
    these Terms & Conditions shall not be deemed a waiver of any further rights
    hereunder. If any provision of the Terms & Conditions is found to be
    unenforceable or invalid, that provision shall be limited or eliminated to
    the minimum extent necessary to enable the Terms & Conditions to remain in
    full force and effect. The Terms & Conditions shall be governed by and
    construed in accordance with the laws of England and Wales and the parties
    shall submit to the exclusive jurisdiction of the English courts.
  </Typography>
)

export default Miscellaneous
