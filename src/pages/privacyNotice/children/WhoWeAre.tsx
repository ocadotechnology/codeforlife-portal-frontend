import { type FC } from "react"
import { Typography } from "@mui/material"

export interface WhoWeAreProps {}

const WhoWeAre: FC<WhoWeAreProps> = () => (
  <>
    <Typography mb={0}>
      We are a company called “Ocado Innovation Limited” or “Ocado Technology”,
      and we run the Code for Life learning website. From now on in the Privacy
      Notice, we’ll just use the name “Ocado” to mean us. Our office is at
      Buildings 1 & 2 Trident Place, Hatfield Business Park, Mosquito Way,
      Hatfield, AL10 9UL, United Kingdom.
    </Typography>
  </>
)

export default WhoWeAre
