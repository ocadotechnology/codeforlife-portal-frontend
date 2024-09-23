import { ApiAutocompleteField } from "codeforlife/components/form"
import { type FC } from "react"

import { type ListClassesArg, useLazyListClassesQuery } from "../../api/klass"

export interface ClassAutocompleteFieldProps {
  required?: boolean
  name?: string
  _id?: ListClassesArg["_id"]
}

const ClassAutocompleteField: FC<ClassAutocompleteFieldProps> = ({
  required = false,
  name = "klass",
  _id,
}) => (
  <ApiAutocompleteField
    useLazyListQuery={useLazyListClassesQuery}
    searchKey="name"
    filterOptions={{ _id }}
    getOptionLabel={({ name, id, teacher }) =>
      `${name} (${id}), ${teacher.user.first_name} ${teacher.user.last_name}`
    }
    textFieldProps={{ required, name }}
  />
)

export default ClassAutocompleteField
