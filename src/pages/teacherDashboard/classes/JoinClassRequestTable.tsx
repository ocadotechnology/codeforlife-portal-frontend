import {
  Add as AddIcon,
  DoNotDisturb as DoNotDisturbIcon,
} from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { type SchoolTeacherUser } from "codeforlife/api"
import { TablePagination } from "codeforlife/components"
import { generatePath } from "react-router"
import { useNavigate } from "codeforlife/hooks"

import * as tables from "../../../components/table"
import {
  useHandleJoinClassRequestMutation,
  useLazyListUsersQuery,
} from "../../../api/user"
import { type RetrieveUserResult } from "../../../api/user"
import { paths } from "../../../routes"

export interface JoinClassRequestTableProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
}

const JoinClassRequestTable: FC<JoinClassRequestTableProps> = ({
  authUser,
}) => {
  const [handleJoinClassRequest] = useHandleJoinClassRequestMutation()
  const navigate = useNavigate()

  return (
    <>
      <Typography align="center" variant="h4">
        External requests to join your classes
      </Typography>
      <Typography>
        External or independent students may request to join your classes if the
        student has been given a Class Access Code, and provided you have
        enabled external requests for that class.
      </Typography>
      <TablePagination
        useLazyListQuery={useLazyListUsersQuery}
        // filters={{ only_users_requesting_to_join_class: true }}
      >
        {users =>
          users.length ? (
            <tables.Table
              className="body"
              titles={["Name", "Email address", "Class", "Actions"]}
            >
              {users.map(user => (
                <tables.Body key={`user-${user.id}`}>
                  <tables.Cell>
                    <Typography>
                      {user.first_name} {user.last_name}
                    </Typography>
                  </tables.Cell>
                  <tables.Cell>
                    <Typography>{user.email}</Typography>
                  </tables.Cell>
                  <tables.Cell>
                    {user.requesting_to_join_class!.id}
                    {user.requesting_to_join_class!.teacher.id ===
                    authUser.teacher.id
                      ? ""
                      : ` (${user.requesting_to_join_class!.teacher.user.first_name} ${user.requesting_to_join_class!.teacher.user.last_name})`}
                  </tables.Cell>
                  <tables.Cell justifyContent="center">
                    <LinkButton
                      to={generatePath(
                        paths.teacher.dashboard.tab.classes.class.joinRequest._,
                        {
                          classId: user.requesting_to_join_class!.id,
                          userId: user.id,
                        },
                      )}
                      endIcon={<AddIcon />}
                    >
                      Add to class
                    </LinkButton>
                    <Button
                      onClick={() => {
                        void handleJoinClassRequest({
                          id: user.id,
                          accept: false,
                        })
                          .unwrap()
                          .then(() => {
                            navigate(".", {
                              state: {
                                notifications: [
                                  {
                                    props: {
                                      children:
                                        "Request from external/independent student has been rejected successfully.",
                                    },
                                  },
                                ],
                              },
                            })
                          })
                      }}
                      className="alert"
                      endIcon={<DoNotDisturbIcon />}
                    >
                      Reject
                    </Button>
                  </tables.Cell>
                </tables.Body>
              ))}
            </tables.Table>
          ) : (
            <Typography fontWeight="bold" mb={0}>
              No student has currently requested to join your classes.
            </Typography>
          )
        }
      </TablePagination>
    </>
  )
}

export default JoinClassRequestTable
