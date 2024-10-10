import * as pages from "codeforlife/components/page"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"

import Class from "./class/Class"
import ClassTable from "./ClassTable"
import CreateClassForm from "./CreateClassForm"
import JoinClassRequest from "./joinClassRequest/JoinClassRequest"
import JoinClassRequestTable from "./JoinClassRequestTable"
import ReleaseStudents from "./releaseStudents/ReleaseStudents"
import { type RetrieveUserResult } from "../../../api/user"
import StudentsCredentials from "./studentsCredentials/StudentsCredentials"
import TransferStudents from "./transferStudents/TransferStudents"
import UpdateStudentUser from "./updateStudentUser/UpdateStudentUser"

export interface ClassesProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
  view?:
    | "class"
    | "join-class-request"
    | "students-credentials"
    | "update-student-user"
    | "transfer-students"
    | "release-students"
}

const Classes: FC<ClassesProps> = ({ authUser, view }) => {
  if (view) {
    return {
      class: <Class />,
      "join-class-request": <JoinClassRequest />,
      "students-credentials": <StudentsCredentials />,
      "update-student-user": <UpdateStudentUser />,
      "transfer-students": <TransferStudents />,
      "release-students": <ReleaseStudents />,
    }[view]
  }

  return (
    <>
      <pages.Section>
        <ClassTable authUser={authUser} />
      </pages.Section>
      <pages.Section>
        <JoinClassRequestTable authUser={authUser} />
      </pages.Section>
      <pages.Section boxProps={{ bgcolor: "info.main" }}>
        <CreateClassForm authUser={authUser} />
      </pages.Section>
    </>
  )
}

export default Classes
