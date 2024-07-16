import { Button, Dialog, Typography } from "@mui/material"
import { type FC, useState } from "react"

import { PasswordField } from "codeforlife/components/form"

import {
  indyPasswordSchema,
  pwnedPasswordSchema,
  studentPasswordSchema,
  teacherPasswordSchema,
} from "../app/schemas"

export interface NewPasswordFieldProps {
  userType: "teacher" | "independent" | "student"
}

const NewPasswordField: FC<NewPasswordFieldProps> = ({ userType }) => {
  const [pwnedPasswords, setPwnedPasswords] = useState<{
    online: boolean
    dialogOpen: boolean
  }>({ online: true, dialogOpen: false })

  let schema = {
    teacher: teacherPasswordSchema,
    independent: indyPasswordSchema,
    student: studentPasswordSchema,
  }[userType]()

  if (
    pwnedPasswords.online &&
    (userType === "teacher" || userType === "independent")
  ) {
    schema = pwnedPasswordSchema({
      schema,
      onError: () => {
        // Alert user test couldn't be carried out.
        setPwnedPasswords({ online: false, dialogOpen: true })
      },
    })
  }

  return (
    <>
      <PasswordField
        required
        withRepeatField
        schema={schema}
        validateOptions={{ abortEarly: false }}
      />
      <Dialog open={!pwnedPasswords.online && pwnedPasswords.dialogOpen}>
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
            setPwnedPasswords({ online: false, dialogOpen: false })
          }}
        >
          I understand
        </Button>
      </Dialog>
    </>
  )
}

export default NewPasswordField
