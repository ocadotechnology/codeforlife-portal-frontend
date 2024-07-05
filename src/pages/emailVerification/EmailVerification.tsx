import { type FC, useEffect } from "react"
import * as yup from "yup"

import * as page from "codeforlife/components/page"
import { useNavigate, useParams, useSearchParams } from "codeforlife/hooks"

import PaperPlaneImg from "../../images/paper_plane.png"
import SadFaceImg from "../../images/sadface.png"
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

  return (
    <page.Page>
      <page.Section maxWidth="md" className="flex-center">
        {searchParams?.success ? (
          <Status
            userType={params.userType}
            header="We need to verify your email address"
            body={[
              "An email has been sent to the address you provided.",
              "Please follow the link within the email to verify your details. This will expire in 1 hour.",
              "If you don't receive the email within the next few minutes, check your spam folder.",
            ]}
            imageProps={{
              alt: "PaperPlane",
              src: PaperPlaneImg,
            }}
          />
        ) : (
          <Status
            userType={params.userType}
            header="Your email address verification failed"
            body={[
              "You used an invalid link, either you mistyped the URL or that link is expired.",
              "When you next attempt to log in, you will be sent a new verification email.",
            ]}
            imageProps={{
              alt: "SadFace",
              src: SadFaceImg,
            }}
          />
        )}
      </page.Section>
    </page.Page>
  )
}

export default EmailVerification
