import { Route } from "react-router"

import EmailVerification from "../pages/emailVerification/EmailVerification"
import Login from "../pages/login/Login"
import Register from "../pages/register/Register"
import ResetPassword from "../pages/resetPassword/ResetPassword"
import paths from "./paths"

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
    <Route path={paths.login.indy._} element={<Login form="indy" />} />
    <Route
      path={paths.register.emailVerification.userType._}
      element={<EmailVerification />}
    />
    <Route path={paths.resetPassword._} element={<ResetPassword />} />
    <Route path={paths.register._} element={<Register />} />
  </>
)

export default authentication
