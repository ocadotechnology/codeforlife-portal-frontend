import * as forms from "codeforlife/components/form"
import { type FC } from "react"
import { type SubmitFormOptions } from "codeforlife/utils/form"
import { Typography } from "@mui/material"

import {
  type CreateSchoolArg,
  type CreateSchoolResult,
  useCreateSchoolMutation,
} from "../../api/school"
import { SchoolNameField } from "../../components/form"

export interface CreateSchoolFormProps {
  submitOptions: SubmitFormOptions<
    CreateSchoolArg,
    CreateSchoolArg,
    CreateSchoolResult
  >
}

const CreateSchoolForm: FC<CreateSchoolFormProps> = ({ submitOptions }) => (
  <>
    <Typography>
      As the first person from your school or club to register for Code for
      Life, by default, you become the organisation&apos;s administrator.
    </Typography>
    <forms.Form
      initialValues={{
        name: "",
        country: undefined,
        uk_county: undefined,
      }}
      useMutation={useCreateSchoolMutation}
      submitOptions={submitOptions}
    >
      {form => (
        <>
          <SchoolNameField />
          <forms.CountryField />
          {form.values.country === "GB" && <forms.UkCountyField />}
          <forms.SubmitButton>Create school or club</forms.SubmitButton>
        </>
      )}
    </forms.Form>
  </>
)

export default CreateSchoolForm
