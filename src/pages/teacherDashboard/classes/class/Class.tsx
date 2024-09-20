import * as pages from "codeforlife/components/page"
import { type FC } from "react"
import { Navigate } from "codeforlife/components/router"
import { useParams } from "codeforlife/hooks"

import StudentTable from "./StudentTable"
import { classIdSchema } from "../../../../app/schemas"
import { paths } from "../../../../routes"

export interface ClassProps {}

const Class: FC<ClassProps> = () => {
  const params = useParams({ classId: classIdSchema.required() })

  if (!params)
    return <Navigate to={paths.teacher.dashboard.tab.classes._} replace />

  const { classId } = params

  return (
    <>
      <pages.Section>
        <StudentTable classId={classId} />
      </pages.Section>
    </>
  )
}

export default Class
