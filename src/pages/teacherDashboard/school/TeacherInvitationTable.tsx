import {
  Add as AddIcon,
  DeleteOutline as DeleteOutlineIcon,
  DoNotDisturb as DoNotDisturbIcon,
  EmailOutlined as EmailOutlinedIcon,
} from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"
import { TablePagination } from "codeforlife/components"
import { useNavigate } from "codeforlife/hooks"

import * as table from "../../../components/table"
import {
  useDestroySchoolTeacherInvitationMutation,
  useLazyListSchoolTeacherInvitationsQuery,
} from "../../../api/schoolTeacherInvitation"
import { type RetrieveUserResult } from "../../../api/user"

export interface TeacherInvitationTableProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
}

const TeacherInvitationTable: FC<TeacherInvitationTableProps> = ({
  authUser,
}) => {
  const navigate = useNavigate()
  const [destroySchoolTeacherInvitation] =
    useDestroySchoolTeacherInvitationMutation()

  function showNotification(children: string, error: boolean = false) {
    navigate(".", {
      state: { notifications: [{ props: { children, error } }] },
    })
  }

  return (
    <TablePagination
      useLazyListQuery={useLazyListSchoolTeacherInvitationsQuery}
    >
      {schoolTeacherInvitations => (
        <table.Table
          className="body"
          titles={
            authUser.teacher!.is_admin
              ? ["Name", "Administrator status", "Actions"]
              : ["Name", "Administrator status"]
          }
        >
          {schoolTeacherInvitations.map(
            ({
              id,
              invited_teacher_first_name,
              invited_teacher_last_name,
              invited_teacher_is_admin,
              invited_teacher_email,
              expires_at,
            }) => (
              <table.Body key={`school-teacher-invitation-${id}`}>
                <table.Cell>
                  <Typography variant="subtitle1">
                    {invited_teacher_first_name} {invited_teacher_last_name}{" "}
                    <strong>
                      ({expires_at < new Date() ? "expired" : "pending"})
                    </strong>
                  </Typography>
                </table.Cell>
                <table.Cell
                  direction="column"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <Typography variant="subtitle1">
                    {invited_teacher_is_admin
                      ? "Teacher Administrator"
                      : "Standard Teacher"}
                  </Typography>
                  <Typography variant="subtitle1">
                    ({invited_teacher_email})
                  </Typography>
                </table.Cell>
                {authUser.teacher.is_admin && (
                  <table.Cell justifyContent="center">
                    {invited_teacher_is_admin ? (
                      <Button
                        className="alert"
                        endIcon={<DoNotDisturbIcon />}
                        onClick={() => {
                          alert("TODO: create action of backend for this")
                        }}
                      >
                        Revoke admin
                      </Button>
                    ) : (
                      <Button
                        endIcon={<AddIcon />}
                        onClick={() => {
                          alert("TODO: create action of backend for this")
                        }}
                      >
                        Make admin
                      </Button>
                    )}
                    <Button
                      endIcon={<EmailOutlinedIcon />}
                      onClick={() => {
                        alert("TODO: create action of backend for this")
                      }}
                    >
                      Resend invite
                    </Button>
                    <Button
                      className="alert"
                      endIcon={<DeleteOutlineIcon />}
                      onClick={() => {
                        destroySchoolTeacherInvitation(id)
                          .unwrap()
                          .then(() => {
                            showNotification("Invitation successfully deleted.")
                          })
                          .catch(() => {
                            showNotification(
                              "Failed to delete invitation.",
                              true,
                            )
                          })
                      }}
                    >
                      Delete
                    </Button>
                  </table.Cell>
                )}
              </table.Body>
            ),
          )}
        </table.Table>
      )}
    </TablePagination>
  )
}

export default TeacherInvitationTable
