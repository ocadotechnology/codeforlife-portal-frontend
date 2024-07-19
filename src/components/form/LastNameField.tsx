import { type FC } from "react"
import { string as YupString } from "yup"

import { TextField, type TextFieldProps } from "codeforlife/components/form"

export type LastNameFieldProps = Omit<
  TextFieldProps,
  "type" | "name" | "schema"
> &
  Partial<Pick<TextFieldProps, "name">>

const LastNameField: FC<LastNameFieldProps> = ({
  name = "last_name",
  label = "Last name",
  placeholder = "Enter your last name",
  ...otherTextFieldProps
}) => (
  <TextField
    schema={YupString().max(150)}
    name={name}
    label={label}
    placeholder={placeholder}
    {...otherTextFieldProps}
  />
)

export default LastNameField
