import * as forms from "codeforlife/components/form"
import { FormHelperText, Stack, useMediaQuery, useTheme } from "@mui/material"
import { type FC } from "react"
import { useNavigate } from "react-router-dom"

import { useRegisterToNewsletterMutation } from "../../api/user"

export interface RegisterToNewsletterFormProps {}

const RegisterToNewsletterForm: FC<RegisterToNewsletterFormProps> = () => {
  const theme = useTheme()
  const onlyXS = useMediaQuery(theme.breakpoints.only("xs"))
  const navigate = useNavigate()

  return (
    <Stack id="register-to-newsletter-form">
      <FormHelperText>
        Sign up to receive updates about Code for Life games and teaching
        resources.
      </FormHelperText>
      <forms.Form
        initialValues={{
          email: "",
          over18: false,
        }}
        useMutation={useRegisterToNewsletterMutation}
        submitOptions={{
          exclude: ["over18"],
          then: () => {
            navigate(".", {
              state: {
                notifications: [
                  {
                    props: {
                      children: "Thank you for signing up! 🎉",
                    },
                  },
                ],
              },
            })
          },
          catch: () => {
            navigate(".", {
              state: {
                notifications: [
                  {
                    props: {
                      children: "Failed to subscribe you to our newsletter.",
                      error: true,
                    },
                  },
                ],
              },
            })
          },
        }}
      >
        <Stack spacing={2}>
          <forms.EmailField
            id="newsletter-email" // Avoid duplicate IDs on pages which have forms with an email field
            FormHelperTextProps={{ style: { color: "white" } }}
            required
          />
          <Stack
            spacing="auto"
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
          >
            {/*TODO: Make the helper text white*/}
            <forms.CheckboxField
              required
              name="over18"
              formControlLabelProps={{
                label: "Please confirm that you are over 18.",
              }}
            />
            <forms.SubmitButton sx={{ width: onlyXS ? "100%" : undefined }}>
              Sign up
            </forms.SubmitButton>
          </Stack>
        </Stack>
      </forms.Form>
    </Stack>
  )
}

export default RegisterToNewsletterForm
