import { type FC, type RefObject } from "react"
import { ApiAutocompleteField } from "codeforlife/components/form"

import { type ListUsersArg, useLazyListUsersQuery } from "../../api/user"

export interface TeacherAutocompleteFieldProps {
  required?: boolean
  name?: string
  _id?: ListUsersArg["_id"]
  inputRef?: RefObject<HTMLInputElement>
}

const TeacherAutocompleteField: FC<TeacherAutocompleteFieldProps> = ({
  required = false,
  name = "teacher",
  _id,
  inputRef,
}) => (
  <ApiAutocompleteField
    useLazyListQuery={useLazyListUsersQuery}
    searchKey="name"
    filterOptions={{ type: "teacher", _id }}
    getOptionLabel={({ first_name, last_name }) => `${first_name} ${last_name}`}
    getOptionKey={({ teacher }) => teacher!.id}
    textFieldProps={{ required, name, inputRef }}
  />
)

export default TeacherAutocompleteField
