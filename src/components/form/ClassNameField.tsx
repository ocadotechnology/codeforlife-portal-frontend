import { TextField, type TextFieldProps } from "codeforlife/components/form"
import { type FC } from "react"
import { InputAdornment } from "@mui/material"
import { PeopleAlt as PeopleAltIcon } from "@mui/icons-material"
import { string as YupString } from "yup"

export type ClassNameFieldProps = Omit<
  TextFieldProps,
  "type" | "name" | "schema"
> &
  Partial<Pick<TextFieldProps, "name">>

const ClassNameField: FC<ClassNameFieldProps> = ({
  name = "name",
  label = "Class name",
  placeholder = "Enter a class name",
  InputProps = {},
  ...otherTextFieldProps
}) => (
  <TextField
    schema={YupString().max(200)}
    name={name}
    label={label}
    placeholder={placeholder}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <PeopleAltIcon />
        </InputAdornment>
      ),
      ...InputProps,
    }}
    {...otherTextFieldProps}
  />
)

export default ClassNameField
