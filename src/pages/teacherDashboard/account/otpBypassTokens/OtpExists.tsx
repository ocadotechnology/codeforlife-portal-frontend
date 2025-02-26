import { Button, ListItemText, Stack, Typography } from "@mui/material"
import { DownloadFileButton, ItemizedList } from "codeforlife/components"
import { Autorenew as AutorenewIcon } from "@mui/icons-material"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { handleResultState } from "codeforlife/utils/api"

import {
  useGenerateOtpBypassTokensMutation,
  useListOtpBypassTokensQuery,
} from "../../../../api/otpBypassToken"
import { paths } from "../../../../routes"

export interface OtpExistsProps {}

const OtpExists: FC<OtpExistsProps> = () => {
  const [generateOtpBypassTokens] = useGenerateOtpBypassTokensMutation()

  return (
    <>
      <Typography variant="h4" align="center">
        Backup tokens
      </Typography>
      <Link className="back-to" to={paths.teacher.dashboard.tab.account._}>
        your account
      </Link>
      <Typography>
        Backup tokens can be used when your primary and backup phone numbers
        aren&apos;t available. The backup tokens below can be used for login
        verification. If you&apos;ve used up all your backup tokens, you can
        generate a new set of backup tokens. Only the backup tokens shown below
        will be valid.
      </Typography>
      {handleResultState(
        useListOtpBypassTokensQuery(
          { offset: 0, limit: 10 },
          { refetchOnMountOrArgChange: true },
        ),
        ({ data: otpBypassTokens }) => {
          const decryptedTokens = otpBypassTokens.map(
            ({ decrypted_token }) => decrypted_token,
          )

          const generateTokensButton = (
            <Button
              onClick={() => {
                void generateOtpBypassTokens(null)
              }}
              endIcon={<AutorenewIcon />}
            >
              Generate tokens
            </Button>
          )

          return otpBypassTokens.length ? (
            <>
              <ItemizedList styleType="disc">
                {decryptedTokens.map((decryptedToken, index) => (
                  <ListItemText key={`otp-bypass-token-${index}`}>
                    {decryptedToken}
                  </ListItemText>
                ))}
              </ItemizedList>
              <Typography color="error.main">
                When you generate new recovery codes, you must download or print
                the new codes. Your old codes won&apos;t work anymore.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
                {generateTokensButton}
                <DownloadFileButton
                  file={{
                    name: "otp-bypass-tokens",
                    text: decryptedTokens.join("\n"),
                    mimeType: "plain",
                  }}
                />
              </Stack>
            </>
          ) : (
            <>
              <Typography color="error.main">
                You do not currently have any OTP bypass tokens. Please generate
                a new set of tokens and download them.
              </Typography>
              {generateTokensButton}
            </>
          )
        },
      )}
    </>
  )
}

export default OtpExists
