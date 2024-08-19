import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { MailOutline as MailOutlineIcon } from "@mui/icons-material"
import { Stack } from "@mui/material"

import { LINK_OUTLOOK_HOME } from "../app/env"

export interface OpenInEmailButtonsProps {
  gmailFilters: string
}

const OpenInEmailButtons: FC<OpenInEmailButtonsProps> = ({ gmailFilters }) => {
  return (
    <Stack direction="row" spacing={5}>
      <LinkButton
        to={`https://mail.google.com/mail/#search/${encodeURIComponent(gmailFilters)}`}
        target="_blank"
        endIcon={<MailOutlineIcon />}
      >
        Open in Gmail
      </LinkButton>
      <LinkButton
        to={LINK_OUTLOOK_HOME}
        target="_blank"
        endIcon={<MailOutlineIcon />}
      >
        Open in Outlook
      </LinkButton>
    </Stack>
  )
}

export default OpenInEmailButtons
