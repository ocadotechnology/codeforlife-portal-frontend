import * as forms from "codeforlife/components/form"
import { Box, Stack, Typography } from "@mui/material"
import { type FC, useEffect, useRef, useState } from "react"
import { handleResultState } from "codeforlife/utils/api"
import qrcode from "qrcode"
import { useInputRef } from "codeforlife/hooks"

import {
  type GetOtpSecretResult,
  useCreateAuthFactorMutation,
  useGetOtpSecretQuery,
} from "../../../../api/authFactor"

export interface SetupPendingProps {
  onSetup: () => void
}

const _SetupPending: FC<
  SetupPendingProps & { getOtpSecretResult: GetOtpSecretResult }
> = ({ onSetup, getOtpSecretResult: { secret, provisioning_uri } }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [failedToRenderCanvas, setFailedToRenderCanvas] = useState(false)
  const otpFieldRef = useInputRef()

  useEffect(() => {
    // TODO: set otp image url to load logo from static files in s3 bucket.
    if (canvasRef.current) {
      qrcode.toCanvas(
        canvasRef.current,
        provisioning_uri,
        //https://www.npmjs.com/package/qrcode#qr-code-options
        { margin: 0, scale: 5 },
        error => {
          if (error) {
            console.error(error)
            setFailedToRenderCanvas(true)
          } else {
            setFailedToRenderCanvas(false)
          }
        },
      )
    }
  }, [provisioning_uri])

  return (
    <>
      <Typography align="center" variant="h4" marginBottom={5}>
        Enable two-factor authentication
      </Typography>
      {failedToRenderCanvas ? (
        <Typography variant="h5" color="error.main">
          Failed to render QR Code. Please manually enter secret below.
        </Typography>
      ) : (
        <>
          <Typography>
            To start using a token generator, please use your smartphone to scan
            the QR code below. For example, use Google Authenticator.
          </Typography>
          <Box component="canvas" ref={canvasRef} marginBottom={2} />
        </>
      )}
      <Typography>
        Alternatively you can use the following secret to manually set up TOTP
        in your authenticator or password manager.
      </Typography>
      <Typography>
        TOTP Secret:{" "}
        <span style={{ textDecoration: "underline" }}>{secret}</span>
      </Typography>
      <Typography>Then, enter the token generated by the app.</Typography>
      <forms.Form
        initialValues={{ type: "otp" as const, otp: "" }}
        fieldRefs={[{ name: "otp", inputRef: otpFieldRef }]}
        useMutation={useCreateAuthFactorMutation}
        submitOptions={{ then: onSetup }}
      >
        <Stack>
          <forms.OtpField sx={{ width: "200px" }} inputRef={otpFieldRef} />
          <forms.SubmitButton sx={{ marginLeft: "auto" }}>
            Next
          </forms.SubmitButton>
        </Stack>
      </forms.Form>
    </>
  )
}

const SetupPending: FC<SetupPendingProps> = props =>
  handleResultState(useGetOtpSecretQuery(null), getOtpSecretResult => (
    <_SetupPending getOtpSecretResult={getOtpSecretResult} {...props} />
  ))

export default SetupPending
