import * as forms from "codeforlife/components/form"
import { type FC } from "react"
import { type SubmitFormOptions } from "codeforlife/utils/form"
import { Typography } from "@mui/material"

import { ClassNameField, ReadClassmatesDataField } from "../../components/form"
import {
  type CreateClassArg,
  type CreateClassResult,
  useCreateClassMutation,
} from "../../api/klass"

export interface CreateClassFormProps {
  submitOptions: SubmitFormOptions<
    CreateClassArg,
    CreateClassArg,
    CreateClassResult
  >
}

const CreateClassForm: FC<CreateClassFormProps> = ({ submitOptions }) => (
  <>
    <Typography>
      When you set up a new class, a unique class access code will automatically
      be generated, with you being identified as the teacher for that class.
    </Typography>
    <forms.Form
      initialValues={{
        name: "",
        read_classmates_data: false,
      }}
      useMutation={useCreateClassMutation}
      submitOptions={submitOptions}
    >
      <ClassNameField required />
      <ReadClassmatesDataField />
      <forms.SubmitButton>Create class</forms.SubmitButton>
    </forms.Form>
  </>
)

export default CreateClassForm
