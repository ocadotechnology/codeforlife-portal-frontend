import * as forms from "codeforlife/components/form"
import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"
import { type SubmitFormOptions } from "codeforlife/utils/form"
import { useInputRef } from "codeforlife/hooks"

import {
  ClassNameField,
  ReadClassmatesDataField,
  TeacherAutocompleteField,
} from "../../components/form"
import {
  type CreateClassArg,
  type CreateClassResult,
  useCreateClassMutation,
} from "../../api/klass"
import { type RetrieveUserResult } from "../../api/user"

export interface CreateClassFormProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
  submitOptions: SubmitFormOptions<
    CreateClassArg,
    CreateClassArg,
    CreateClassResult
  >
}

const CreateClassForm: FC<CreateClassFormProps> = ({
  authUser,
  submitOptions,
}) => {
  const nameFieldRef = useInputRef()
  const teacherFieldRef = useInputRef()
  const readClassmatesDataFieldRef = useInputRef()

  return (
    <>
      <Typography>
        {authUser.teacher.is_admin
          ? "When you set up a new class, a unique class access code will automatically be generated for the teacher assigned to the class."
          : "When you set up a new class, a unique class access code will automatically be generated, with you being identified as the teacher for that class."}
      </Typography>
      <forms.Form
        initialValues={{
          name: "",
          teacher: authUser.teacher.id,
          read_classmates_data: false,
        }}
        order={[
          { name: "name", inputRef: nameFieldRef },
          { name: "teacher", inputRef: teacherFieldRef },
          {
            name: "read_classmates_data",
            inputRef: readClassmatesDataFieldRef,
          },
        ]}
        useMutation={useCreateClassMutation}
        submitOptions={submitOptions}
      >
        <Stack gap={2}>
          <Stack direction={{ sm: "row" }} gap={2}>
            <ClassNameField inputRef={nameFieldRef} required />
            {authUser.teacher.is_admin && (
              <TeacherAutocompleteField required inputRef={teacherFieldRef} />
            )}
          </Stack>
          <ReadClassmatesDataField inputRef={readClassmatesDataFieldRef} />
          <forms.SubmitButton>Create class</forms.SubmitButton>
        </Stack>
      </forms.Form>
    </>
  )
}

export default CreateClassForm
