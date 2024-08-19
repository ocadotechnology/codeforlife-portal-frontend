import * as forms from "codeforlife/components/form"
import { FormHelperText, Stack } from "@mui/material"
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import dayjs from "dayjs"
import { submitForm } from "codeforlife/utils/form"
import { useNavigate } from "react-router-dom"

import { LastNameField, NewPasswordField } from "../../components/form"
import BaseForm from "./BaseForm"
import { paths } from "../../routes"
import { useCreateIndependentUserMutation } from "../../api/user"

export interface IndyFormProps {}

const IndyForm: FC<IndyFormProps> = () => {
  const navigate = useNavigate()
  const [createIndependentUser] = useCreateIndependentUserMutation()

  const EmailApplicableAge = 13
  const ReceiveUpdateAge = 18

  return (
    <BaseForm
      header="Independent learner"
      subheader="Register below if you are not part of a school or club and wish to set up a home learning account."
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
        onSubmit={submitForm(createIndependentUser, {
          exclude: ["password_repeat", "meets_criteria"],
          then: () => {
            navigate(paths.register.emailVerification.userType.indy._)
          },
        })}
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
                name="date_of_birth"
                maxDate={dayjs()}
                required
              />
              {yearsOfAge !== undefined && (
                <>
                  <forms.FirstNameField required />
                  <LastNameField />
                  <forms.EmailField
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
                      name="add_to_newsletter"
                      formControlLabelProps={{
                        label:
                          "Sign up to receive updates about Code for Life games and teaching resources.",
                      }}
                    />
                  )}
                  <NewPasswordField userType="independent" />
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
