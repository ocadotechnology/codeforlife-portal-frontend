// Disable error checking until component is implemented.
/* eslint-disable */
// @ts-nocheck

// import { Print as PrintIcon, SaveAlt as SaveAltIcon } from "@mui/icons-material"
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  type TableCellProps,
  TableHead,
  TableRow,
  type TableRowProps,
  Typography,
  typographyClasses,
  useTheme,
} from "@mui/material"
import { type Class, type Student, type StudentUser } from "codeforlife/api"
import { CopyIconButton } from "codeforlife/components"
import { type FC } from "react"
import { generatePath } from "react-router-dom"
import { primary } from "codeforlife/theme/colors"

import { type ListUsersResult } from "../api/user"
import { paths } from "../routes"

// import React from "react"
// import {
//   Document,
//   Image,
//   Page,
//   StyleSheet,
//   Text,
//   View,
// } from "@react-pdf/renderer"
// import CflLogo from "../../images/cfl_logo.png"

// const styles = StyleSheet.create({
//   mainView: {
//     border: "2px solid black",
//     display: "flex",
//     flexDirection: "row",
//     gap: 5,
//     padding: 10,
//   },
//   page: {
//     padding: 20,
//   },
//   text: {
//     marginBottom: 5,
//     fontSize: 12,
//   },
//   image: {
//     width: 100,
//     height: 100,
//   },
// })

// interface StudentInfo {
//   name: string
//   password: string
//   classLoginLink: string
//   loginUrl: string
// }
// const MyDocument: React.FC<{
//   studentsInfo: StudentInfo[]
//   classLoginLink: string
// }> = ({ studentsInfo, classLoginLink }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       {studentsInfo.map((student: StudentInfo) => (
//         <View key={`${student.name}-pdf`} style={styles.mainView}>
//           <View>
//             <Image source={CflLogo} style={styles.image} />
//           </View>
//           <View>
//             <Text style={styles.text}>
//               Please ensure students keep login details in a secure place
//             </Text>
//             <Text style={styles.text}>
//               Directly login with {student.loginUrl}
//             </Text>
//             <Text style={styles.text}>OR class link: {classLoginLink}</Text>
//             <Text style={styles.text}>Name: {student.name}</Text>
//             <Text style={styles.text}>Password: {student.password}</Text>
//           </View>
//         </View>
//       ))}
//     </Page>
//   </Document>
// )

// interface StudentInfo {
//   name: string
//   password: string
//   classLoginLink: string
//   loginUrl: string
// }

// const DownloadButtonCSV: React.FC = () => {
//   const generateCSV: (
//     studentsInfo: StudentInfo[],
//     classLoginLink: string,
//   ) => string = (studentsInfo, classLoginLink) => {
//     let csvContent = "Name,Password,Class Link,Login URL\n"
//     studentsInfo.forEach(student => {
//       csvContent += `${student.name},${student.password},${classLoginLink},${student.loginUrl}\n`
//     })
//     return csvContent
//   }
//   const location = useLocation()
//   const { studentsInfo } = location.state.updatedStudentCredentials
//   const { classLoginLink } = location.state.updatedStudentCredentials

//   const downloadCSV: () => void = () => {
//     const csvContent = generateCSV(studentsInfo, classLoginLink)
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
//     const url = URL.createObjectURL(blob)
//     const linkRef = React.useRef<HTMLAnchorElement | null>(null)
//     if (linkRef.current) {
//       linkRef.current.href = url
//       linkRef.current.download = "data.csv"
//       linkRef.current.click()
//     }
//     URL.revokeObjectURL(url)
//   }

//   return (
//     <Button endIcon={<SaveAltIcon />} className="body" onClick={downloadCSV}>
//       Download CSV
//     </Button>
//   )
// }

// export const DownloadButtonPDF: FC<{ isButtonBanner?: boolean }> = ({
//   isButtonBanner,
// }) => {
//   const location = useLocation()
//   const { studentsInfo, classLoginLink } = location.state.updatedStudentCredentials
//   const linkRef = React.useRef<HTMLAnchorElement | null>(null)

//   const downloadPdf = async (): Promise<void> => {
//     try {
//       const blob = await pdf(
//         <MyDocument classLoginLink={classLoginLink} studentsInfo={studentsInfo} />,
//       ).toBlob()
//       const url = URL.createObjectURL(blob)

//       if (linkRef.current) {
//         linkRef.current.href = url
//         linkRef.current.download = "document.pdf"
//         linkRef.current.click()
//         URL.revokeObjectURL(url)
//       }
//     } catch (error) {
//       console.error(error)
//     }
//   }
//   const buttonStyles = !isButtonBanner
//     ? {}
//     : {
//         sx: {
//           border: "2px solid black",
//           "&:hover": {
//             border: "2px solid black",
//           },
//         },
//       }

