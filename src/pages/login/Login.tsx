import { useEffect, type FC } from "react"
import * as yup from "yup"

import * as page from "codeforlife/components/page"
import {
  useNavigate,
  useSearchParamEntries,
  useSessionMetadata,
} from "codeforlife/hooks"
import { tryValidateSync } from "codeforlife/utils/schema"

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

  const searchParams = tryValidateSync(
    useSearchParamEntries(),
    yup.object({
      verifyEmail: yup.boolean().default(false),
    }),
  )

  useEffect(() => {
    if (sessionMetadata && !sessionMetadata.auth_factors.length) {
      navigate(
        {
          teacher: paths.teacher.dashboard.school._,
          student: paths.student.dashboard._,
          indy: paths.indy.dashboard._,
        }[sessionMetadata.user_type],
        { replace: true },
      )
    }
  }, [sessionMetadata, navigate])

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
