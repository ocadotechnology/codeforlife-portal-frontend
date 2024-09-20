import { type FC } from "react"
import { TablePagination } from "codeforlife/components"
import { Typography } from "@mui/material"

import * as tables from "../../../../components/table"
import { type RetrieveClassResult } from "../../../../api/klass"
import { useLazyListUsersQuery } from "../../../../api/user"

export interface StudentTableProps {
  klass: RetrieveClassResult
  newClass: RetrieveClassResult
}

const StudentTable: FC<StudentTableProps> = ({ klass, newClass }) => (
  <>
    <Typography variant="h5">
      Students currently in destination class
    </Typography>
    <Typography>
      The following students are in class {newClass.name} ({newClass.id}) into
      which you are about to move students from class {klass.name} ({klass.id}).
    </Typography>
    <TablePagination
      useLazyListQuery={useLazyListUsersQuery}
      filters={{ students_in_class: newClass.id }}
      preferCacheValue
    >
      {users => (
        <tables.Table
          titles={["Student name"]}
          containerProps={{
            sx: {
              margin: "auto",
              width: { md: 1 / 2 },
            },
          }}
        >
          {users.length ? (
            users.map(user => (
              <tables.Body key={`user-${user.id}`}>
                <tables.Cell>{user.first_name}</tables.Cell>
              </tables.Body>
            ))
          ) : (
            <tables.Body>
              <tables.Cell>(no students)</tables.Cell>
            </tables.Body>
          )}
        </tables.Table>
      )}
    </TablePagination>
  </>
)

export default StudentTable
