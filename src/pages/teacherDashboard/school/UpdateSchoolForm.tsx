import * as form from "codeforlife/components/form"
import { type FC } from "react"

export interface UpdateSchoolFormProps {
  schoolData: TeacherDashboardProps["school"]
}

const UpdateSchoolForm: FC<UpdateSchoolFormProps> = ({ schoolData }) => {
  const navigate = useNavigate()
  const schoolName = schoolData.name
  const schoolPostcode = schoolData.postcode
  const schoolCountry = schoolData.country
  const [updateSchool] = useOldUpdateSchoolMutation()

  return (
    <CflHorizontalForm
      header="Update details of your school or club"
      subheader="Update your school or club's name and/or postcode"
      initialValues={{
        name: schoolName,
        postcode: schoolPostcode,
        country: schoolCountry,
      }}
      validationSchema={SCHOOL_DETAILS_UPDATE_SCHEMA}
      onSubmit={values => {
        updateSchool(values)
          .unwrap()
          .then(() => {
            navigate(".", {
              state: {
                message:
                  "You have updated the details for your school or club successfully.",
              },
            })
          })
          .catch(err => {
            console.error("UpdateSchool error: ", err)
          })
      }}
      submitButton={<form.SubmitButton>Update details</form.SubmitButton>}
    >
      <SchoolNameField />
      <SchoolPostcodeField />
      <SchoolCountryField />
    </CflHorizontalForm>
  )
}

export default UpdateSchoolForm
