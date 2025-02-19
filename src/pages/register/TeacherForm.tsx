import * as form from "codeforlife/components/form"
import { useInputRef, useNavigate } from "codeforlife/hooks"
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { Stack } from "@mui/material"

import { LastNameField, NewPasswordField } from "../../components/form"
import BaseForm from "./BaseForm"
import { paths } from "../../routes"
import { useCreateTeacherMutation } from "../../api/teacher"

export interface TeacherFormProps {}

const TeacherForm: FC<TeacherFormProps> = () => {
  const navigate = useNavigate()
  const firstNameFieldRef = useInputRef()
  const lastNameFieldRef = useInputRef()
  const passwordFieldRef = useInputRef()
  const passwordRepeatFieldRef = useInputRef()
  const emailFieldRef = useInputRef()
  const addToNewsletterFieldRef = useInputRef()
  const meetsCriteriaFieldRef = useInputRef()

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
        order={[
          { name: "user.first_name", inputRef: firstNameFieldRef },
          { name: "user.last_name", inputRef: lastNameFieldRef },
          { name: "user.email", inputRef: emailFieldRef },
          { name: "user.meets_criteria", inputRef: meetsCriteriaFieldRef },
          { name: "user.add_to_newsletter", inputRef: addToNewsletterFieldRef },
          { name: "user.password", inputRef: passwordFieldRef },
          { name: "user.password_repeat", inputRef: passwordRepeatFieldRef },
        ]}
        useMutation={useCreateTeacherMutation}
        submitOptions={{
          exclude: ["user.password_repeat", "user.meets_criteria"],
          then: () => {
            navigate(paths.register.emailVerification.userType.teacher._)
          },
        }}
      >
        <form.FirstNameField
          name="user.first_name"
          required
          inputRef={firstNameFieldRef}
        />
        <LastNameField name="user.last_name" inputRef={lastNameFieldRef} />
        <form.EmailField name="user.email" required inputRef={emailFieldRef} />
        <form.CheckboxField
          required
          name="user.meets_criteria"
          inputRef={meetsCriteriaFieldRef}
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
          inputRef={addToNewsletterFieldRef}
          formControlLabelProps={{
            label:
              "Sign up to receive updates about Code for Life games and teaching resources.",
          }}
        />
        <NewPasswordField
          name="user.password"
          inputRef={passwordFieldRef}
          userType="teacher"
          repeatFieldProps={{
            inputRef: passwordRepeatFieldRef,
            label: "Repeat password",
            placeholder: "Enter your password again",
          }}
        />
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
