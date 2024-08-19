import * as form from "codeforlife/components/form"
import { Button, Dialog, Stack, Typography } from "@mui/material"
import { type FC, useState } from "react"
import { Add as AddIcon } from "@mui/icons-material"
import { submitForm } from "codeforlife/utils/form"
import { useNavigate } from "codeforlife/hooks"

import { LastNameField } from "../../../components/form"
import { useCreateSchoolTeacherInvitationMutation } from "../../../api/schoolTeacherInvitation"

const InviteAdminConfirmDialog: FC<{
  open: boolean
  onClose: () => void
  onConfirm: () => void
}> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"}>
      <Typography variant="h5" textAlign="center">
        Assigning admin permissions
      </Typography>
      <Typography>
        You are about to add admin permissions to another teacher&apos;s
        account. Teachers with admin permissions will have the same permissions
        as you.
      </Typography>
      <Typography fontWeight="bold">Do you wish to proceed?</Typography>
      <Typography fontWeight="bold" color="error" marginTop={1}>
        Accepting means you understand class data will be shared.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} marginTop={5}>
        <Button onClick={onClose}>Cancel</Button>
        <Button className="alert" endIcon={<AddIcon />} onClick={onConfirm}>
          Add as admin
        </Button>
      </Stack>
    </Dialog>
  )
}

export interface InviteTeacherFormProps {}

const InviteTeacherForm: FC<InviteTeacherFormProps> = () => {
  const navigate = useNavigate()
  const [createSchoolTeacherInvitation] =
    useCreateSchoolTeacherInvitationMutation()

  const [dialog, setDialog] = useState<{
    open: boolean
    onConfirm?: () => void
  }>({ open: false })

  return (
    <>
      <Typography variant="h5" marginBottom={1}>
        Invite a teacher to your school
      </Typography>
      <form.Form
        initialValues={{
          invited_teacher_email: "",
          invited_teacher_first_name: "",
          invited_teacher_last_name: "",
          invited_teacher_is_admin: false,
        }}
        onSubmit={(values, helpers) => {
          function _submitForm() {
            function showNotification(error: boolean) {
              navigate(".", {
                state: {
                  notifications: [
                    {
                      props: {
                        error,
                        children: error
                          ? `Failed to invite ${values.invited_teacher_first_name} ${values.invited_teacher_last_name} to your school.`
                          : `You have invited ${values.invited_teacher_first_name} ${values.invited_teacher_last_name} to your school.`,
                      },
                    },
                  ],
                },
              })
            }

            void submitForm(createSchoolTeacherInvitation, {
              then: () => {
                showNotification(false)
              },
              catch: error => {
                console.error(error)
                showNotification(true)
              },
            })(values, helpers)
          }

          if (values.invited_teacher_is_admin) {
            setDialog({
              open: true,
              onConfirm: () => {
                _submitForm()
                setDialog({ open: false })
              },
            })
          } else _submitForm()
        }}
      >
        <Stack>
          <Stack direction={{ sm: "row" }} spacing={3}>
            <form.FirstNameField
              required
              label="First name of teacher"
              placeholder="Enter first name of teacher"
              name="invited_teacher_first_name"
            />
            <LastNameField
              required
              label="Last name of teacher"
              placeholder="Enter last name of teacher"
              name="invited_teacher_last_name"
            />
            <form.EmailField
              required
              label="Email address of teacher"
              placeholder="Enter email address of teacher"
              name="invited_teacher_email"
            />
          </Stack>
          <form.CheckboxField
            name="invited_teacher_is_admin"
            formControlLabelProps={{
              label: "Make an administrator of the school",
            }}
          />
          <form.SubmitButton>Invite teacher</form.SubmitButton>
        </Stack>
      </form.Form>
      {dialog.onConfirm !== undefined && (
        <InviteAdminConfirmDialog
          open={dialog.open}
          onClose={() => {
            setDialog({ open: false })
          }}
          onConfirm={dialog.onConfirm}
        />
      )}
    </>
  )
}

export default InviteTeacherForm
