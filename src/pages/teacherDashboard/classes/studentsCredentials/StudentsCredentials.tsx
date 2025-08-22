import * as pages from "codeforlife/components/page"
import { type Class, schemas } from "codeforlife/api"
import { Link, Navigate } from "codeforlife/components/router"
import { useLocation, useParams } from "codeforlife/hooks"
import { type FC } from "react"
import { generatePath } from "react-router-dom"
import { handleResultState } from "codeforlife/utils/api"

import {
  PrintStudentCredentialsNotification,
  StudentCredentialsTable,
  type StudentCredentialsTableProps,
} from "../../../../components"
import { paths } from "../../../../routes"
import { useRetrieveClassQuery } from "../../../../api/klass"

const StudentsCredentialsInternal: FC<
  StudentsCredentialsState & {
    classId: Class["id"]
  }
> = ({ classId, flow, students }) => {
  return handleResultState(useRetrieveClassQuery(classId), klass => (
    <>
      <PrintStudentCredentialsNotification
        classId={classId}
        students={students}
      />
      <pages.Section>
        <StudentCredentialsTable
          flow={flow}
          klass={klass}
          students={students}
        />
        <Link
          className="back-to"
          to={generatePath(paths.teacher.dashboard.tab.classes.class._, {
            classId,
          })}
        >
          class
        </Link>
      </pages.Section>
    </>
  ))
}

export interface StudentsCredentialsState
  extends Pick<StudentCredentialsTableProps, "students" | "flow"> {}

export interface StudentsCredentialsProps {}

const StudentsCredentials: FC<StudentsCredentialsProps> = () => {
  const params = useParams({ classId: schemas.klass.id })
  const { state } = useLocation<StudentsCredentialsState>()

  if (!params)
    return <Navigate to={paths.teacher.dashboard.tab.classes._} replace />

  const { classId } = params

  return state && state.students && state.students.length && state.flow ? (
    <StudentsCredentialsInternal
      classId={classId}
      flow={state.flow}
      students={state.students}
    />
  ) : (
    <Navigate
      to={generatePath(paths.teacher.dashboard.tab.classes.class._, {
        classId,
      })}
      replace
    />
  )
}

export default StudentsCredentials
