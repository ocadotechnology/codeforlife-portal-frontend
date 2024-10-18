import * as pages from "codeforlife/components/page"
import { type Class, type Student, type User } from "codeforlife/api"
import { Link, Navigate } from "codeforlife/components/router"
import { useLocation, useParams } from "codeforlife/hooks"
import { type FC } from "react"
import { Typography } from "@mui/material"
import { generatePath } from "react-router-dom"
import { handleResultState } from "codeforlife/utils/api"

import { StudentCredentialsTable } from "../../../../components"
import { classIdSchema } from "../../../../app/schemas"
import { paths } from "../../../../routes"
import { useRetrieveClassQuery } from "../../../../api/klass.ts"

const _StudentsCredentials: FC<
  StudentsCredentialsState & {
    classId: Class["id"]
  }
> = ({ classId, flow, students }) => {
  return handleResultState(useRetrieveClassQuery(classId), klass => (
    <pages.Section>
      {/*TODO: Add warning notification here which includes button to print
       reminder cards.*/}
      {
        {
          create: (
            <>
              <Typography>
                The following credentials have been created for {klass.name} (
                {classId}). When they log in for the first time, you may want
                students to change their passwords to something more memorable.
                You can reset these details for them at any time.
              </Typography>
              <Typography>
                To log on, they will need to enter their name and passwords.
                Alternatively, you can provide them with a direct access link
                from the table below.
              </Typography>
              <Typography fontWeight="bold" color="error.main">
                You will not be shown this page again, so please make sure you
                retain a copy of the passwords for your records. You can print
                the reminder cards from the button below. Please ensure you
                share student passwords securely.
              </Typography>
            </>
          ),
          "reset-single": (
            <>
              <Typography variant="h5">
                Student password reset for class {klass.name} ({classId})
              </Typography>
              <Typography>
                The following student has had their password reset:
              </Typography>
            </>
          ),
          "reset-multiple": (
            <>
              <Typography variant="h5">
                Students&apos; passwords reset for class {klass.name} ({classId}
                )
              </Typography>
              <Typography>
                The following students have had their passwords reset:
              </Typography>
            </>
          ),
        }[flow]
      }
      <StudentCredentialsTable classId={classId} students={students} />
      <Link
        className="back-to"
        to={generatePath(paths.teacher.dashboard.tab.classes.class._, {
          classId: classId,
        })}
      >
        class
      </Link>
    </pages.Section>
  ))
}

export interface StudentsCredentialsState {
  flow: "create" | "reset-single" | "reset-multiple"
  students: Array<
    Pick<Student, "id" | "auto_gen_password"> & {
      user: Pick<User, "id" | "first_name" | "password">
    }
  >
}

export interface StudentsCredentialsProps {}

const StudentsCredentials: FC<StudentsCredentialsProps> = () => {
  const params = useParams({ classId: classIdSchema.required() })
  const { state } = useLocation<StudentsCredentialsState>()

  if (!params)
    return <Navigate to={paths.teacher.dashboard.tab.classes._} replace />

  const { classId } = params

  return !state || !state.students || !state.students.length || !state.flow ? (
    <Navigate
      to={generatePath(paths.teacher.dashboard.tab.classes.class._, {
        classId,
      })}
      replace
    />
  ) : (
    <_StudentsCredentials
      classId={classId}
      flow={state.flow}
      students={state.students}
    />
  )
}

export default StudentsCredentials