//   return (
//     <>
//       <Button
//         endIcon={<PrintIcon />}
//         onClick={() => {
//           void downloadPdf()
//         }}
//         className="body"
//         {...buttonStyles}
//       >
//         Print password reminder cards
//       </Button>
//       {/* Invisible anchor tag to trigger the download */}
//       <a ref={linkRef} style={{ display: "none" }}></a>
//     </>
//   )
// }

const WhiteTableCell: React.FC<TableCellProps> = ({
  style,
  ...otherTableCellProps
}) => (
  <TableCell
    style={{
      ...style,
      backgroundColor: "white",
    }}
    {...otherTableCellProps}
  />
)

const HeadRowTableCell: React.FC<TableRowProps> = props => (
  <TableCell padding="none">
    <Table
      style={{
        marginBottom: 0,
        tableLayout: "fixed",
        height: "100%",
      }}
    >
      <TableHead className="light">
        <TableRow {...props} />
      </TableHead>
    </Table>
  </TableCell>
)

const BodyRowTableCell: React.FC<TableRowProps> = props => (
  <TableCell padding="none">
    <Table
      style={{
        marginBottom: 0,
        tableLayout: "fixed",
        height: "100%",
      }}
    >
      <TableBody>
        <TableRow {...props} />
      </TableBody>
    </Table>
  </TableCell>
)

export interface StudentCredentialsTableProps {
  classId: Class["id"]
  studentUsers: Array<
    Pick<StudentUser, "id" | "first_name" | "password"> & {
      student: Pick<Student, "id" | "auto_gen_password">
    }
  >
}

const StudentCredentialsTable: FC<StudentCredentialsTableProps> = ({
  classId,
  studentUsers,
}) => {
  const classLoginLink = generatePath(paths.login.student.class._, { classId })

  const nameCellWidth = "40%"
  const passwordCellWidth = "60%"

  return (
    <Table
      sx={{
        height: "100%",
        tableLayout: "fixed",
        [`.${typographyClasses.root}`]: {
          marginBottom: 0,
        },
      }}
      className="body"
    >
      <TableHead>
        <TableRow>
          <TableCell width="45%">
            <Typography>Option 1 Login details</Typography>
          </TableCell>
          <WhiteTableCell width="10%" />
          <TableCell width="45%">
            <Typography>Option 2 Login links</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
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
          </TableCell>
          <WhiteTableCell>
            <Typography
              style={{
                color: "white",
                backgroundColor: primary[500],
                borderRadius: "50%",
                padding: 10,
                width: "fit-content",
                margin: "auto",
              }}
            >
              OR
            </Typography>
          </WhiteTableCell>
          <TableCell>
            <Typography fontWeight="bold">
              No class code or password required
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <HeadRowTableCell>
            <TableCell width={nameCellWidth}>
              <Typography>Name</Typography>
            </TableCell>
            <TableCell width={passwordCellWidth}>
              <Typography>Password</Typography>
            </TableCell>
          </HeadRowTableCell>
          <WhiteTableCell />
          <HeadRowTableCell>
            <TableCell>
              <Typography>
                Copy the links below and share with the student
              </Typography>
            </TableCell>
          </HeadRowTableCell>
        </TableRow>
        {studentUsers.map(studentUser => {
          const autoLoginLink =
            `${classLoginLink}?` +
            new URLSearchParams({
              id: String(studentUser.id),
              agp: studentUser.student.auto_gen_password,
            }).toString()

          return (
            <TableRow key={`user-${studentUser.id}`}>
              <BodyRowTableCell>
                <TableCell width={nameCellWidth}>
                  <Typography>{studentUser.first_name}</Typography>
                </TableCell>
                <TableCell width={passwordCellWidth}>
                  <Typography>{studentUser.password}</Typography>
                </TableCell>
              </BodyRowTableCell>
              <WhiteTableCell />
              <BodyRowTableCell>
                <TableCell>
                  <Stack direction="row" width="100%" alignItems="center">
                    <Typography className="nowrap-ellipsis">
                      {autoLoginLink}
                    </Typography>
                    <CopyIconButton
                      content={autoLoginLink}
                      sx={{ marginLeft: "auto" }}
                    />
                  </Stack>
                </TableCell>
              </BodyRowTableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
    // TODO: fix margin bottom
    // <Stack direction="row" justifyContent="space-between">
    //   <DownloadButtonPDF />
    //   <DownloadButtonCSV />
    // </Stack>
  )
}

export default StudentCredentialsTable
