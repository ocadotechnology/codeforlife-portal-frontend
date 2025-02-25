import { type FC, type RefObject } from "react"
import { ApiAutocompleteField } from "codeforlife/components/form"

import { type ListClassesArg, useLazyListClassesQuery } from "../../api/klass"

export interface ClassAutocompleteFieldProps {
  required?: boolean
  name?: string
  _id?: ListClassesArg["_id"]
  inputRef?: RefObject<HTMLInputElement>
}

const ClassAutocompleteField: FC<ClassAutocompleteFieldProps> = ({
  required = false,
  name = "klass",
  _id,
  inputRef,
}) => (
  <ApiAutocompleteField
    useLazyListQuery={useLazyListClassesQuery}
    searchKey="id_or_name"
    filterOptions={{ _id }}
    getOptionLabel={({ name, id, teacher }) =>
      `${name} (${id}), ${teacher.user.first_name} ${teacher.user.last_name}`
    }
    textFieldProps={{ required, name, inputRef }}
  />
)

export default ClassAutocompleteField
