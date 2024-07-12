import { Stack, Typography } from "@mui/material"
import { type FC, type ReactElement } from "react"

import {
  Link,
  LinkButton,
  type LinkButtonProps,
} from "codeforlife/components/router"
import { ThemedBox, type ThemedBoxProps } from "codeforlife/theme"

import { themeOptions } from "../../app/theme"
import { paths } from "../../router"

export interface StatusProps {
  userType: ThemedBoxProps["userType"]
  header: string
  body: string[]
  icon: ReactElement
  buttonProps?: LinkButtonProps[]
}

const Status: FC<StatusProps> = ({
  userType,
  header,
  body,
  icon,
  buttonProps,
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
      {buttonProps && (
        <Stack direction="row" spacing={5}>
          {buttonProps.map((props, index) => (
            <LinkButton key={index} {...props} />
          ))}
        </Stack>
      )}
    </Stack>
    <Link to={paths._} className="back-to">
      homepage
    </Link>
  </ThemedBox>
)

export default Status
