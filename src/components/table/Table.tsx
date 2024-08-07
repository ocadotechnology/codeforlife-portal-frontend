import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material"
import { type FC } from "react"

import Cell from "./Cell"
import Row from "./Row"

export interface TableProps {
  titles: string[]
  children: React.ReactNode
  className?: string
}

const Table: FC<TableProps> = ({ titles, children, className }) => {
  return (
    <TableContainer>
      <MuiTable className={className} style={{ display: "table" }}>
        <TableHead>
          <Row>
            {titles.map((title, index) => (
              <Cell key={`table-title-${index}`}>{title}</Cell>
            ))}
          </Row>
        </TableHead>
        <TableBody>{children}</TableBody>
      </MuiTable>
    </TableContainer>
  )
}

export default Table
