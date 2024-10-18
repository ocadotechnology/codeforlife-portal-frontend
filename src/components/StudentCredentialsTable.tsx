import * as tables from "codeforlife/components/table"
import { Button, Stack, type SxProps, Typography } from "@mui/material"
import { type Class, type Student, type User } from "codeforlife/api"
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer"
import { type FC, useRef } from "react"
import { Print as PrintIcon, SaveAlt as SaveAltIcon } from "@mui/icons-material"
import { CopyIconButton } from "codeforlife/components"
import { generatePath } from "react-router-dom"

import CflLogoImage from "../images/logo_cfl.png"
import { paths } from "../routes"

function makeAutoLoginLink(
  classLoginLink: string,
  student: StudentCredentialsTableProps["students"][number],
) {
  return (
    `${classLoginLink}?` +
    new URLSearchParams({
      id: String(student.id),
      agp: student.auto_gen_password,
    }).toString()
  )
}

const StudentCredentialsPDF: FC<{
  students: StudentCredentialsTableProps["students"]
  classLoginLink: string
}> = ({ students, classLoginLink }) => {
  const pdfStyles = StyleSheet.create({
    mainView: {
      border: "2px solid black",
      display: "flex",
      flexDirection: "row",
      gap: 5,
      padding: 10,
    },
    page: {
      padding: 20,
    },
    text: {
      textAlign: "justify",
      marginBottom: 5,
      fontSize: 12,
    },
    image: {
      width: 85,
      height: 70,
    },
  })

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <Text style={pdfStyles.text}>
          Please ensure students keep login details in a secure place
        </Text>
        {students.map(student => (
          <View
            key={`${student.user.first_name}-pdf`}
            style={pdfStyles.mainView}
          >
            <Image
              source={CflLogoImage}
              src={CflLogoImage}
              style={pdfStyles.image}
            />
            <View>
              {/*TODO: Improve overall styles for this.*/}
              <Text style={pdfStyles.text}>
                Directly log in with:{"\n"}
                {makeAutoLoginLink(classLoginLink, student)}
              </Text>
              <Text style={pdfStyles.text}>
                OR class link: {classLoginLink}
              </Text>
              <Text style={pdfStyles.text}>
                Name: {student.user.first_name} Password:{" "}
                {student.user.password}
              </Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  )
}

export interface DownloadButtonProps {
  classLoginLink: string
  students: StudentCredentialsTableProps["students"]
}

const DownloadPDFButton: FC<DownloadButtonProps> = ({
  classLoginLink,
  students,
}) => {
  const linkRef = useRef<HTMLAnchorElement | null>(null)

  const downloadPdf = async (): Promise<void> => {
    try {
      const blob = await pdf(
        <StudentCredentialsPDF
          classLoginLink={classLoginLink}
          students={students}
        />,
      ).toBlob()
      const url = URL.createObjectURL(blob)

      if (linkRef.current) {
        linkRef.current.href = url
        linkRef.current.click()
      }
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Button
        endIcon={<PrintIcon />}
        onClick={() => {
          void downloadPdf()
        }}
        className="body"
      >
        Print password reminder cards
      </Button>
      {/* Invisible anchor tag to trigger the download */}
      <a ref={linkRef} target="_blank" style={{ display: "none" }}></a>
    </>
  )
}

const DownloadCSVButton: FC<DownloadButtonProps> = ({
  classLoginLink,
  students,
}) => {
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
  const linkRef = useRef<HTMLAnchorElement | null>(null)

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
        <DownloadPDFButton
          classLoginLink={classLoginLink}
          students={students}
        />
        <DownloadCSVButton
          classLoginLink={classLoginLink}
          students={students}
        />
      </Stack>
    </>
  )
}

export default StudentCredentialsTable
