import * as forms from "codeforlife/components/form"
import * as tables from "codeforlife/components/table"
import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { LinkButton } from "codeforlife/components/router"
import { type StudentUser } from "codeforlife/api"
import { submitForm } from "codeforlife/utils/form"
import { useNavigate } from "codeforlife/hooks"

import {
  type TransferStudentsArg,
  useTransferStudentsMutation,
} from "../../../../api/student"
import { type ListUsersResult } from "../../../../api/user"
import { type RetrieveClassResult } from "../../../../api/klass"

export interface TransferStudentsFormProps {
  studentUsers: Array<StudentUser<ListUsersResult["data"][number]>>
  klass: RetrieveClassResult
  classPath: string
  newClass: RetrieveClassResult
}

const TransferStudentsForm: FC<TransferStudentsFormProps> = ({
  studentUsers,
  klass,
  classPath,
  newClass,
}) => {
  const [transferStudents] = useTransferStudentsMutation()
  const navigate = useNavigate()

  return (
    <>
      <Typography variant="h5">Students to transfer</Typography>
      <Typography>
        Please confirm the names of the following students being moved to class{" "}
        {newClass.name} ({newClass.id}) from class {klass.name} ({klass.id}).
        Their names will be used in their new login details, so please ensure it
        is different from any other existing students in the class.
      </Typography>
      <forms.Form
        initialValues={studentUsers.reduce(
          (arg, studentUser) => ({
            ...arg,
            [studentUser.student.id]: {
              klass: newClass.id,
              user: { first_name: studentUser.first_name },
            },
          }),
          {} as TransferStudentsArg,
        )}
        onSubmit={submitForm(transferStudents, {
          then: () => {
            navigate(classPath, {
              state: {
                notifications: [
                  {
                    props: {
                      children:
                        "The students have been transferred successfully",
                    },
                  },
                ],
              },
            })
          },
          catch: () => {
            navigate(classPath, {
              state: {
                notifications: [
                  {
                    props: {
                      error: true,
                      children: "Failed to transfer students",
                    },
                  },
                ],
              },
            })
          },
        })}
      >
        <tables.Table headers={["Existing name", "New student name"]}>
          {studentUsers.map(studentUser => (
            <tables.BodyRow key={`user-${studentUser.id}`}>
              <tables.Cell>{studentUser.first_name}</tables.Cell>
              <tables.Cell>
                <forms.FirstNameField
                  required
                  name={`${studentUser.student.id}.user.first_name`}
                  label={null}
                  variant="outlined"
                  placeholder={`Enter a name for ${studentUser.first_name}`}
                />
              </tables.Cell>
            </tables.BodyRow>
          ))}
        </tables.Table>
        <Stack direction="row" gap={2} justifyContent="end">
          <LinkButton to={classPath} variant="outlined">
            Cancel
          </LinkButton>
          <forms.SubmitButton>Save</forms.SubmitButton>
        </Stack>
      </forms.Form>
    </>
  )
}

export default TransferStudentsForm
