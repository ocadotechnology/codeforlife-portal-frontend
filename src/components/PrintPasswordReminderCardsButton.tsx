import * as pdf from "@react-pdf/renderer"
import {
  DownloadFileButton,
  type DownloadFileButtonProps,
} from "codeforlife/components"
import { type FC, useState } from "react"
import { type Student, type User } from "codeforlife/api"
import { Print as PrintIcon } from "@mui/icons-material"
import { generatePath } from "react-router"

import CflLogoImage from "../images/logo_cfl.png"
import { makeAutoLoginLink } from "../utils/student"
import { paths } from "../routes"

interface PDFProps {
  classId: string
  students: Array<
    Pick<Student, "id" | "auto_gen_password"> & {
      user: Pick<User, "id" | "first_name" | "password">
    }
  >
}

const PDF: FC<PDFProps> = ({ classId, students }) => {
  const classLoginLink = generatePath(paths.login.student.class._, { classId })

  const styles = pdf.StyleSheet.create({
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
    <pdf.Document>
      <pdf.Page size="A4" style={styles.page}>
        <pdf.Text style={styles.text}>
          Please ensure students keep login details in a secure place
        </pdf.Text>
        {students.map(student => (
          <pdf.View key={`${student.user.id}-pdf`} style={styles.mainView}>
            <pdf.Image
              source={CflLogoImage}
              src={CflLogoImage}
              style={styles.image}
            />
            <pdf.View>
              {/*TODO: Improve overall styles for this.*/}
              <pdf.Text style={styles.text}>
                Directly log in with:{"\n"}
                {makeAutoLoginLink(classLoginLink, student)}
              </pdf.Text>
              <pdf.Text style={styles.text}>
                OR class link: {classLoginLink}
              </pdf.Text>
              <pdf.Text style={styles.text}>
                Name: {student.user.first_name} Password:{" "}
                {student.user.password}
              </pdf.Text>
            </pdf.View>
          </pdf.View>
        ))}
      </pdf.Page>
    </pdf.Document>
  )
}

export type PrintPasswordReminderCardsButtonProps = PDFProps &
  Omit<DownloadFileButtonProps, "endIcon" | "onClick" | "className" | "file">

const PrintPasswordReminderCardsButton: FC<
  PrintPasswordReminderCardsButtonProps
> = ({ classId, students, ...buttonProps }) => {
  const [file, setFile] = useState<Blob>()

  pdf
    .pdf(<PDF classId={classId} students={students} />)
    .toBlob()
    .then(file => {
      setFile(file)
    })
    .catch(error => {
      console.error(error)
    })

  if (file) {
    return (
      <DownloadFileButton
        endIcon={<PrintIcon />}
        className="body"
        file={file}
        {...buttonProps}
      >
        Print reminder cards
      </DownloadFileButton>
    )
  }
}

export default PrintPasswordReminderCardsButton
