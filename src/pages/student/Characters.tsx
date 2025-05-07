import { Image, type ImageProps } from "codeforlife/components"
import { Stack, Typography } from "@mui/material"
import { type FC } from "react"

import DeeImage from "../../images/dee.png"
import KirstyImage from "../../images/kirsty.png"
import NigelImage from "../../images/nigel.png"
import PhilImage from "../../images/phil.png"
import WesImage from "../../images/wes.png"

const Character: FC<{
  imageProps: Omit<ImageProps, "sx" | "style">
  name: string
  description: string
}> = ({ imageProps, name, description }) => (
  <Stack sx={{ width: "20%" }}>
    <Image
      style={{ width: "fit-content" }}
      sx={{ margin: "auto" }}
      {...imageProps}
    />
    <Typography variant="h5">{name}</Typography>
    <Typography>{description}</Typography>
  </Stack>
)

export interface StatisticsProps {}

const Characters: FC<StatisticsProps> = () => (
  <>
    <Stack>
      <Typography variant="h4" textAlign="center">
        Meet the characters
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        mt={3}
        sx={{ alignItems: "baseline" }}
      >
        <Character
          imageProps={{
            title: "Wes",
            alt: "Wes",
            src: WesImage,
          }}
          name="Wes"
          description="Wes is as cunning as a fox, which is weird, because he's actually a wolf."
        />
        <Character
          imageProps={{
            title: "Kirsty",
            alt: "Kirsty",
            src: KirstyImage,
          }}
          name="Kirsty"
          description="Kirsty is a girl with big ambitions. Her biggest ambition is to take the crown, and rule the world!"
        />
        <Character
          imageProps={{
            title: "Dee",
            alt: "Dee",
            src: DeeImage,
          }}
          name="Dee"
          description="Dee is a Mark II DeliviBot. She's super friendly and her wire hair sparks when she laughs."
        />
        <Character
          imageProps={{
            title: "Nigel",
            alt: "Nigel",
            src: NigelImage,
          }}
          name="Nigel"
          description="Nigel is the tallest kid in his class, and he's growing taller by the day."
        />
        <Character
          imageProps={{
            title: "Phil",
            alt: "Phil",
            src: PhilImage,
          }}
          name="Phil"
          description="Phil is a Boarsnark, however, he is different to most Boarsnarks because he's very kind, and very gentle."
        />
      </Stack>
    </Stack>
  </>
)

export default Characters
