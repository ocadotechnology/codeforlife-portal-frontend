import { type FC } from "react"
import { Typography } from "@mui/material"

import { Introduction } from "../../components"
import RapidRouterImage from "../../images/rapid_router.png"

export interface OurProductsProps {}

const OurProducts: FC<OurProductsProps> = () => (
  <Introduction
    header="Our products"
    imageProps={{
      alt: "Rapid Router",
      src: RapidRouterImage,
    }}
  >
    <Typography fontWeight="bold">The website</Typography>
    <Typography>
      This is the gateway for users to get to know who we are and what we do. It
      hosts our web-based games and plenty of teaching resources, and the
      teacher dashboard for class management.
    </Typography>
    <Typography fontWeight="bold">Rapid Router</Typography>
    <Typography>
      An introduction to coding that is aimed at ages 5 to 14. Built on Blockly,
      it&apos;s a visual programming language similar to Scratch. Rapid Router
      is our flagship game with the biggest user base.
    </Typography>
    <Typography fontWeight="bold">Python Den</Typography>
    <Typography mb={0}>
      Our new Python Den uses Blockly, Blockly/Python split screen, and an IDE.
      It takes students from no previous Python experience to a foundation in
      Python, helping prepare them for GCSE and beyond.
    </Typography>
  </Introduction>
)

export default OurProducts
