import {
  Stack,
  type StackProps,
  TableCell,
  type TableCellProps,
  tableCellClasses,
} from "@mui/material"
import { type FC } from "react"

export interface CellProps extends TableCellProps {
  alignItems?: StackProps["alignItems"]
  justifyContent?: StackProps["justifyContent"]
  direction?: StackProps["direction"]
}

const Cell: FC<CellProps> = ({
  children,
  sx,
  alignItems = "center",
  justifyContent = "flex-start",
  direction = "row",
  ...otherTableCellProps
}) => {
  return (
    <TableCell
      // @ts-expect-error has sx prop
      sx={theme => ({
        outline: `1px solid ${theme.palette.common.white}`,
        [`&.${tableCellClasses.head}`]: {
          color: theme.palette.common.white,
        },
        ...(typeof sx === "function" ? sx(theme) : sx),
      })}
      {...otherTableCellProps}
    >
      <Stack
        alignItems={alignItems}
        justifyContent={justifyContent}
        direction={direction}
        columnGap={3}
      >
        {children}
      </Stack>
    </TableCell>
  )
}

export default Cell
