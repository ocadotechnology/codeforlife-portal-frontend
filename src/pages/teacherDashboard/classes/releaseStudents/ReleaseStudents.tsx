import * as pages from "codeforlife/components/page"
import { type Class, type StudentUser } from "codeforlife/api"
import { Link, Navigate } from "codeforlife/components/router"
import { useLocation, useParams } from "codeforlife/hooks"
import { type FC } from "react"
import { Typography } from "@mui/material"
import { generatePath } from "react-router-dom"
import { handleResultState } from "codeforlife/utils/api"

import { type ListUsersResult } from "../../../../api/user"
import ReleaseStudentsForm from "./ReleaseStudentsForm"
import { classIdSchema } from "../../../../app/schemas"
import { paths } from "../../../../routes"
import { useRetrieveClassQuery } from "../../../../api/klass"

const _ReleaseStudents: FC<
  ReleaseStudentsState & {
    classId: Class["id"]
    classPath: string
  }
> = ({ classId, classPath, ...state }) =>
  handleResultState(useRetrieveClassQuery(classId), klass => (
    <pages.Section>
      <Typography align="center" variant="h4">
        Release students from class {klass.name} ({klass.id})
      </Typography>
      <Link className="back-to" to={classPath}>
        Class
      </Link>
      <Typography>Convert students into independent students.</Typography>
      <Typography variant="h5">Students to release from school</Typography>
      <Typography>
        You are about to remove students from your class and set them up as
        independent students. Neither you nor your school will be able to manage
        them once you have submitted this request.
      </Typography>
      <Typography>
        Email addresses are required for independent student accounts. If a
        student is too young to own an email address, a parent or
        guardian&apos;s email address will be required.
      </Typography>
      <Typography>
        The email address will have to be validated through a verification email
        before the student can log in. The email has to be unique and not used
        for other accounts in Code for Life.{" "}
        <strong>
          Make sure you type the correct email, as otherwise we may not be able
          to recover the account
        </strong>
        .
      </Typography>
      <Typography>
        The students will then log in with their email via the{" "}
        <Link className="body" to={paths.login.indy._}>
          independent student login
        </Link>
        . Their passwords will stay the same. Independent students do not need
        to provide a class access code.
      </Typography>
      <ReleaseStudentsForm classPath={classPath} {...state} />
    </pages.Section>
  ))

export interface ReleaseStudentsState {
  studentUsers: Array<StudentUser<ListUsersResult["data"][number]>>
}

export interface ReleaseStudentsProps {}

const ReleaseStudents: FC<ReleaseStudentsProps> = () => {
  const params = useParams({ classId: classIdSchema.required() })
  const { state } = useLocation<ReleaseStudentsState>()

  if (!params)
    return <Navigate to={paths.teacher.dashboard.tab.classes._} replace />

  const { classId } = params

  const classPath = generatePath(paths.teacher.dashboard.tab.classes.class._, {
    classId,
  })

  return !(state && state.studentUsers && state.studentUsers.length) ? (
    <Navigate to={classPath} replace />
  ) : (
    <_ReleaseStudents
      classId={classId}
      classPath={classPath}
      studentUsers={state.studentUsers}
    />
  )
}

export default ReleaseStudents
