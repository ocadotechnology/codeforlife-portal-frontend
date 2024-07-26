import { type FC } from "react"
import {
  Button,
  Dialog,
  Grid,
  InputAdornment,
  Stack,
  Typography,
  useTheme,
} from "@mui/material"

const TeachersTableActions: React.FC<{
  isInvite: boolean
  teacherEmail: string
  userEmail: string
  isTeacherAdmin: boolean
  id: string
  token?: string
  twoFactorAuthentication?: boolean
  setDialog: SetDialogType
}> = ({
  isInvite,
  teacherEmail,
  userEmail,
  isTeacherAdmin,
  id,
  token,
  twoFactorAuthentication,
  setDialog,
}) => {
  const navigate = useNavigate()
  const [toggleAdmin] = useToggleAdminMutation()
  const [organisationKick] = useOrganisationKickMutation()
  const [inviteToggleAdmin] = useInviteToggleAdminMutation()
  const [resendInvite] = useResendInviteMutation()
  const [deleteInvite] = useDeleteInviteMutation()

  const onToggleAdmin = (id: string): void => {
    toggleAdmin({ id })
      .unwrap()
      .then(res => {
        navigate(".", {
          state: {
            message: res.isAdminNow
              ? "Administrator status has been given successfully."
              : "Administrator status has been revoked successfully.",
          },
        })
      })
      .catch(err => {
        console.error("ToggleAdmin error: ", err)
      })
  }

  const onOrganisationKick = (id: string): void => {
    organisationKick({ id })
      .unwrap()
      .then(moveClassData => {
        if (moveClassData?.classes) {
          navigate(paths.teacher.dashboard.school.leave._, {
            state: moveClassData,
          })
        } else {
          navigate(".", {
            state: {
              message:
                "The teacher has been successfully removed from your school or club.",
            },
          })
        }
      })
      .catch(err => {
        console.error("OrganisationKick error: ", err)
      })
  }

  const onInviteToggleAdmin = (id: string): void => {
    inviteToggleAdmin({ id })
      .unwrap()
      .then(res => {
        navigate(".", {
          state: {
            message: res.isAdminNow
              ? "Administrator invite status has been given successfully."
              : "Administrator invite status has been revoked successfully.",
          },
        })
      })
      .catch(err => {
        console.error("InviteToggleAdmin error: ", err)
      })
  }

  const onResendInvite = (token: string): void => {
    resendInvite({ token })
      .unwrap()
      .then(() => {
        navigate(".", {
          state: {
            message: "Teacher re-invited!",
          },
        })
      })
      .catch(err => {
        console.error("ResendInvite error: ", err)
      })
  }

  const onDeleteInvite = (token: string): void => {
    deleteInvite({ token })
      .unwrap()
      .then(() => {
        navigate(".", {
          state: {
            message: "Invitation successfully deleted.",
          },
        })
      })
      .catch(err => {
        console.error("DeleteInvite error: ", err)
      })
  }

  const onInviteMakeAdmin = (id: string): void => {
    setDialog({
      open: true,
      onConfirm: () => {
        onInviteToggleAdmin(id)
        setDialog({ open: false })
      },
    })
  }

  const onMakeAdmin = (id: string): void => {
    setDialog({
      open: true,
      onConfirm: () => {
        onToggleAdmin(id)
        setDialog({ open: false })
      },
    })
  }

  if (isInvite) {
    return (
      <>
        {isTeacherAdmin ? (
          <Button
            className={isTeacherAdmin && "alert"}
            endIcon={<DoNotDisturb />}
            onClick={() => {
              onInviteToggleAdmin(id)
            }}
          >
            Revoke admin
          </Button>
        ) : (
          <Button
            endIcon={<Add />}
            onClick={() => {
              onInviteMakeAdmin(id)
            }}
          >
            Make admin
          </Button>
        )}
        <Button
          endIcon={<EmailOutlined />}
          onClick={() => {
            onResendInvite(token as string)
          }}
        >
          Resend invite
        </Button>
        <Button
          className="alert"
          endIcon={<DeleteOutline />}
          onClick={() => {
            onDeleteInvite(token as string)
          }}
        >
          Delete
        </Button>
      </>
    )
  } else {
    if (teacherEmail === userEmail) {
      return (
        <>
          <Button
            endIcon={<Create />}
            onClick={() => {
              navigate(paths.teacher.dashboard.account._)
            }}
          >
            Update details
          </Button>
          {/* This button below will be used for pending invites  */}
          <Button endIcon={<EmailOutlined />}>Resend invite</Button>
        </>
      )
    } else if (isTeacherAdmin) {
      return (
        <>
          <Button
            className="alert"
            endIcon={<DoNotDisturb />}
            onClick={() => {
              onToggleAdmin(id)
            }}
          >
            Revoke admin
          </Button>
          <Button
            className="alert"
            endIcon={<DeleteOutline />}
            onClick={() => {
              onOrganisationKick(id)
            }}
          >
            Delete
          </Button>
        </>
      )
    } else {
      return (
        <>
          <Button
            endIcon={<Add />}
            onClick={() => {
              onMakeAdmin(id)
            }}
          >
            Make admin
          </Button>
          <Button
            className="alert"
            endIcon={<DeleteOutline />}
            onClick={() => {
              onOrganisationKick(id)
            }}
          >
            Delete
          </Button>
          {twoFactorAuthentication ? (
            <Button endIcon={<DoDisturbOnOutlined />} className="alert">
              Disable 2FA
            </Button>
          ) : (
            <></>
          )}
        </>
      )
    }
  }
}

