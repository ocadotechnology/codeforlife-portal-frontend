import { Button, Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { type IndependentUser } from "codeforlife/api"
import { LinkButton } from "codeforlife/components/router"
import { useNavigate } from "react-router"

import { type RetrieveUserResult, useUpdateUserMutation } from "../../api/user"
import { handleResultState } from "codeforlife/utils/api"
import { paths } from "../../routes"
import { useRetrieveSchoolQuery } from "../../api/school"

export interface RequestPendingProps {
  user: IndependentUser<RetrieveUserResult>
}

const RequestPending: FC<RequestPendingProps> = ({ user }) => {
  const navigate = useNavigate()
  const [updateUser] = useUpdateUserMutation()

  return handleResultState(
    useRetrieveSchoolQuery(user.requesting_to_join_class!.school),
    school => (
      <>
        <Typography variant="h5">Request pending</Typography>
        <Typography>
          Your request to join class {user.requesting_to_join_class!.id} in the
          school or club {school.name} is still pending.
        </Typography>
        <Typography>
          The teacher for that class must review and approve the request to
          complete the process.
        </Typography>
        <Typography>
          If successful, the teacher will then contact you with your new login
          details.
        </Typography>
        <Typography>
          <strong>Warning:</strong> once the teacher accepts you to their class,
          that teacher and the school or club will manage your account.
        </Typography>
        <Typography>
          You may cancel your request now, before the teacher makes their
          decision.
        </Typography>
        <Stack direction="row" spacing={2}>
          <LinkButton variant="outlined" to={paths.indy.dashboard._}>
            Back
          </LinkButton>
          <Button
            onClick={() => {
              void updateUser({
                id: user.id,
                requesting_to_join_class: null,
              })
                .unwrap()
                .then(() => {
                  void navigate(".", {
                    state: {
                      notifications: [
                        {
                          props: {
                            children:
                              "Your request to join a school has been revoked successfully.",
                          },
                        },
                      ],
                    },
                  })
                })
            }}
          >
            Cancel request
          </Button>
        </Stack>
      </>
    ),
  )
}

export default RequestPending
