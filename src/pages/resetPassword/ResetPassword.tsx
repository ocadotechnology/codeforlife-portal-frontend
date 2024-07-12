import { type FC, useEffect } from "react"
import * as yup from "yup"

import * as page from "codeforlife/components/page"
import { useNavigate, useParams } from "codeforlife/hooks"
import { ThemedBox } from "codeforlife/theme"

import { themeOptions } from "../../app/theme"
import { paths } from "../../router"
import EmailForm from "./EmailForm"
import PasswordForm from "./PasswordForm"

export interface ResetPasswordProps {}

const ResetPassword: FC<ResetPasswordProps> = () => {
  const navigate = useNavigate()

  const params = useParams({
    userType: yup
      .string()
      .oneOf(["teacher", "independent"] as const)
      .required(),
    userId: yup.number(),
    token: yup.string(),
  })

  useEffect(() => {
    if (!params) navigate(paths.error.type.pageNotFound._)
  }, [navigate, params])

  if (!params) return <></>

  return (
    <page.Page>
      <page.Section maxWidth="md">
        <ThemedBox withShapes options={themeOptions} userType={params.userType}>
          {params.userId && params.token ? (
            <PasswordForm
              userType={params.userType}
              userId={params.userId}
              token={params.token}
            />
          ) : (
            <EmailForm />
          )}
        </ThemedBox>
      </page.Section>
    </page.Page>
  )
}

export default ResetPassword
