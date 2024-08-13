import * as form from "codeforlife/components/form"
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { Stack } from "@mui/material"
import { submitForm } from "codeforlife/utils/form"
import { useNavigate } from "codeforlife/hooks"

import { LastNameField, NewPasswordField } from "../../components/form"
import BaseForm from "./BaseForm"
import { paths } from "../../router"
import { useCreateTeacherMutation } from "../../api/teacher"

export interface TeacherFormProps {}

const TeacherForm: FC<TeacherFormProps> = () => {
  const navigate = useNavigate()
  const [createTeacher] = useCreateTeacherMutation()

  return (
    <BaseForm
      header="Teacher/Tutor"
      subheader="Register below to create your school or club."
      description="You will have access to teaching resources, progress tracking and lesson plans for both Rapid Router and Kurono."
      userType="teacher"
    >
      <form.Form
        initialValues={{
          user: {
            first_name: "",
            last_name: "",
            password: "",
            password_repeat: "",
            email: "",
            add_to_newsletter: false,
            meets_criteria: false,
          },
        }}
        onSubmit={submitForm(createTeacher, {
          exclude: ["user.password_repeat"],
          then: () => {
            navigate(paths.register.emailVerification.userType.teacher._)
          },
        })}
      >
        <form.FirstNameField name="user.first_name" required />
        <LastNameField name="user.last_name" />
        <form.EmailField name="user.email" required />
        <form.CheckboxField
          required
          name="user.meets_criteria"
          formControlLabelProps={{
            label: (
              <>
                I am over 18 years old have read and understood the&nbsp;
                <Link to={paths.termsOfUse.tab.termsOfUse._} target="_blank">
                  Terms of use
                </Link>
                &nbsp;and the&nbsp;
                <Link
                  to={paths.privacyNotice.tab.privacyNotice._}
                  target="_blank"
                >
                  Privacy notice
                </Link>
                .
              </>
            ),
          }}
        />
        <form.CheckboxField
          name="user.add_to_newsletter"
          formControlLabelProps={{
            label:
              "Sign up to receive updates about Code for Life games and teaching resources.",
          }}
        />
        <NewPasswordField name="user.password" userType="teacher" />
        <Stack alignItems="end">
          <form.SubmitButton endIcon={<ChevronRightIcon />}>
            Register
          </form.SubmitButton>
        </Stack>
      </form.Form>
    </BaseForm>
  )
}

export default TeacherForm
