import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import Image from "codeforlife/components/Image.tsx"
import type { ImageProps } from "codeforlife/components/Image.tsx"

import DeeImage from "../../images/dee.png"
import KirstyImage from "../../images/kirsty.png"
import NigelImage from "../../images/nigel.png"
import PhilImage from "../../images/phil.png"
import WesImage from "../../images/wes.png"

const Character: FC<{
  imageProps: ImageProps
  name: string
  description: string
}> = ({ imageProps, name, description }) => (
  <Stack sx={{ textAlign: "left", width: "20%" }}>
    <Image {...imageProps} />
    <Typography variant="h5">{name}</Typography>
    <Typography>{description}</Typography>
  </Stack>
)

export interface StatisticsProps {}

const Characters: FC<StatisticsProps> = () => {
  return (
    <>
      <Stack textAlign="center">
        <Typography variant="h4">Meet the characters</Typography>
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
              style: { width: "fit-content", margin: "auto" },
            }}
            name="Wes"
            description="Wes is as cunning as a fox, which is weird, because he's actually a wolf."
          />
          <Character
            imageProps={{
              title: "Kirsty",
              alt: "Kirsty",
              src: KirstyImage,
              style: { width: "fit-content", margin: "auto" },
            }}
            name="Kirsty"
            description="Kirsty is a girl with big ambitions. Her biggest ambition is to take the crown, and rule the world!"
          />
          <Character
            imageProps={{
              title: "Dee",
              alt: "Dee",
              src: DeeImage,
              style: { width: "fit-content", margin: "auto" },
            }}
            name="Dee"
            description="Dee is a Mark II DeliviBot. She's super friendly and her wire hair sparks when she laughs."
          />
          <Character
            imageProps={{
              title: "Nigel",
              alt: "Nigel",
              src: NigelImage,
              style: { width: "fit-content", margin: "auto" },
            }}
            name="Nigel"
            description="Nigel is the tallest kid in his class, and he's growing taller by the day."
          />
          <Character
            imageProps={{
              title: "Phil",
              alt: "Phil",
              src: PhilImage,
              style: { width: "fit-content", margin: "auto" },
            }}
            name="Phil"
            description="Phil is a Boarsnark, however, he is different to most Boarsnarks because he's very kind, and very gentle."
          />
        </Stack>
      </Stack>
    </>
  )
}

export default Characters
