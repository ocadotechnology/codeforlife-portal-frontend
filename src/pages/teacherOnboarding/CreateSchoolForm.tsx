import * as forms from "codeforlife/components/form"
import { type FC } from "react"
import { type SubmitFormOptions } from "codeforlife/utils/form"
import { Typography } from "@mui/material"
import { useInputRef } from "codeforlife/hooks"

import {
  type CreateSchoolArg,
  type CreateSchoolResult,
  useCreateSchoolMutation,
} from "../../api/school"
import { SchoolNameField } from "../../components/form"

export interface CreateSchoolFormProps {
  submitOptions: Omit<
    SubmitFormOptions<CreateSchoolArg, CreateSchoolArg, CreateSchoolResult>,
    "clean"
  >
}

const CreateSchoolForm: FC<CreateSchoolFormProps> = ({ submitOptions }) => {
  const nameFieldRef = useInputRef()
  const countryFieldRef = useInputRef()
  const ukCountyFieldRef = useInputRef()

  return (
    <>
      <Typography>
        As the first person from your school or club to register for Code for
        Life, by default, you become the organisation&apos;s administrator.
      </Typography>
      <forms.Form
        initialValues={
          {
            name: "",
            country: undefined,
            uk_county: undefined,
          } as CreateSchoolArg
        }
        order={[
          { name: "name", inputRef: nameFieldRef },
          { name: "country", inputRef: countryFieldRef },
          { name: "uk_county", inputRef: ukCountyFieldRef },
        ]}
        useMutation={useCreateSchoolMutation}
        submitOptions={{
          ...submitOptions,
          clean: ({ uk_county, ...required }) =>
            required.country === "GB" && uk_county
              ? { uk_county, ...required }
              : required,
        }}
      >
        {form => (
          <>
            <SchoolNameField inputRef={nameFieldRef} />
            <forms.CountryField
              textFieldProps={{ inputRef: countryFieldRef }}
            />
            {form.values.country === "GB" && (
              <forms.UkCountyField
                textFieldProps={{ inputRef: ukCountyFieldRef }}
              />
            )}
            <forms.SubmitButton>Create school or club</forms.SubmitButton>
          </>
        )}
      </forms.Form>
    </>
  )
}

export default CreateSchoolForm
