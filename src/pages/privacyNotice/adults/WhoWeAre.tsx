import { type FC } from "react"
import { Typography } from "@mui/material"

export interface WhoWeAreProps {}

const WhoWeAre: FC<WhoWeAreProps> = () => (
  <>
    <Typography>
      We are a company called “Ocado Innovation Limited” or “Ocado Technology”,
      and we own the Code for Life learning portal. In this notice, we also use
      the name “Ocado” when we refer to us. Our office is at Buildings 1 & 2
      Trident Place, Hatfield Business Park, Mosquito Way, Hatfield, AL10 9UL.
    </Typography>
    <Typography mb={0}>
      We are responsible for the personal information we collect about you on
      the Code for Life portal.
    </Typography>
  </>
)

export default WhoWeAre
