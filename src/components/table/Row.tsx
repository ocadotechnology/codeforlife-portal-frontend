import { TableRow, type TableRowProps } from "@mui/material"
import { type FC } from "react"

export interface RowProps extends TableRowProps {}

const Row: FC<RowProps> = ({ sx, ...otherTableRowProps }) => (
  <TableRow
    // @ts-expect-error has sx prop
    sx={theme => ({
      // hide last border
      "&:last-child td, &:last-child th": {
        border: 0,
      },
      ...(typeof sx === "function" ? sx(theme) : sx),
    })}
    {...otherTableRowProps}
  />
)

export default Row
