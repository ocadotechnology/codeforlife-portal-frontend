import { type FC } from "react"
import { type SchoolTeacherUser } from "codeforlife/api"
import { Typography } from "@mui/material"
import { generatePath } from "react-router"
import { useNavigate } from "codeforlife/hooks"

import { CreateClassForm as Form } from "../../../components/form"
import { type RetrieveUserResult } from "../../../api/user"
import { paths } from "../../../routes"

export interface CreateClassFormProps {
  authUser: SchoolTeacherUser<RetrieveUserResult>
}

const CreateClassForm: FC<CreateClassFormProps> = ({ authUser }) => {
  const navigate = useNavigate()

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Create a new class
      </Typography>
      <Form
        authUser={authUser}
        submitOptions={{
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
        }}
      />
    </>
  )
}

export default CreateClassForm
