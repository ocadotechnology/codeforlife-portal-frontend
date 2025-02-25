import * as forms from "codeforlife/components/form"
import { type Dispatch, type FC, type SetStateAction } from "react"
import { Stack, Typography } from "@mui/material"
import { type Class } from "codeforlife/api"
import { LinkButton } from "codeforlife/components/router"
import { useInputRef } from "codeforlife/hooks"

import { ClassAutocompleteField } from "../../../../components/form"

export interface SelectClassFormProps {
  classId: Class["id"]
  classPath: string
  setNewClassId: Dispatch<SetStateAction<Class["id"] | undefined>>
}

const SelectClassForm: FC<SelectClassFormProps> = ({
  classId,
  classPath,
  setNewClassId,
}) => {
  const klassFieldRef = useInputRef()

  return (
    <>
      <Typography variant="h5">Select destination class</Typography>
      <Typography>
        Choose a new class from the drop down menu for the student(s).
      </Typography>
      <forms.Form
        initialValues={{ klass: "" }}
        fieldRefs={[{ name: "klass", inputRef: klassFieldRef }]}
        onSubmit={({ klass }) => {
          setNewClassId(klass)
        }}
      >
        <ClassAutocompleteField
          required
          _id={classId}
          inputRef={klassFieldRef}
        />
        <Stack direction="row" gap={2}>
          <LinkButton to={classPath} variant="outlined">
            Cancel
          </LinkButton>
          <forms.SubmitButton>Continue</forms.SubmitButton>
        </Stack>
      </forms.Form>
    </>
  )
}

export default SelectClassForm
