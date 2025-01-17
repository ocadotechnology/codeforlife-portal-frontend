import { Check as CheckIcon } from "@mui/icons-material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { Stack } from "@mui/material"

import {
  type StudentCredentialsTableProps as Props,
  StudentCredentialsTable as Table,
} from "../../components"
import { paths } from "../../routes"

export interface StudentCredentialsTableProps extends Props {}

const StudentCredentialsTable: FC<StudentCredentialsTableProps> = props => {
  return (
    <>
      <Table {...props} />
      <Stack alignItems="end">
        <LinkButton
          to={paths.teacher.dashboard.tab.school._}
          endIcon={<CheckIcon />}
          variant="outlined"
        >
          Complete setup
        </LinkButton>
      </Stack>
    </>
  )
}

export default StudentCredentialsTable
