import { Form, type FormProps } from "codeforlife/components/form"
import { Stack, Typography, useTheme } from "@mui/material"
import { ThemedBox, type ThemedBoxProps } from "codeforlife/theme"
import { type FormValues } from "codeforlife/utils/form"
import { type JSX } from "react"

import { themeOptions } from "../../app/theme"

export type BaseFormProps<
  Values extends FormValues,
  QueryArg extends FormValues,
  ResultType,
> = FormProps<Values, QueryArg, ResultType> & {
  themedBoxProps: Omit<ThemedBoxProps, "withShapes">
  header: string
  subheader?: string
}

const BaseForm = <
  Values extends FormValues = FormValues,
  QueryArg extends FormValues = FormValues,
  ResultType = unknown,
>({
  themedBoxProps,
  header,
  subheader,
  ...formProps
}: BaseFormProps<Values, QueryArg, ResultType>): JSX.Element => {
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
        {/* @ts-expect-error props */}
        <Form {...formProps} />
      </Stack>
    </ThemedBox>
  )
}

export default BaseForm
