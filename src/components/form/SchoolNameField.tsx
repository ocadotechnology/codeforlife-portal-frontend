import { TextField, type TextFieldProps } from "codeforlife/components/form"
import { Business as BusinessIcon } from "@mui/icons-material"
import { type FC } from "react"
import { InputAdornment } from "@mui/material"
import { schemas } from "codeforlife/api"

export interface SchoolNameFieldProps
  extends Omit<
    TextFieldProps,
    "required" | "schema" | "name" | "label" | "placeholder" | "InputProps"
  > {}

const SchoolNameField: FC<SchoolNameFieldProps> = textFieldProps => {
  return (
    <TextField
      required
      schema={schemas.school.name}
      name="name"
      label="Name of school or club"
      placeholder="Enter name of school or club"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <BusinessIcon />
          </InputAdornment>
        ),
      }}
      {...textFieldProps}
    />
  )
}

export default SchoolNameField
