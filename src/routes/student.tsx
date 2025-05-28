import { Route } from "react-router-dom"

import Student from "../pages/student/Student"
import StudentAccount from "../pages/studentAccount/StudentAccount"
import StudentDashboard from "../pages/studentDashboard/StudentDashboard"
import StudentJoinClass from "../pages/studentJoinClass/StudentJoinClass"
import paths from "./paths"

const student = (
  <>
    <Route path={paths.student._} element={<Student />} />
    <Route
      path={paths.student.dashboard.account._}
      element={<StudentAccount userType="student" />}
    />
    <Route
      path={paths.indy.dashboard.account._}
      element={<StudentAccount userType="indy" />}
    />
    <Route
      path={paths.student.dashboard._}
      element={<StudentDashboard userType="student" />}
    />
    <Route
      path={paths.indy.dashboard._}
      element={<StudentDashboard userType="indy" />}
    />
    <Route
      path={paths.indy.dashboard.joinClass._}
      element={<StudentJoinClass />}
    />
  </>
)

export default student
