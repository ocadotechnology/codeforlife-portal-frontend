import { useEffect, type FC } from "react"
import * as yup from "yup"

import * as page from "codeforlife/components/page"
import {
  useNavigate,
  useSearchParams,
  useSessionMetadata,
} from "codeforlife/hooks"

import { paths } from "../../router"
import IndyForm from "./IndyForm"
import * as studentForms from "./studentForms"
import * as teacherForms from "./teacherForms"

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
  const navigate = useNavigate()
  const searchParams = useSearchParams({
    verifyEmail: yup.boolean().default(false),
  })

  useEffect(() => {
    if (sessionMetadata) {
      if (
        sessionMetadata.user_type === "teacher" &&
        sessionMetadata.auth_factors.includes("otp") &&
        form !== "teacher-otp" &&
        form !== "teacher-otp-bypass-token"
      ) {
        navigate(paths.login.teacher.otp._, { replace: true })
      } else {
        navigate(
          {
            teacher: paths.teacher.dashboard.school._,
            student: paths.student.dashboard._,
            indy: paths.indy.dashboard._,
          }[sessionMetadata.user_type],
          { replace: true },
        )
      }
    }
  }, [sessionMetadata, navigate, form])

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
