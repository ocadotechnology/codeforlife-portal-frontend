import { type FC, type ReactElement } from "react"
import { Stack, Typography } from "@mui/material"
import { ThemedBox, type ThemedBoxProps } from "codeforlife/theme"
import { Link } from "codeforlife/components/router"

import {
  OpenInEmailButtons,
  type OpenInEmailButtonsProps,
} from "../../components"
import { paths } from "../../router"
import { themeOptions } from "../../app/theme"

export interface StatusProps {
  userType: ThemedBoxProps["userType"]
  header: string
  body: string[]
  icon: ReactElement
  openInEmailButtonsProps?: OpenInEmailButtonsProps
}

const Status: FC<StatusProps> = ({
  userType,
  header,
  body,
  icon,
  openInEmailButtonsProps,
}) => (
  <ThemedBox withShapes options={themeOptions} userType={userType}>
    <Stack alignItems="center" marginBottom={2.5}>
      <Typography variant="h4" paddingY={1} textAlign="center">
        {header}
      </Typography>
      {icon}
      <Stack>
        {body.map((text, index) => (
          <Typography key={index}>{text}</Typography>
        ))}
      </Stack>
      {openInEmailButtonsProps && (
        <OpenInEmailButtons {...openInEmailButtonsProps} />
      )}
    </Stack>
    <Link to={paths._} className="back-to">
      homepage
    </Link>
  </ThemedBox>
)

export default Status
