import * as pages from "codeforlife/components/page"
import {
  type Class,
  type StudentUser,
  type User,
  schemas,
} from "codeforlife/api"
import { Link, Navigate } from "codeforlife/components/router"
import { type FC } from "react"
import { Typography } from "@mui/material"
import { generatePath } from "react-router"
import { handleResultState } from "codeforlife/utils/api"
import { useParams } from "codeforlife/hooks"

import {
  type RetrieveUserResult,
  useRetrieveUserQuery,
} from "../../../../api/user"
import UpdateNameForm from "./UpdateNameForm"
import UpdatePasswordForm from "./UpdatePasswordForm"
import { paths } from "../../../../routes"
import { useRetrieveClassQuery } from "../../../../api/klass"

const UpdateStudentUserInternal: FC<{
  classId: Class["id"]
  studentUserId: User["id"]
}> = ({ classId, studentUserId }) => {
  const retrieveClassResult = useRetrieveClassQuery(classId)
  const retrieveUserResult = useRetrieveUserQuery(studentUserId)

  const classPath = generatePath(paths.teacher.dashboard.tab.classes.class._, {
    classId,
  })

  return handleResultState(retrieveClassResult, klass =>
    handleResultState(retrieveUserResult, user => (
      <>
        <pages.Section>
          <Typography align="center" variant="h4" marginBottom={11.5}>
            Edit student details for {user.first_name} from class {klass.name} (
            {klass.id})
          </Typography>
          <Link className="back-to" to={classPath}>
            Class
          </Link>
          <Typography mb={0}>
            Edit this student&apos;s name and manage their password and direct
            access link.
          </Typography>
        </pages.Section>
        <pages.Section>
          <UpdateNameForm
            classPath={classPath}
            studentUser={{ id: studentUserId, first_name: user.first_name }}
          />
        </pages.Section>
        <pages.Section>
          <UpdatePasswordForm
            classId={classId}
            user={user as StudentUser<RetrieveUserResult>}
          />
        </pages.Section>
      </>
    )),
  )
}

export interface UpdateStudentUserProps {}

const UpdateStudentUser: FC<UpdateStudentUserProps> = () => {
  const params = useParams({
    classId: schemas.klass.id,
    studentUserId: schemas.user.id,
  })

  return params ? (
    <UpdateStudentUserInternal {...params} />
  ) : (
    <Navigate to={paths.teacher.dashboard.tab.classes._} />
  )
}

export default UpdateStudentUser
