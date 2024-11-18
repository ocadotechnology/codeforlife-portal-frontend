import * as forms from "codeforlife/components/form"
import * as page from "codeforlife/components/page"
import { Button, Stack, Typography } from "@mui/material"
import { type FC } from "react"
import type { SessionMetadata } from "codeforlife/hooks"
import { useNavigate } from "react-router-dom"

import { useRetrieveUserQuery, useUpdateUserMutation } from "../../api/user"
import { classIdSchema } from "../../app/schemas"
import { handleResultState } from "codeforlife/utils/api.tsx"

const _StudentJoinClass: FC<SessionMetadata> = ({ user_id }) => {
  const navigate = useNavigate()
  const [updateUser] = useUpdateUserMutation()

  return handleResultState(useRetrieveUserQuery(user_id), user => {
    return (
      <page.Section>
        <Typography align="center" variant="h4">
          Join a school or club
        </Typography>
        {user.requesting_to_join_class ? (
          <>
            <Typography variant="h5">Request pending</Typography>
            {/* TODO: Fetch actual values from backend. */}
            <Typography>
              Your request to join class {user.requesting_to_join_class.id} in
              the school or club Code for Life School is still pending.
            </Typography>
            <Typography>
              The teacher for that class must review and approve the request to
              complete the process.
            </Typography>
            <Typography>
              If successful, the teacher will then contact you with your new
              login details.
            </Typography>
            <Typography>
              <strong>Warning:</strong> once the teacher accepts you to their
              class, that teacher and the school or club will manage your
              account.
            </Typography>
            <Typography>
              You may cancel your request now, before the teacher makes their
              decision.
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate(-1)
                }}
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  void updateUser({
                    id: user_id,
                    requesting_to_join_class: "",
                  })
                    .unwrap()
                    .then(() => {
                      navigate(".", {
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
        ) : (
          <>
            <Typography variant="h5">
              Request to join a school or club
            </Typography>
            <Typography>
              If you want to link your Code For Life account with a school or
              club, ask a teacher to enable external requests and provide you
              with the Class Access Code for the class you want to join. Simply
              add the Class Access Code to the form below and submit.
            </Typography>
            <Typography>
              <strong>Warning:</strong> once the teacher accepts you to their
              class, that teacher and the school or club will manage your
              account.
            </Typography>
            <Typography>
              If successful, the teacher will contact you with your new login
              details.
            </Typography>

            <forms.Form
              initialValues={user}
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
                placeholder="Class code"
                name="requesting_to_join_class"
                sx={{ width: { xs: "100%", sm: "50%" } }}
                schema={classIdSchema}
                required
              />

              <Stack direction="row" spacing={2} paddingY={3}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate(-1)
                  }}
                >
                  Cancel
                </Button>
                <forms.SubmitButton>Request</forms.SubmitButton>
              </Stack>
            </forms.Form>
          </>
        )}
      </page.Section>
    )
  })
}

export interface StudentJoinClassProps {}

const StudentJoinClass: FC<StudentJoinClassProps> = () => (
  <page.Page session={{ userType: "indy" }}>{_StudentJoinClass}</page.Page>
)

export default StudentJoinClass
