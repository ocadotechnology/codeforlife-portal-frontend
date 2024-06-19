import { Route } from "react-router-dom"

// eslint-disable-next-line max-len
// import EmailVerification from '../../../pages/emailVerification/EmailVerification'
import Login from "../../pages/login/Login"
// import Register from '../../../pages/register/Register'
// import ResetPassword from '../../../pages/resetPassword/ResetPassword'
import paths from "../paths"

// <Route
//   path={`${paths.resetPassword._}/:userType`}
//   element={<ResetPassword />}
// />
// <Route
//   path={paths.register._}
//   element={<Register />}
// />
// <Route
//   path={`${paths.register.emailVerification._}/:userType`}
//   element={<EmailVerification />}
// />

const authentication = (
  <>
    <Route
      path={paths.login.teacher._}
      element={<Login form="teacher-email" />}
    />
    <Route
      path={paths.login.teacher.otp._}
      element={<Login form="teacher-otp" />}
    />
    <Route
      path={paths.login.teacher.otp.bypassToken._}
      element={<Login form="teacher-otp-bypass-token" />}
    />
    <Route
      path={paths.login.student._}
      element={<Login form="student-class" />}
    />
    <Route
      path={paths.login.student.class._}
      element={<Login form="student-first-name" />}
    />
    <Route path={paths.login.independent._} element={<Login form="indy" />} />
  </>
)

export default authentication
