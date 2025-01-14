import * as tables from "codeforlife/components/table"
import { Button, Stack, type SxProps, Typography } from "@mui/material"
import { type Class, type Student, type User } from "codeforlife/api"
import { type FC, useRef } from "react"
import { CopyIconButton } from "codeforlife/components"
import { SaveAlt as SaveAltIcon } from "@mui/icons-material"
import { generatePath } from "react-router-dom"

import { default as DownloadPDFButton } from "./PrintPasswordReminderCardsButton"
import { makeAutoLoginLink } from "../utils/student"
import { paths } from "../routes"

export interface DownloadCSVButtonProps {
  classLoginLink: string
  students: StudentCredentialsTableProps["students"]
}

const DownloadCSVButton: FC<DownloadCSVButtonProps> = ({
  classLoginLink,
  students,
}) => {
  const linkRef = useRef<HTMLAnchorElement | null>(null)

  const generateCSV: () => string = () => {
    const lines = [["Name", "Password", "Class Link", "Login URL"].join(",")]
    students.forEach(student => {
      lines.push(
        [
          student.user.first_name,
          student.user.password,
          classLoginLink,
          makeAutoLoginLink(classLoginLink, student),
        ].join(","),
      )
    })

    return lines.join("\n")
  }

  const downloadCSV: () => void = () => {
    const csvContent = generateCSV()
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    if (linkRef.current) {
      linkRef.current.href = url
      linkRef.current.download = "data.csv"
      linkRef.current.click()
    }

    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Button endIcon={<SaveAltIcon />} className="body" onClick={downloadCSV}>
        Download CSV
      </Button>
      {/* Invisible anchor tag to trigger the download */}
      <a ref={linkRef} target="_blank" style={{ display: "none" }}></a>
    </>
  )
}

export interface StudentCredentialsTableProps {
  classId: Class["id"]
  students: Array<
    Pick<Student, "id" | "auto_gen_password"> & {
      user: Pick<User, "id" | "first_name" | "password">
    }
  >
}

const StudentCredentialsTable: FC<StudentCredentialsTableProps> = ({
  classId,
  students,
}) => {
  const classLoginLink = generatePath(paths.login.student.class._, { classId })

  const headerCellSx: SxProps = {
    background: "#9a9c9e",
    color: "white !important",
  }

  return (
    <>
      <tables.Table
        sx={{ tableLayout: "fixed" }}
        className="body"
        headers={[
          { colSpan: 2, children: "Option 1 Login details", width: "46%" },
          { sx: { background: "white" }, children: "", width: "8%" },
          "Option 2 Login links",
        ]}
      >
        <tables.BodyRow>
          <tables.Cell colSpan={2}>
            <Stack direction="row" width="100%" alignItems="center">
              <Typography marginRight={2}>Class link:</Typography>
              <Typography className="nowrap-ellipsis">
                {classLoginLink}
              </Typography>
              <CopyIconButton
                content={classLoginLink}
                sx={{ marginLeft: "auto" }}
              />
            </Stack>
          </tables.Cell>
          <tables.Cell sx={{ background: "white" }}>
            <Typography
              sx={{
                color: "white !important",
                backgroundColor: "primary.main",
                borderRadius: "50%",
                padding: 1.25,
                width: "fit-content",
                margin: "auto",
              }}
            >
              OR
            </Typography>
          </tables.Cell>
          <tables.Cell sx={{ fontWeight: "bold" }}>
            No class code or password required
          </tables.Cell>
        </tables.BodyRow>
        <tables.BodyRow>
          <tables.Cell sx={headerCellSx}>Name</tables.Cell>
          <tables.Cell sx={headerCellSx}>Password</tables.Cell>
          <tables.Cell sx={{ background: "white" }}></tables.Cell>
          <tables.Cell sx={headerCellSx}>
            Copy the links below and share with the student
          </tables.Cell>
        </tables.BodyRow>
        {students.map(student => {
          const autoLoginLink = makeAutoLoginLink(classLoginLink, student)

          return (
            <tables.BodyRow key={`user-${student.id}`}>
              <tables.Cell>{student.user.first_name}</tables.Cell>
              <tables.Cell>{student.user.password}</tables.Cell>
              <tables.Cell sx={{ background: "white" }}></tables.Cell>
              <tables.Cell>
                <Stack direction="row" width="100%" alignItems="center">
                  <Typography className="nowrap-ellipsis">
                    {autoLoginLink}
                  </Typography>
                  <CopyIconButton content={autoLoginLink} />
                </Stack>
              </tables.Cell>
            </tables.BodyRow>
          )
        })}
      </tables.Table>
      <Stack direction="row" justifyContent="space-between">
        <DownloadPDFButton classId={classId} students={students} />
        <DownloadCSVButton
          classLoginLink={classLoginLink}
          students={students}
        />
      </Stack>
    </>
  )
}

export default StudentCredentialsTable
