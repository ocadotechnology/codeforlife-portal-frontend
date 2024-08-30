import * as forms from "codeforlife/components/form"
import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"
import { Typography } from "@mui/material"
import { generatePath } from "react-router"
import { submitForm } from "codeforlife/utils/form"
import { useNavigate } from "codeforlife/hooks"

import {
  ClassNameField,
  ReadClassmatesDataField,
} from "../../../components/form"
import {
  type RetrieveUserResult,
  useLazyListUsersQuery,
} from "../../../api/user"
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
        <ClassNameField required />
        <forms.ApiAutocompleteField
          useLazyListQuery={useLazyListUsersQuery}
          searchKey="name"
          filterOptions={{ only_teachers: true }}
          getOptionLabel={({ first_name, last_name }) =>
            `${first_name} ${last_name}`
          }
          getOptionKey={({ teacher }) => teacher!.id}
          textFieldProps={{ required: true, name: "teacher" }}
        />
        <ReadClassmatesDataField />
        <forms.SubmitButton>Create class</forms.SubmitButton>
      </forms.Form>
    </>
  )
}

export default CreateClassForm
