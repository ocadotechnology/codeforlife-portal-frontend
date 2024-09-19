import { Button, Dialog, Typography } from "@mui/material"
import { type FC, useState } from "react"

import {
  PasswordField,
  type PasswordFieldProps,
} from "codeforlife/components/form"

import {
  indyPasswordSchema,
  studentPasswordSchema,
  teacherPasswordSchema,
} from "../../app/schemas"
import { usePwnedPasswordsApi } from "../../app/hooks"

export interface NewPasswordFieldProps
  extends Omit<
    PasswordFieldProps,
    "required" | "withRepeatField" | "schema" | "validateOptions"
  > {
  userType: "teacher" | "independent" | "student"
}

const NewPasswordField: FC<NewPasswordFieldProps> = ({
  userType,
  ...passwordFieldProps
}) => {
  const [pwnedPasswordsSchema, pwnedPasswordsOnline] = usePwnedPasswordsApi()
  const [dialogOpen, setDialogOpen] = useState(!pwnedPasswordsOnline)

  let schema = {
    teacher: teacherPasswordSchema,
    independent: indyPasswordSchema,
    student: studentPasswordSchema,
  }[userType]

  if (
    pwnedPasswordsOnline &&
    (userType === "teacher" || userType === "independent")
  ) {
    schema = schema.concat(pwnedPasswordsSchema)
  }

  return (
    <>
      <PasswordField
        required
        withRepeatField
        schema={schema}
        validateOptions={{ abortEarly: false }}
        {...passwordFieldProps}
      />
      <Dialog open={dialogOpen}>
        <Typography variant="h5" className="no-override">
          Password Vulnerability Check Unavailable
        </Typography>
        <Typography className="no-override">
          We are currently unable to check your password vulnerability. Please
          ensure that you are using a strong password. If you are happy to
          continue, please confirm.
        </Typography>
        <Button
          className="no-override"
          onClick={() => {
            setDialogOpen(false)
          }}
        >
          I understand
        </Button>
      </Dialog>
    </>
  )
}

export default NewPasswordField
