import { TextField, type TextFieldProps } from "codeforlife/components/form"
import { type FC } from "react"
import { InputAdornment } from "@mui/material"
import { PersonOutlined as PersonOutlinedIcon } from "@mui/icons-material"
import { schemas } from "codeforlife/api"

export type LastNameFieldProps = Omit<
  TextFieldProps,
  "type" | "name" | "schema"
> &
  Partial<Pick<TextFieldProps, "name">>

const LastNameField: FC<LastNameFieldProps> = ({
  name = "last_name",
  label = "Last name",
  placeholder = "Enter your last name",
  InputProps = {},
  ...otherTextFieldProps
}) => (
  <TextField
    schema={schemas.user.last_name}
    name={name}
    label={label}
    placeholder={placeholder}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <PersonOutlinedIcon />
        </InputAdornment>
      ),
      ...InputProps,
    }}
    {...otherTextFieldProps}
  />
)

export default LastNameField
