import {
  CheckboxField,
  type CheckboxFieldProps,
} from "codeforlife/components/form"
import { type FC } from "react"

export type ReadClassmatesDataFieldProps = Omit<
  CheckboxFieldProps,
  "name" | "formControlLabelProps"
> &
  Partial<Pick<CheckboxFieldProps, "name" | "formControlLabelProps">>

const ReadClassmatesDataField: FC<ReadClassmatesDataFieldProps> = ({
  name = "read_classmates_data",
  formControlLabelProps,
  ...otherCheckboxFieldProps
}) => {
  const {
    label = "Allow students to see their classmates' progress?",
    ...otherFormControlLabelProps
  } = formControlLabelProps || {}

  return (
    <CheckboxField
      name={name}
      formControlLabelProps={{ label, ...otherFormControlLabelProps }}
      {...otherCheckboxFieldProps}
    />
  )
}

export default ReadClassmatesDataField
