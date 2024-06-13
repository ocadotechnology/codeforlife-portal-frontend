import type { FC } from "react"
// import * as yup from "yup"

import * as page from "codeforlife/components/page"
// import { useSearchParamEntries } from "codeforlife/hooks"
// import { tryValidateSync } from "codeforlife/utils/schema"

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
