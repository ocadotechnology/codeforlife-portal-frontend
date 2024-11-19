import * as forms from "codeforlife/components/form"
import { Button, Stack } from "@mui/material"
import { type FC } from "react"
import { type User } from "codeforlife/api"
import { useNavigate } from "codeforlife/hooks"

import { classIdSchema } from "../../app/schemas.ts"
import { paths } from "../../routes"
import { useUpdateUserMutation } from "../../api/user"

export interface UpdateRequestingToJoinClassFormProps {
  indyUser: Pick<User, "id" | "requesting_to_join_class">
}

const UpdateRequestingToJoinClassForm: FC<
  UpdateRequestingToJoinClassFormProps
> = ({ indyUser }) => {
  const navigate = useNavigate()

  return (
    <>
      <forms.Form
        initialValues={indyUser}
        useMutation={useUpdateUserMutation}
        submitOptions={{
          then: () => {
            navigate(".", {
              state: {
                notifications: [
                  {
                    index: 1,
                    props: {
                      children:
                        "Your request to join a school has been received successfully.",
                    },
                  },
                ],
              },
            })
          },
        }}
      >
        <forms.TextField
          placeholder="Class access code"
          label="Class access code"
          name="requesting_to_join_class"
          sx={{ width: { xs: "100%", sm: "50%" } }}
          schema={classIdSchema}
          required
        />

        <Stack direction="row" spacing={2} paddingY={3}>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(paths.indy.dashboard._)
            }}
          >
            Cancel
          </Button>
          <forms.SubmitButton>Request</forms.SubmitButton>
        </Stack>
      </forms.Form>
    </>
  )
}

export default UpdateRequestingToJoinClassForm
