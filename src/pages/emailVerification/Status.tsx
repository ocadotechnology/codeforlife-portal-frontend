import { Stack, Typography } from "@mui/material"
import { type FC } from "react"

import { Image, type ImageProps } from "codeforlife/components"
import { LinkButton } from "codeforlife/components/router"
import { ThemedBox, type ThemedBoxProps } from "codeforlife/theme"

import { themeOptions } from "../../app/theme"
import { paths } from "../../router"

export interface StatusProps {
  userType: ThemedBoxProps["userType"]
  header: string
  body: string[]
  imageProps: ImageProps
}

const Status: FC<StatusProps> = ({ userType, header, body, imageProps }) => (
  <ThemedBox withShapes options={themeOptions} userType={userType}>
    <Stack alignItems="center">
      <Typography variant="h4" paddingY={1} textAlign="center">
        {header}
      </Typography>
      <Image maxWidth="100px" marginY={5} {...imageProps} />
      <Stack>
        {body.map((text, index) => (
          <Typography key={index}>{text}</Typography>
        ))}
      </Stack>
      <LinkButton to={paths._} style={{ marginTop: 30 }}>
        Back to homepage
      </LinkButton>
    </Stack>
  </ThemedBox>
)

export default Status
