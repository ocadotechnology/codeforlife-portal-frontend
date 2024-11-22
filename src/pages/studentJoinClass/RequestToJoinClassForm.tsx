import * as forms from "codeforlife/components/form"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { Stack } from "@mui/material"
import { type User } from "codeforlife/api"
import { useNavigate } from "codeforlife/hooks"

import { classIdSchema } from "../../app/schemas.ts"
import { paths } from "../../routes"
import { useUpdateUserMutation } from "../../api/user"

export interface RequestToJoinClassFormProps {
  indyUser: Pick<User, "id" | "requesting_to_join_class">
}

const RequestToJoinClassForm: FC<RequestToJoinClassFormProps> = ({
  indyUser,
}) => {
  const navigate = useNavigate()

  return (
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
        <LinkButton variant="outlined" to={paths.indy.dashboard._}>
          Cancel
        </LinkButton>
        <forms.SubmitButton>Request</forms.SubmitButton>
      </Stack>
    </forms.Form>
  )
}

export default RequestToJoinClassForm
