import * as pages from "codeforlife/components/page"
import { type Class, type StudentUser } from "codeforlife/api"
import { type FC, useState } from "react"
import { Link, Navigate } from "codeforlife/components/router"
import { useLocation, useParams } from "codeforlife/hooks"
import { Typography } from "@mui/material"
import { generatePath } from "react-router-dom"
import { handleResultState } from "codeforlife/utils/api"

import {
  type RetrieveClassResult,
  useRetrieveClassQuery,
} from "../../../../api/klass"
import { type ListUsersResult } from "../../../../api/user"
import SelectClassForm from "./SelectClassForm"
import StudentTable from "./StudentTable"
import TransferStudentsForm from "./TransferStudentsForm"
import { classIdSchema } from "../../../../app/schemas"
import { paths } from "../../../../routes"

const NewClassSections: FC<
  TransferStudentsState & {
    classPath: string
    klass: RetrieveClassResult
    newClassId: Class["id"]
  }
> = ({ studentUsers, classPath, klass, newClassId }) =>
  handleResultState(useRetrieveClassQuery(newClassId), newClass => (
    <>
      <pages.Section>
        <StudentTable klass={klass} newClass={newClass} />
      </pages.Section>
      <pages.Section>
        <TransferStudentsForm
          classPath={classPath}
          studentUsers={studentUsers}
          klass={klass}
          newClass={newClass}
        />
      </pages.Section>
    </>
  ))

const _TransferStudents: FC<
  TransferStudentsState & {
    classId: Class["id"]
    classPath: string
  }
> = ({ classId, classPath, ...state }) => {
  const [newClassId, setNewClassId] = useState<Class["id"]>()

  return handleResultState(useRetrieveClassQuery(classId), klass => (
    <>
      <pages.Section>
        <Typography align="center" variant="h4">
          Move students from class {klass.name} ({klass.id})
        </Typography>
        <Link className="back-to" to={classPath}>
          Class
        </Link>
      </pages.Section>
      {newClassId ? (
        <NewClassSections
          classPath={classPath}
          klass={klass}
          newClassId={newClassId}
          {...state}
        />
      ) : (
        <pages.Section>
          <SelectClassForm
            classId={classId}
            classPath={classPath}
            setNewClassId={setNewClassId}
          />
        </pages.Section>
      )}
    </>
  ))
}

export interface TransferStudentsState {
  studentUsers: Array<StudentUser<ListUsersResult["data"][number]>>
}

export interface TransferStudentsProps {}

const TransferStudents: FC<TransferStudentsProps> = () => {
  const params = useParams({ classId: classIdSchema.required() })
  const { state } = useLocation<TransferStudentsState>()

  if (!params)
    return <Navigate to={paths.teacher.dashboard.tab.classes._} replace />

  const { classId } = params

  const classPath = generatePath(paths.teacher.dashboard.tab.classes.class._, {
    classId,
  })

  return state && state.studentUsers && state.studentUsers.length ? (
    <_TransferStudents
      classId={classId}
      classPath={classPath}
      studentUsers={state.studentUsers}
    />
  ) : (
    <Navigate to={classPath} replace />
  )
}

export default TransferStudents
