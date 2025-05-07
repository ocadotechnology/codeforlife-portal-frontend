import type { FC, ReactNode } from "react"
import {
  Image,
  type ImageProps,
  YouTubeVideo,
  type YouTubeVideoProps,
} from "codeforlife/components"
import { Typography } from "@mui/material"

import LeftRightSplit, { type LeftRightSplitProps } from "./LeftRightSplit"

export type IntroductionProps = Omit<LeftRightSplitProps, "left" | "right"> & {
  header: string
  children: ReactNode
  reverse?: boolean
} & (
    | {
        imageProps: ImageProps
      }
    | {
        videoProps: YouTubeVideoProps
      }
  )

const Introduction: FC<IntroductionProps> = ({
  header,
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

  let right = null

  if ("imageProps" in leftRightSplitProps) {
    right = <Image marginY="auto" {...leftRightSplitProps.imageProps} />
  } else {
    right = <YouTubeVideo marginY="auto" {...leftRightSplitProps.videoProps} />
  }

  return (
    <LeftRightSplit
      left={reverse ? right : left}
      right={reverse ? left : right}
      {...leftRightSplitProps}
    />
  )
}

export default Introduction
