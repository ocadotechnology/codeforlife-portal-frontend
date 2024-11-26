import * as forms from "codeforlife/components/form"
import {
  Button,
  Dialog,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material"
import { type FC, useState } from "react"
import { DeleteOutline as DeleteOutlineIcon } from "@mui/icons-material"
import { logout } from "codeforlife/utils/auth"
import { useNavigate } from "codeforlife/hooks"

import {
  type DestroyIndependentUserArg,
  type RetrieveUserResult,
  useDestroyIndependentUserMutation,
  useLazyValidatePasswordQuery,
} from "../../api/user.ts"
import { paths } from "../../routes"

const ConfirmDialog: FC<{
  open: boolean
  onClose: () => void
  destroyIndyUserArg?: DestroyIndependentUserArg
}> = ({ open, onClose, destroyIndyUserArg }) => {
  const [destroyIndyUser] = useDestroyIndependentUserMutation()
  const navigate = useNavigate()

  if (!destroyIndyUserArg) return <></>

  return (
    <Dialog open={open}>
      <Typography variant="h5" textAlign="center">
        You are about to delete your account
      </Typography>
      <Typography>
        This action is not reversible. Are you sure you wish to proceed?
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="alert"
          endIcon={<DeleteOutlineIcon />}
          onClick={() => {
            void destroyIndyUser(destroyIndyUserArg)
              .unwrap()
              .then(() => {
                logout()
                navigate(paths._, {
                  state: {
                    notifications: [
                      {
                        props: {
                          children: "Your account was successfully deleted.",
                        },
                      },
                    ],
                  },
                })
              })
          }}
        >
          Delete
        </Button>
      </Stack>
    </Dialog>
  )
}

export interface DeleteAccountFormProps {
  user: RetrieveUserResult
}

const DeleteAccountForm: FC<DeleteAccountFormProps> = ({ user }) => {
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean
    destroyIndyUserArg?: DestroyIndependentUserArg
  }>({ open: false })
  const [validatePassword] = useLazyValidatePasswordQuery()

  return (
    <>
      <ConfirmDialog
        open={confirmDialog.open}
        onClose={() => {
          setConfirmDialog({ open: false })
        }}
        destroyIndyUserArg={confirmDialog.destroyIndyUserArg}
      />
      <Typography variant="h5">Delete account</Typography>
      <Typography>
        If you no longer wish to have a Code for Life account, you can delete it
        by confirming below. You will receive an email to confirm this decision.
      </Typography>
      <Typography fontWeight="bold">This can&apos;t be reversed.</Typography>
      <forms.Form
        initialValues={{
          id: user.id,
          password: "",
          remove_from_newsletter: false,
        }}
        onSubmit={values => {
          void validatePassword({ id: values.id, password: values.password })
            .unwrap()
            .then(() => {
              setConfirmDialog({ open: true, destroyIndyUserArg: values })
            })
        }}
      >
        <Grid container columnSpacing={4}>
          <Grid xs={12} sm={6}>
            <forms.PasswordField
              required
              label="Current password"
              placeholder="Enter your current password"
            />
          </Grid>
          <Grid xs={12} sm={6}>
            {/* TODO: only display this checkbox if the user has been added to the newsletter. */}
            <forms.CheckboxField
              name="remove_from_newsletter"
              formControlLabelProps={{
                label:
                  "Please remove me from the newsletter and marketing emails too.",
              }}
            />
          </Grid>
        </Grid>
        <forms.SubmitButton
          className="alert"
          endIcon={<DeleteOutlineIcon />}
          sx={theme => ({ marginTop: theme.spacing(3) })}
        >
          Delete account
        </forms.SubmitButton>
      </forms.Form>
    </>
  )
}

export default DeleteAccountForm
