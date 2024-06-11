import type { FC } from "react"
// import * as yup from "yup"

import * as page from "codeforlife/components/page"
// import { useSearchParamEntries } from "codeforlife/hooks"
// import { tryValidateSync } from "codeforlife/utils/schema"

import IndyForm from "./IndyForm"
import StudentForm from "./StudentForm"
import * as teacherForms from "./teacherForms"

export interface LoginProps {
  form:
    | "teacher-password"
    | "teacher-otp"
    | "teacher-otp-bypass-token"
    | "student"
    | "indy"
}

const Login: FC<LoginProps> = ({ form }) => {
  // const searchParams = tryValidateSync(
  //   useSearchParamEntries(),
  //   yup.object({
  //     verifyEmail: yup.boolean().default(false),
  //   }),
  // )

  return (
    <page.Page>
      {/* {searchParams?.verifyEmail && (
        <page.Notification>
          Your email address was successfully verified, please log in.
        </page.Notification>
      )} */}
      <page.Section maxWidth="md">
        {
          {
            "teacher-password": <teacherForms.Password />,
            "teacher-otp": <teacherForms.Otp />,
            "teacher-otp-bypass-token": <teacherForms.OtpBypassToken />,
            student: <StudentForm />,
            indy: <IndyForm />,
          }[form]
        }
      </page.Section>
    </page.Page>
  )
}

export default Login
