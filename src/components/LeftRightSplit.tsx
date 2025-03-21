import { type FC, type ReactNode } from "react"
import { Stack, type StackProps } from "@mui/material"

export interface LeftRightSplitProps {
  containerProps?: Omit<StackProps, "direction" | "children" | "gap">
  left: ReactNode
  leftProps?: Omit<StackProps, "width" | "children">
  right: ReactNode
  rightProps?: Omit<StackProps, "width" | "children">
}

const LeftRightSplit: FC<LeftRightSplitProps> = ({
  containerProps,
  left,
  leftProps,
  right,
  rightProps,
}) => (
  <Stack direction={{ md: "row" }} gap={{ xs: 2, md: 4 }} {...containerProps}>
    <Stack width={{ md: "50vw" }} {...leftProps}>
      {left}
    </Stack>
    <Stack width={{ md: "50vw" }} {...rightProps}>
      {right}
    </Stack>
  </Stack>
)

export default LeftRightSplit
