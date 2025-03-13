import { TextField, type TextFieldProps } from "codeforlife/components/form"
import { Business as BusinessIcon } from "@mui/icons-material"
import { type FC } from "react"
import { InputAdornment } from "@mui/material"
import { nameSchema } from "codeforlife/schemas/school"

export interface SchoolNameFieldProps
  extends Omit<
    TextFieldProps,
    "required" | "schema" | "name" | "label" | "placeholder" | "InputProps"
  > {}

const SchoolNameField: FC<SchoolNameFieldProps> = textFieldProps => {
  return (
    <TextField
      required
      schema={nameSchema}
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