export interface TeacherTableProps {
  teacherData: TeacherDashboardProps["teacher"]
  coworkersData: TeacherDashboardProps["coworkers"]
  sentInvites: TeacherDashboardProps["sentInvites"]
  setDialog: SetDialogType
}

const TeacherTable: FC<TeacherTableProps> = ({
  teacherData,
  coworkersData,
  sentInvites,
  setDialog,
}) => {
  const isUserAdmin = teacherData.isAdmin
  const email = teacherData.teacherEmail
  const boldText: React.FC<string> = (str: string) => (
    <Typography variant="body2" fontWeight="bold">
      ({str})
    </Typography>
  )

  return (
    <CflTable
      className="body"
      titles={
        isUserAdmin
          ? ["Name", "Administrator status", "Actions"]
          : ["Name", "Administrator status"]
      }
    >
      {coworkersData.map(
        ({
          teacherFirstName,
          teacherLastName,
          teacherEmail,
          isTeacherAdmin,
          id,
        }) => (
          <CflTableBody key={id}>
            <CflTableCellElement>
              <Typography variant="subtitle1">
                {teacherFirstName} {teacherLastName}{" "}
                {teacherEmail === email ? boldText("you") : ""}{" "}
              </Typography>
            </CflTableCellElement>
            <CflTableCellElement
              direction="column"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Typography variant="subtitle1">
                {isTeacherAdmin ? "Teacher Administrator" : "Standard Teacher"}
              </Typography>
              <Typography variant="subtitle1">({teacherEmail}) </Typography>
            </CflTableCellElement>
            {isUserAdmin && (
              <CflTableCellElement justifyContent="center">
                <TeachersTableActions
                  {...{
                    isInvite: false,
                    teacherEmail,
                    userEmail: email,
                    isTeacherAdmin,
                    id,
                    setDialog,
                  }}
                />
              </CflTableCellElement>
            )}
          </CflTableBody>
        ),
      )}
      {sentInvites.map(
        ({
          invitedTeacherFirstName,
          invitedTeacherLastName,
          invitedTeacherEmail,
          invitedTeacherIsAdmin,
          isExpired,
          id,
          token,
        }) => (
          <CflTableBody key={token}>
            <CflTableCellElement>
              <Typography variant="subtitle1">
                {invitedTeacherFirstName} {invitedTeacherLastName}{" "}
                {isExpired ? boldText("expired") : boldText("pending")}{" "}
              </Typography>
            </CflTableCellElement>
            <CflTableCellElement
              direction="column"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Typography variant="subtitle1">
                {invitedTeacherIsAdmin
                  ? "Teacher Administrator"
                  : "Standard Teacher"}
              </Typography>
              <Typography variant="subtitle1">
                ({invitedTeacherEmail})
              </Typography>
            </CflTableCellElement>
            {isUserAdmin && (
              <CflTableCellElement justifyContent="center">
                <TeachersTableActions
                  {...{
                    isInvite: true,
                    teacherEmail: invitedTeacherEmail,
                    userEmail: email,
                    isTeacherAdmin: invitedTeacherIsAdmin,
                    id,
                    token,
                    setDialog,
                  }}
                />
              </CflTableCellElement>
            )}
          </CflTableBody>
        ),
      )}
    </CflTable>
  )
}

export default TeacherTable
