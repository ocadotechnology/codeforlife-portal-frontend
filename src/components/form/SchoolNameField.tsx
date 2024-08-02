import * as yup from "yup"
import { Business as BusinessIcon } from "@mui/icons-material"
import { type FC } from "react"
import { InputAdornment } from "@mui/material"
import { TextField } from "codeforlife/components/form"

export interface SchoolNameFieldProps {}

const SchoolNameField: FC<SchoolNameFieldProps> = () => {
  return (
    <TextField
      required
      schema={yup.string().max(200)}
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
    />
  )
}

export default SchoolNameField
