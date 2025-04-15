import type { FC, ReactNode } from "react"
import {
  Image,
  type ImageProps,
  YouTubeVideo,
  type YouTubeVideoProps,
} from "codeforlife/components"
import { Typography } from "@mui/material"

import LeftRightSplit, { type LeftRightSplitProps } from "./LeftRightSplit"

export interface IntroductionProps
  extends Omit<LeftRightSplitProps, "left" | "right"> {
  header: string
  imageProps?: ImageProps
  videoProps?: YouTubeVideoProps
  children: ReactNode
  reverse?: boolean
}

const Introduction: FC<IntroductionProps> = ({
  header,
  imageProps,
  videoProps,
  children,
  reverse = false,
  ...leftRightSplitProps
}) => {
  const left = (
    <>
      <Typography variant="h5">{header}</Typography>
      {children}
    </>
  )

  const right = imageProps ? (
    <Image marginY="auto" {...imageProps} />
  ) : (
    <YouTubeVideo marginY="auto" {...videoProps} />
  )

  return (
    <LeftRightSplit
      left={reverse ? right : left}
      right={reverse ? left : right}
      {...leftRightSplitProps}
    />
  )
}

export default Introduction
