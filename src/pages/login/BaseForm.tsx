import { Stack, Typography, useTheme } from "@mui/material"
import { type FormikValues } from "formik"

import { Form, type FormProps } from "codeforlife/components/form"
import { ThemedBox, type ThemedBoxProps } from "codeforlife/theme"

import { themeOptions } from "../../app/theme"

export interface BaseFormProps<Values> extends FormProps<Values> {
  themedBoxProps: Omit<ThemedBoxProps, "withShapes">
  header: string
  subheader?: string
}

const BaseForm = <Values extends FormikValues = FormikValues>({
  themedBoxProps,
  header,
  subheader,
  ...formProps
}: BaseFormProps<Values>): JSX.Element => {
  const theme = useTheme()

  return (
    <ThemedBox withShapes options={themeOptions} {...themedBoxProps}>
      <Stack
        sx={{
          paddingY: theme.spacing(1.5),
          paddingX: theme.spacing(3),
        }}
      >
        <Typography align="center" variant="h4">
          {header}
        </Typography>
        {subheader && (
          <Typography align="center" variant="h6">
            {subheader}
          </Typography>
        )}
        <Form {...formProps} />
      </Stack>
    </ThemedBox>
  )
}

export default BaseForm
