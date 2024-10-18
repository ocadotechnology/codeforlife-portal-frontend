import { Stack, Typography } from "@mui/material"
import { type FC } from "react"

import { Card } from "../../components"
import RRLogoGreenImage from "../../images/RRGreenLogoImage.svg"
import { paths } from "../../routes"

export interface GamesProps {}

const Games: FC<GamesProps> = () => (
  <Stack spacing={4} alignItems="center">
    <Typography variant="h4" textAlign="center">
      Your games
    </Typography>
    <Stack direction="row" gap={5}>
      <Card
        title="Rapid Router"
        description="Rapid Router guides you, and makes learning to code easy and great fun. Using Blockly, you can advance through the levels to become an Ocado delivery hero."
        mediaProps={{
          title: "RapidRouter logo",
          image: RRLogoGreenImage,
        }}
        linkButtonProps={{
          children: "Play",
          to: paths.rapidRouter._,
        }}
      />
    </Stack>
  </Stack>
)

export default Games
