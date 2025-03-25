import * as pages from "codeforlife/components/page"
import { type Class, schemas } from "codeforlife/api"
import { useNavigate, useParams } from "codeforlife/hooks"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { Navigate } from "codeforlife/components/router"
import { Typography } from "@mui/material"
import { generatePath } from "react-router-dom"
import { handleResultState } from "codeforlife/utils/api"

import AdditionalClassDetails from "./AdditionalClassDetails"
import { CreateStudentsForm } from "../../../../components/form"
import StudentTable from "./StudentTable"
import { type StudentsCredentialsState } from "../studentsCredentials/StudentsCredentials"
import { paths } from "../../../../routes"
import { useRetrieveClassQuery } from "../../../../api/klass"

const _Class: FC<{ classId: Class["id"] }> = ({ classId }) => {
  const navigate = useNavigate()

  return handleResultState(useRetrieveClassQuery(classId), klass => (
    <>
      <pages.Section>
        <Typography variant="h4" align="center">
          Update details for {klass.name} ({klass.id})
        </Typography>
        <Link className="back-to" to={paths.teacher.dashboard.tab.classes._}>
          Classes
        </Link>
        <Typography mb={0}>
          Here you can view and manage all of your students within this class.
          You can add new students, transfer existing students to another one of
          your classes or to another teacher within your school or club, or
          remove students altogether.
        </Typography>
      </pages.Section>
      <pages.Section>
        <StudentTable classId={classId} />
      </pages.Section>
      <pages.Section boxProps={{ bgcolor: "info.main" }}>
        <CreateStudentsForm
          classId={classId}
          submitOptions={{
            then: students => {
              navigate<StudentsCredentialsState>(
                generatePath(
                  paths.teacher.dashboard.tab.classes.class.students.credentials
                    ._,
                  { classId },
                ),
                { state: { flow: "create", students } },
              )
            },
          }}
        />
      </pages.Section>
      <pages.Section>
        <AdditionalClassDetails classId={classId} />
      </pages.Section>
    </>
  ))
}

export interface ClassProps {}

const Class: FC<ClassProps> = () => {
  const params = useParams({ classId: schemas.klass.id })

  if (!params)
    return <Navigate to={paths.teacher.dashboard.tab.classes._} replace />

  return <_Class {...params} />
}

export default Class
