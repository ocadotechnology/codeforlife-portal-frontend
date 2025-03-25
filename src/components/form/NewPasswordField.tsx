import { Button, Dialog, Typography } from "@mui/material"
import { type FC, useState } from "react"
import {
  PasswordField,
  type PasswordFieldProps,
} from "codeforlife/components/form"
import { schemas } from "codeforlife/api"

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
    teacher: schemas.teacherUser.password,
    independent: schemas.indyUser.password,
    student: schemas.studentUser.password,
  }[userType]

  if (
    pwnedPasswordsOnline &&
    (userType === "teacher" || userType === "independent")
  ) {
    schema = schema.concat(pwnedPasswordsSchema.required())
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
