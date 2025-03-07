import * as tables from "codeforlife/components/table"
import {
  Add as AddIcon,
  Create as CreateIcon,
  DeleteOutline as DeleteOutlineIcon,
  DoDisturbOnOutlined as DoDisturbOnOutlinedIcon,
  DoNotDisturb as DoNotDisturbIcon,
} from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"
import { TablePagination } from "codeforlife/components"
import { generatePath } from "react-router"
import { useNavigate } from "codeforlife/hooks"

import {
  type RetrieveUserResult,
  useLazyListUsersQuery,
} from "../../../api/user"
import { paths } from "../../../routes"
import { useSetTeacherAdminAccessMutation } from "../../../api/teacher"

export interface TeacherTableProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
}

const TeacherTable: FC<TeacherTableProps> = ({ authUser }) => {
  const navigate = useNavigate()
  const [setTeacherAdminAccess] = useSetTeacherAdminAccessMutation()

  function showNotification(children: string, error: boolean = false) {
    navigate(".", {
      state: { notifications: [{ props: { children, error } }] },
    })
  }

  function handleSetTeacherAdminAccess(id: number, isAdmin: boolean) {
    setTeacherAdminAccess({ id, is_admin: isAdmin })
      .unwrap()
      .then(() => {
        showNotification(
          isAdmin
            ? "Administrator status has been given successfully."
            : "Administrator status has been revoked successfully.",
        )
      })
      .catch(() => {
        showNotification(
          isAdmin
            ? "Failed to give administrator status."
            : "Failed to revoke administrator status.",
          true,
        )
      })
  }

  return (
    <TablePagination
      useLazyListQuery={useLazyListUsersQuery}
      filters={{ type: "teacher" }}
      preferCacheValue
    >
      {users => (
        <tables.Table
          className="body"
          headers={
            authUser.teacher.is_admin
              ? ["Name", "Administrator status", "Actions"]
              : ["Name", "Administrator status"]
          }
        >
          {users.map(user => (
            <tables.BodyRow key={`user-${user.id}`}>
              <tables.Cell>
                <Typography variant="subtitle1">
                  {user.first_name} {user.last_name}
                  {user.id === authUser.id ? <strong> (you)</strong> : ""}
                </Typography>
              </tables.Cell>
              <tables.CellStack
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Typography variant="subtitle1">
                  {user.teacher!.is_admin
                    ? "Teacher Administrator"
                    : "Standard Teacher"}
                </Typography>
                <Typography variant="subtitle1">({user.email})</Typography>
              </tables.CellStack>
              {authUser.teacher.is_admin && (
                <tables.CellStack alignItems="center">
                  {authUser.id === user.id && (
                    <Button
                      endIcon={<CreateIcon />}
                      onClick={() => {
                        navigate(paths.teacher.dashboard.tab.account._)
                      }}
                    >
                      Update details
                    </Button>
                  )}
                  {user.teacher!.is_admin ? (
                    <Button
                      className="alert"
                      endIcon={<DoNotDisturbIcon />}
                      onClick={() => {
                        handleSetTeacherAdminAccess(user.teacher!.id, false)
                      }}
                    >
                      Revoke admin
                    </Button>
                  ) : (
                    <Button
                      endIcon={<AddIcon />}
                      onClick={() => {
                        handleSetTeacherAdminAccess(user.teacher!.id, true)
                      }}
                    >
                      Make admin
                    </Button>
                  )}
                  <Button
                    className="alert"
                    endIcon={<DeleteOutlineIcon />}
                    onClick={() => {
                      navigate(
                        generatePath(
                          paths.teacher.dashboard.tab.school.leave._,
                          { userId: user.id },
                        ),
                      )
                    }}
                  >
                    Delete
                  </Button>
                  {/* eslint-disable-next-line no-constant-binary-expression */}
                  {true && ( // TODO check if user has otp enabled
                    <Button
                      endIcon={<DoDisturbOnOutlinedIcon />}
                      className="alert"
                    >
                      Disable 2FA
                    </Button>
                  )}
                </tables.CellStack>
              )}
            </tables.BodyRow>
          ))}
        </tables.Table>
      )}
    </TablePagination>
  )
}

export default TeacherTable
