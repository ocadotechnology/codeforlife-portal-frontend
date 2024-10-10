import * as tables from "codeforlife/components/table"
import { Button, Checkbox, Stack, Typography } from "@mui/material"
import { type Class, type StudentUser } from "codeforlife/api"
import {
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  SecurityOutlined as SecurityOutlinedIcon,
} from "@mui/icons-material"
import { type FC, useState } from "react"
import { LinkButton } from "codeforlife/components/router"
import { TablePagination } from "codeforlife/components"
import { generatePath } from "react-router-dom"

import DeleteStudentsDialog from "./DeleteStudentsDialog"
import { type ListUsersResult } from "../../../../api/user"
import { type ReleaseStudentsState } from "../releaseStudents/ReleaseStudents"
import ResetStudentsPasswordDialog from "./ResetStudentsPasswordDialog"
import { type TransferStudentsState } from "../transferStudents/TransferStudents"
import { paths } from "../../../../routes"
import { useLazyListUsersQuery } from "../../../../api/user"

export interface StudentTableProps {
  classId: Class["id"]
}

const StudentTable: FC<StudentTableProps> = ({ classId }) => {
  const [dialog, setDialog] = useState<
    "reset-students-password" | "delete-students"
  >()
  const [selectedStudentUsers, setSelectedStudentUsers] = useState<
    Record<
      ListUsersResult["data"][number]["id"],
      StudentUser<ListUsersResult["data"][number]>
    >
  >({})

  const selectButtonDisabled = !Object.keys(selectedStudentUsers).length

  function closeDialog() {
    setDialog(undefined)
  }

  return (
    <>
      <Typography variant="h4">Current students</Typography>
      <Typography>
        Select an individual student to change their details, including their
        name and password.
      </Typography>
      <Typography>
        Select multiple students using the checkboxes to reset their passwords,
        move them to another class, release them from your school and make them
        an independent Code for Life user, or delete them permanently.
      </Typography>
      <TablePagination
        useLazyListQuery={useLazyListUsersQuery}
        filters={{ students_in_class: classId }}
        onChange={() => {
          console.log("TODO: setStudentUsers({})")
        }}
      >
        {/* @ts-expect-error users are student-users */}
        {(
          studentUsers: Array<StudentUser<ListUsersResult["data"][number]>>,
        ) => (
          <tables.Table
            headers={[
              "Student details",
              {
                align: "center",
                children: (
                  <Checkbox
                    key="all-student-users-checkbox"
                    checked={studentUsers.every(
                      studentUser => studentUser.id in selectedStudentUsers,
                    )}
                    onChange={event => {
                      setSelectedStudentUsers(
                        event.target.checked
                          ? studentUsers.reduce(
                              (selectedStudentUsers, studentUser) => ({
                                ...selectedStudentUsers,
                                [studentUser.id]: studentUser,
                              }),
                              {} as typeof selectedStudentUsers,
                            )
                          : {},
                      )
                    }}
                  />
                ),
              },
              { align: "center", children: "Action" },
            ]}
          >
            {studentUsers.length ? (
              studentUsers.map(studentUser => (
                <tables.BodyRow key={`user-${studentUser.id}`}>
                  <tables.Cell width="70%">
                    {studentUser.first_name}
                  </tables.Cell>
                  <tables.Cell align="center">
                    <Checkbox
                      checked={studentUser.id in selectedStudentUsers}
                      onChange={event => {
                        setSelectedStudentUsers(
                          event.target.checked
                            ? previousSelectedStudentUsers => ({
                                ...previousSelectedStudentUsers,
                                [studentUser.id]: studentUser,
                              })
                            : previousSelectedStudentUsers => {
                                const selectedStudentUsers = {
                                  ...previousSelectedStudentUsers,
                                }
                                delete selectedStudentUsers[studentUser.id]
                                return selectedStudentUsers
                              },
                        )
                      }}
                    />
                  </tables.Cell>
                  <tables.Cell align="center">
                    <LinkButton
                      to={generatePath(
                        paths.teacher.dashboard.tab.classes.class.students
                          .studentUser._,
                        { classId, studentUserId: studentUser.id },
                      )}
                      endIcon={<EditIcon />}
                    >
                      Edit details
                    </LinkButton>
                  </tables.Cell>
                </tables.BodyRow>
              ))
            ) : (
              <tables.BodyRow>
                <tables.Cell colSpan={3}>(no students)</tables.Cell>
              </tables.BodyRow>
            )}
          </tables.Table>
        )}
      </TablePagination>
      <Stack direction="row" gap={2} justifyContent="end">
        {LinkButton<ReleaseStudentsState>({
          children: "Release",
          disabled: selectButtonDisabled,
          to: generatePath(
            paths.teacher.dashboard.tab.classes.class.students.release._,
            { classId },
          ),
          state: { studentUsers: Object.values(selectedStudentUsers) },
        })}
        {LinkButton<TransferStudentsState>({
          children: "Move",
          disabled: selectButtonDisabled,
          to: generatePath(
            paths.teacher.dashboard.tab.classes.class.students.transfer._,
            { classId },
          ),
          state: { studentUsers: Object.values(selectedStudentUsers) },
        })}
        <Button
          disabled={selectButtonDisabled}
          onClick={() => {
            setDialog("reset-students-password")
          }}
          endIcon={<SecurityOutlinedIcon />}
        >
          Reset password and login link
        </Button>
        <Button
          className="alert"
          disabled={selectButtonDisabled}
          onClick={() => {
            setDialog("delete-students")
          }}
          endIcon={<DeleteOutlineIcon />}
        >
          Delete
        </Button>
      </Stack>
      <ResetStudentsPasswordDialog
        classId={classId}
        open={dialog === "reset-students-password"}
        onClose={closeDialog}
        studentUsers={Object.values(selectedStudentUsers)}
      />
      <DeleteStudentsDialog
        open={dialog === "delete-students"}
        onClose={closeDialog}
        studentUsers={Object.values(selectedStudentUsers)}
      />
    </>
  )
}

export default StudentTable
