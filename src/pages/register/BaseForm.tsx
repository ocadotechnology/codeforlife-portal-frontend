import { FormHelperText, Typography } from "@mui/material"
import { ThemedBox, type ThemedBoxProps } from "codeforlife/theme"
import { type FC } from "react"

import { themeOptions } from "../../app/theme"

export interface BaseFormProps extends ThemedBoxProps {
  header: string
  subheader: string
  description: string
}

const BaseForm: FC<BaseFormProps> = ({
  header,
  subheader,
  description,
  userType,
  children,
}) => (
  <ThemedBox options={themeOptions} userType={userType} height="100%" p={5}>
    <Typography variant="h4" textAlign="center">
      {header}
    </Typography>
    <Typography>{subheader}</Typography>
    <FormHelperText sx={({ spacing }) => ({ marginBottom: spacing(3.5) })}>
      {description}
    </FormHelperText>
    {children}
  </ThemedBox>
)

export default BaseForm
