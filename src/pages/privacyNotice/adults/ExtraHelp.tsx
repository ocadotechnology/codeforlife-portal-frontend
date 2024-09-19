import { type FC } from "react"
import { Typography } from "@mui/material"

export interface ExtraHelpProps {}

const ExtraHelp: FC<ExtraHelpProps> = () => (
  <>
    <Typography mb={0}>
      If you would like this Notice in another format (for example: audio, large
      print, braille) please contact us (see “How to contact us” above).
    </Typography>
  </>
)

export default ExtraHelp
