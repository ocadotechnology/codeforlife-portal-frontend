import * as forms from "codeforlife/components/form"
import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { submitForm } from "codeforlife/utils/form"
import { useNavigate } from "codeforlife/hooks"

import {
  type RetrieveSchoolResult,
  useUpdateSchoolMutation,
} from "../../../api/school"
import { SchoolNameField } from "../../../components/form"

export interface UpdateSchoolFormProps {
  school: RetrieveSchoolResult
}

const UpdateSchoolForm: FC<UpdateSchoolFormProps> = ({ school }) => {
  const navigate = useNavigate()
  const [updateSchool] = useUpdateSchoolMutation()

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Update details of your school or club
      </Typography>
      <forms.Form
        initialValues={school}
        onSubmit={submitForm(updateSchool, {
          then: () => {
            navigate(".", {
              state: {
                notifications: [
                  {
                    props: {
                      children:
                        "You have updated the details for your school or club successfully.",
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
                      children:
                        "Failed to updated the details for your school or club.",
                      error: true,
                    },
                  },
                ],
              },
            })
          },
        })}
      >
        {form => (
          <>
            <Stack direction={{ xs: "column", md: "row" }} gap={3}>
              <SchoolNameField />
              <forms.CountryField />
              {form.values.country === "GB" && <forms.UkCountyField />}
            </Stack>
            <forms.SubmitButton>Update details</forms.SubmitButton>
          </>
        )}
      </forms.Form>
    </>
  )
}

export default UpdateSchoolForm
