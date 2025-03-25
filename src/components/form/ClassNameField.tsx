import { TextField, type TextFieldProps } from "codeforlife/components/form"
import { type FC } from "react"
import { InputAdornment } from "@mui/material"
import { PeopleAlt as PeopleAltIcon } from "@mui/icons-material"
import { schemas } from "codeforlife/api"

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
    schema={schemas.klass.name}
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
