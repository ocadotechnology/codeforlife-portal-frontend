import * as page from "codeforlife/components/page"
import * as yup from "yup"
import { useSearchParams, useSessionMetadata } from "codeforlife/hooks"
import { type FC } from "react"
import { Navigate } from "codeforlife/components/router"

import * as studentForms from "./studentForms"
import * as teacherForms from "./teacherForms"
import IndyForm from "./IndyForm"
import { paths } from "../../routes"

export interface LoginProps {
  form:
    | "teacher-email"
    | "teacher-otp"
    | "teacher-otp-bypass-token"
    | "student-class"
    | "student-first-name"
    | "indy"
}

const Login: FC<LoginProps> = ({ form }) => {
  const sessionMetadata = useSessionMetadata()
  const searchParams = useSearchParams({
    verifyEmail: yup.boolean().default(false),
  })

  if (sessionMetadata) {
    const { user_type, auth_factors } = sessionMetadata

    if (
      user_type === "teacher" &&
      auth_factors.includes("otp") &&
      form !== "teacher-otp" &&
      form !== "teacher-otp-bypass-token"
    ) {
      return <Navigate to={paths.login.teacher.otp._} replace />
    }

    return (
      <Navigate
        to={
          {
            teacher: paths.teacher.dashboard.tab.school._,
            student: paths.student.dashboard._,
            indy: paths.indy.dashboard._,
          }[user_type]
        }
        replace
      />
    )
  }

  return (
    <page.Page>
      {searchParams?.verifyEmail && (
        <page.Notification>
          Your email address was successfully verified, please log in.
        </page.Notification>
      )}
      <page.Section maxWidth="md">
        {
          {
            "teacher-email": <teacherForms.Email />,
            "teacher-otp": <teacherForms.Otp />,
            "teacher-otp-bypass-token": <teacherForms.OtpBypassToken />,
            "student-class": <studentForms.Class />,
            "student-first-name": <studentForms.FirstName />,
            indy: <IndyForm />,
          }[form]
        }
      </page.Section>
    </page.Page>
  )
}

export default Login
