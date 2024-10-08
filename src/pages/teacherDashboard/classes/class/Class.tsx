import * as pages from "codeforlife/components/page"
import { type Class } from "codeforlife/api"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { Navigate } from "codeforlife/components/router"
import { Typography } from "@mui/material"
import { handleResultState } from "codeforlife/utils/api"
import { useParams } from "codeforlife/hooks"

import StudentTable from "./StudentTable"
import { classIdSchema } from "../../../../app/schemas"
import { paths } from "../../../../routes"
import { useRetrieveClassQuery } from "../../../../api/klass"

const _Class: FC<{ classId: Class["id"] }> = ({ classId }) => {
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
    </>
  ))
}

export interface ClassProps {}

const Class: FC<ClassProps> = () => {
  const params = useParams({ classId: classIdSchema.required() })

  if (!params)
    return <Navigate to={paths.teacher.dashboard.tab.classes._} replace />

  return <_Class {...params} />
}

export default Class
