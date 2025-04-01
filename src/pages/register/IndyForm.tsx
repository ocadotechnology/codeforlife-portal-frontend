import * as forms from "codeforlife/components/form"
import { FormHelperText, Stack } from "@mui/material"
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import dayjs from "dayjs"
import { useInputRef } from "codeforlife/hooks"
import { useNavigate } from "react-router-dom"

import { LastNameField, NewPasswordField } from "../../components/form"
import BaseForm from "./BaseForm"
import { paths } from "../../routes"
import { useCreateIndependentUserMutation } from "../../api/user"

export interface IndyFormProps {}

const IndyForm: FC<IndyFormProps> = () => {
  const navigate = useNavigate()
  const dateOfBirthFieldRef = useInputRef()
  const firstNameFieldRef = useInputRef()
  const lastNameFieldRef = useInputRef()
  const emailFieldRef = useInputRef()
  const meetsCriteriaFieldRef = useInputRef()
  const addToNewsletterFieldRef = useInputRef()
  const passwordFieldRef = useInputRef()
  const passwordRepeatFieldRef = useInputRef()

  const EmailApplicableAge = 13
  const ReceiveUpdateAge = 18

  return (
    <BaseForm
      header="Independent learner"
      subheader="Register below if you are not part of a school or club and wish to set up a free home learning account."
      description="You will have access to learning resources for Rapid Router."
      userType="independent"
    >
      <forms.Form
        initialValues={{
          date_of_birth: "",
          first_name: "",
          last_name: "",
          email: "",
          meets_criteria: false,
          add_to_newsletter: false,
          password: "",
          password_repeat: "",
        }}
        fieldRefs={[
          { name: "date_of_birth", inputRef: dateOfBirthFieldRef },
          { name: "first_name", inputRef: firstNameFieldRef },
          { name: "last_name", inputRef: lastNameFieldRef },
          { name: "email", inputRef: emailFieldRef },
          { name: "meets_criteria", inputRef: meetsCriteriaFieldRef },
          { name: "add_to_newsletter", inputRef: addToNewsletterFieldRef },
          { name: "password", inputRef: passwordFieldRef },
          { name: "password_repeat", inputRef: passwordRepeatFieldRef },
        ]}
        useMutation={useCreateIndependentUserMutation}
        submitOptions={{
          exclude: ["password_repeat", "meets_criteria"],
          then: () => {
            navigate(paths.register.emailVerification.userType.indy._)
          },
        }}
      >
        {form => {
          const yearsOfAge = form.values.date_of_birth
            ? Math.floor(
                (new Date().getTime() -
                  new Date(form.values.date_of_birth).getTime()) /
                  (1000 * 60 * 60 * 24 * 365.25),
              )
            : undefined

          return (
            <>
              <FormHelperText sx={{ fontWeight: "bold" }}>
                Please enter your date of birth (we do not store this
                information).
              </FormHelperText>
              <forms.DatePickerField
                inputRef={dateOfBirthFieldRef}
                name="date_of_birth"
                maxDate={dayjs()}
                required
              />
              {yearsOfAge !== undefined && (
                <>
                  <forms.FirstNameField required inputRef={firstNameFieldRef} />
                  <LastNameField inputRef={lastNameFieldRef} />
                  <forms.EmailField
                    inputRef={emailFieldRef}
                    required
                    label={
                      yearsOfAge >= EmailApplicableAge
                        ? "Email address"
                        : "Parent's email address"
                    }
                    placeholder={
                      yearsOfAge >= EmailApplicableAge
                        ? "Enter your email address"
                        : "Enter your parent's email address"
                    }
                  />
                  {yearsOfAge < EmailApplicableAge && (
                    <FormHelperText style={{ fontWeight: "bold" }}>
                      We will send your parent/guardian an email to ask them to
                      activate the account for you. Once they&apos;ve done this
                      you&apos;ll be able to log in using your name and
                      password.
                    </FormHelperText>
                  )}
                  {yearsOfAge >= EmailApplicableAge && (
                    <forms.CheckboxField
                      required
                      inputRef={meetsCriteriaFieldRef}
                      name="meets_criteria"
                      formControlLabelProps={{
                        label: (
                          <>
                            I have read and understood the &nbsp;
                            <Link
                              to={paths.termsOfUse.tab.termsOfUse._}
                              target="_blank"
                            >
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
                  )}
                  {yearsOfAge >= ReceiveUpdateAge && (
                    <forms.CheckboxField
                      inputRef={addToNewsletterFieldRef}
                      name="add_to_newsletter"
                      formControlLabelProps={{
                        label:
                          "Sign up to receive updates about Code for Life games and teaching resources.",
                      }}
                    />
                  )}
                  <NewPasswordField
                    userType="independent"
                    inputRef={passwordFieldRef}
                    repeatFieldProps={{ inputRef: passwordRepeatFieldRef }}
                  />
                  <Stack alignItems="end">
                    <forms.SubmitButton endIcon={<ChevronRightIcon />}>
                      Register
                    </forms.SubmitButton>
                  </Stack>
                </>
              )}
            </>
          )
        }}
      </forms.Form>
    </BaseForm>
  )
}

export default IndyForm
