import * as tables from "codeforlife/components/table"
import { CopyIconButton, TablePagination } from "codeforlife/components"
import { Create as CreateIcon } from "@mui/icons-material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { type SchoolTeacherUser } from "codeforlife/api"
import { Typography } from "@mui/material"
import { generatePath } from "react-router"

import { type RetrieveUserResult } from "../../../api/user"
import { paths } from "../../../routes"
import { useLazyListClassesQuery } from "../../../api/klass"

export interface ClassTableProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
}

const ClassTable: FC<ClassTableProps> = ({ authUser }) => (
  <>
    <Typography align="center" variant="h4">
      Your classes
    </Typography>
    <Typography>
      {authUser.teacher.is_admin
        ? "Below is a list of all the classes in your school, including classes of other teachers. You can add a class or edit your existing classes. You can also accept or deny requests from independent students wanting to join one of your classes."
        : "Below is a list of all your classes. You can add a class or edit your existing classes. You can also accept or deny requests from independent students wanting to join one of your classes."}
    </Typography>
    <TablePagination
      useLazyListQuery={useLazyListClassesQuery}
      filters={
        authUser.teacher.is_admin ? undefined : { teacher: authUser.teacher.id }
      }
      preferCacheValue
    >
      {classes => (
        <tables.Table
          headers={
            authUser.teacher.is_admin
              ? ["Class name", "Access code", "Teacher", "Action"]
              : ["Class name", "Access code", "Action"]
          }
        >
          {classes.map(klass => (
            <tables.BodyRow key={`klass-${klass.id}`}>
              <tables.Cell>{klass.name}</tables.Cell>
              <tables.CellStack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                {klass.id}
                <CopyIconButton content={klass.id} />
              </tables.CellStack>
              {authUser.teacher.is_admin && (
                <tables.Cell>
                  {klass.teacher.id === authUser.teacher.id
                    ? "You"
                    : `${klass.teacher.user.first_name} ${klass.teacher.user.last_name}`}
                </tables.Cell>
              )}
              <tables.CellStack alignItems="center">
                <LinkButton
                  to={generatePath(
                    paths.teacher.dashboard.tab.classes.class._,
                    {
                      classId: klass.id,
                    },
                  )}
                  endIcon={<CreateIcon />}
                >
                  Edit details
                </LinkButton>
              </tables.CellStack>
            </tables.BodyRow>
          ))}
        </tables.Table>
      )}
    </TablePagination>
  </>
)

export default ClassTable
