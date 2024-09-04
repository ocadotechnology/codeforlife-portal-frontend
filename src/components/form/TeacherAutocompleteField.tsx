import { ApiAutocompleteField } from "codeforlife/components/form"
import { type FC } from "react"

import { type ListUsersArg, useLazyListUsersQuery } from "../../api/user"

export interface TeacherAutocompleteFieldProps {
  required?: boolean
  name?: string
  _id?: ListUsersArg["_id"]
}

const TeacherAutocompleteField: FC<TeacherAutocompleteFieldProps> = ({
  required = false,
  name = "teacher",
  _id,
}) => (
  <ApiAutocompleteField
    useLazyListQuery={useLazyListUsersQuery}
    searchKey="name"
    filterOptions={{ type: "teacher", _id }}
    getOptionLabel={({ first_name, last_name }) => `${first_name} ${last_name}`}
    getOptionKey={({ teacher }) => teacher!.id}
    textFieldProps={{ required, name }}
  />
)

export default TeacherAutocompleteField
