import {
  MailOutline as MailOutlineIcon,
  Send as SendIcon,
  SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
} from "@mui/icons-material"
import { type SvgIconProps } from "@mui/material"
import { type FC, useEffect } from "react"
import * as yup from "yup"

import * as page from "codeforlife/components/page"
import { useNavigate, useParams, useSearchParams } from "codeforlife/hooks"

import { paths } from "../../router"
import Status from "./Status"

export interface EmailVerificationProps {}

const EmailVerification: FC<EmailVerificationProps> = () => {
  const navigate = useNavigate()
  const params = useParams({
    userType: yup
      .string()
      .oneOf(["teacher", "independent"] as const)
      .required(),
  })
  const searchParams = useSearchParams({
    success: yup.boolean().required().default(true),
  })

  useEffect(() => {
    if (!params) navigate(paths.error.pageNotFound._)
  }, [params, navigate])

  if (!params) return <></>

  const svgIconProps: SvgIconProps = {
    color: "white",
    style: { fontSize: "100px" },
  }

  return (
    <page.Page>
      <page.Section maxWidth="md" className="flex-center">
        {searchParams?.success ? (
          <Status
            userType={params.userType}
            header="We need to verify your email address"
            body={[
              "An email has been sent to you. Make sure to check your spam.",
              "Please follow the link within the email to verify your details. This will expire in 1 hour.",
            ]}
            icon={<SendIcon {...svgIconProps} />}
            buttonProps={[
              {
                to: import.meta.env.VITE_LINK_OPEN_VERIFY_EMAIL_IN_GMAIL,
                target: "_blank",
                children: "Open in Gmail",
                endIcon: <MailOutlineIcon />,
              },
              {
                to: import.meta.env.VITE_LINK_OPEN_VERIFY_EMAIL_IN_OUTLOOK,
                target: "_blank",
                children: "Open in Outlook",
                endIcon: <MailOutlineIcon />,
              },
            ]}
          />
        ) : (
          <Status
            userType={params.userType}
            header="Your email address verification failed"
            body={[
              "You used an invalid link, either you mistyped the URL or that link is expired.",
              "When you next attempt to log in, you will be sent a new verification email.",
            ]}
            icon={<SentimentVeryDissatisfiedIcon {...svgIconProps} />}
          />
        )}
      </page.Section>
    </page.Page>
  )
}

export default EmailVerification