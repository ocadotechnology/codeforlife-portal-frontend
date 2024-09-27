import * as page from "codeforlife/components/page"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { type StudentUser } from "codeforlife/api"
import { Typography } from "@mui/material"
import { generatePath } from "react-router"

import { type RetrieveClassResult } from "../../../../api/klass"
import { type RetrieveUserResult } from "../../../../api/user"
import { paths } from "../../../../routes"

export interface AddedStudentProps {
  klass: RetrieveClassResult
  user: StudentUser<RetrieveUserResult>
}

const AddedStudent: FC<AddedStudentProps> = ({ klass, user }) => (
  <>
    <page.Section>
      <Typography variant="h4" align="center" mb={0}>
        External student added to class {klass.name} ({klass.id})
      </Typography>
    </page.Section>
    <page.Section>
      <Typography>
        The student has been successfully added to the class {klass.name}.
      </Typography>
      <Typography>
        Please provide the student with their new login details:
      </Typography>
    </page.Section>
    <page.Section boxProps={{ bgcolor: "info.main" }}>
      <Typography>
        <strong>Class Access Code:</strong> {klass.id}
      </Typography>
      <Typography>
        <strong>Name:</strong> {user.first_name}
      </Typography>
    </page.Section>
    <page.Section>
      <Typography>
        {user.first_name} should now login as a student with these details.
      </Typography>
      <Typography mb={7}>
        {user.first_name}&apos;s password is unchanged. You may manage this
        student, including changing their name and password, as with other
        students.
      </Typography>
      <Link
        className="back-to"
        to={generatePath(paths.teacher.dashboard.tab.classes.class._, {
          classId: klass.id,
        })}
      >
        Class
      </Link>
    </page.Section>
  </>
)

export default AddedStudent
