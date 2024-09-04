import * as forms from "codeforlife/components/form"
import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"
import { generatePath } from "react-router"
import { submitForm } from "codeforlife/utils/form"
import { useNavigate } from "codeforlife/hooks"

import {
  ClassNameField,
  ReadClassmatesDataField,
  TeacherAutocompleteField,
} from "../../../components/form"
import { type RetrieveUserResult } from "../../../api/user"
import { paths } from "../../../routes"
import { useCreateClassMutation } from "../../../api/klass"

export interface CreateClassFormProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
}

const CreateClassForm: FC<CreateClassFormProps> = ({ authUser }) => {
  const [createClass] = useCreateClassMutation()
  const navigate = useNavigate()

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Create a new class
      </Typography>
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
        onSubmit={submitForm(createClass, {
          then: ({ id }, { name }) => {
            navigate(
              generatePath(paths.teacher.dashboard.tab.classes.class._, {
                classId: id,
              }),
              {
                state: {
                  notifications: [
                    {
                      props: {
                        children: `The class ${name} has been created successfully.`,
                      },
                    },
                  ],
                },
              },
            )
          },
        })}
      >
        <Stack gap={2}>
          <Stack direction={{ sm: "row" }} gap={2}>
            <ClassNameField required />
            {authUser.teacher.is_admin && <TeacherAutocompleteField required />}
          </Stack>
          <ReadClassmatesDataField />
          <forms.SubmitButton>Create class</forms.SubmitButton>
        </Stack>
      </forms.Form>
    </>
  )
}

export default CreateClassForm
