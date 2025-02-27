import * as forms from "codeforlife/components/form"
import { Stack, Typography } from "@mui/material"
import { useInputRef, useNavigate } from "codeforlife/hooks"
import { type FC } from "react"

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
  const nameFieldRef = useInputRef()
  const countryFieldRef = useInputRef()
  const ukCountyFieldRef = useInputRef()

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Update details of your school or club
      </Typography>
      <forms.Form
        initialValues={school}
        fieldRefs={[
          { name: "name", inputRef: nameFieldRef },
          { name: "country", inputRef: countryFieldRef },
          { name: "uk_county", inputRef: ukCountyFieldRef },
        ]}
        useMutation={useUpdateSchoolMutation}
        submitOptions={{
          onlyDirtyValues: true,
          include: ["id"],
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
        }}
      >
        {form => (
          <>
            <Stack direction={{ xs: "column", md: "row" }} gap={3}>
              <SchoolNameField inputRef={nameFieldRef} />
              <forms.CountryField
                textFieldProps={{ inputRef: countryFieldRef }}
              />
              {form.values.country === "GB" && (
                <forms.UkCountyField
                  textFieldProps={{ inputRef: ukCountyFieldRef }}
                />
              )}
            </Stack>
            <forms.SubmitButton>Update details</forms.SubmitButton>
          </>
        )}
      </forms.Form>
    </>
  )
}

export default UpdateSchoolForm
