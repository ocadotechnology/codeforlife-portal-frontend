import { Route } from "react-router-dom"

// import Teacher from "../../pages/teacher/Teacher"
import TeacherDashboard from "../pages/teacherDashboard/TeacherDashboard"
// import AddedExternalStudent from "../../pages/teacherDashboard/classes/AddedExternalStudent"
// import StudentCredentials from "../../pages/teacherDashboard/classes/editClass/student/editStudent/StudentCredentials"
// import TeacherOnboarding from "../../pages/teacherOnboarding/TeacherOnboarding"
import paths from "./paths"

const teacher = (
  <>
    {/* <Route path={paths.teacher._} element={<Teacher />} /> */}
    {/* <Route path={paths.teacher.onboarding._} element={<TeacherOnboarding />} /> */}
    <Route
      path={paths.teacher.dashboard.tab.school.leave._}
      element={<TeacherDashboard tab="school" view="leave" />}
    />
    <Route
      path={paths.teacher.dashboard.tab.school._}
      element={<TeacherDashboard tab="school" />}
    />
    <Route
      path={paths.teacher.dashboard.tab.classes.class.joinRequest._}
      element={<TeacherDashboard tab="classes" view="join-class-request" />}
    />
    <Route
      path={paths.teacher.dashboard.tab.classes.class.students.resetPassword._}
      element={
        <TeacherDashboard tab="classes" view="reset-students-password" />
      }
    />
    <Route
      path={paths.teacher.dashboard.tab.classes.class.students.studentUser._}
      element={<TeacherDashboard tab="classes" view="update-student-user" />}
    />
    <Route
      path={paths.teacher.dashboard.tab.classes.class.students.transfer._}
      element={<TeacherDashboard tab="classes" view="transfer-students" />}
    />
    <Route
      path={paths.teacher.dashboard.tab.classes.class._}
      element={<TeacherDashboard tab="classes" view="class" />}
    />
    <Route
      path={paths.teacher.dashboard.tab.classes._}
      element={<TeacherDashboard tab="classes" />}
    />
    <Route
      path={paths.teacher.dashboard.tab.account._}
      element={<TeacherDashboard tab="account" />}
    />
  </>
)

export default teacher
