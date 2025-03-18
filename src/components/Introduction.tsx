import type { FC, ReactNode } from "react"
import { Image } from "codeforlife/components"
import { Typography } from "@mui/material"

import LeftRightSplit, { type LeftRightSplitProps } from "./LeftRightSplit"

export interface IntroductionProps
  extends Omit<LeftRightSplitProps, "left" | "right"> {
  header: string
  img: { desc: string; src: string }
  children: ReactNode
  reverse?: boolean
}

const Introduction: FC<IntroductionProps> = ({
  header,
  img,
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

  const right = (
    <Image alt={img.desc} title={img.desc} src={img.src} marginY="auto" />
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
