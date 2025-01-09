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
  submitOptions: Omit<
    SubmitFormOptions<CreateSchoolArg, CreateSchoolArg, CreateSchoolResult>,
    "clean"
  >
}

const CreateSchoolForm: FC<CreateSchoolFormProps> = ({ submitOptions }) => (
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
