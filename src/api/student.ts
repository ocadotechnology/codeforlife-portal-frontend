import {
  type Arg,
  type BulkCreateArg,
  type BulkCreateResult,
  type BulkDestroyArg,
  type BulkDestroyResult,
  type BulkUpdateArg,
  type BulkUpdateResult,
  type Result,
  tagData,
} from "codeforlife/utils/api"
import { type Student, type User, urls } from "codeforlife/api"

import api from "."

export type CreateStudentsResult = BulkCreateResult<
  Student,
  "auto_gen_password",
  {
    user: Result<User, "password">
  }
>
export type CreateStudentsArg = BulkCreateArg<
  Student,
  "klass",
  never,
  {
    user: Arg<User, "first_name">
  }
>

export type ReleaseStudentsResult = BulkUpdateResult<Student>
export type ReleaseStudentsArg = BulkUpdateArg<
  Student,
  never,
  never,
  {
    user: Arg<User, "email", "first_name">
  }
>

export type TransferStudentsResult = BulkUpdateResult<Student>
export type TransferStudentsArg = BulkUpdateArg<
  Student,
  "klass",
  never,
  {
    user: Arg<User, never, "first_name">
  }
>

export type ResetStudentsPasswordResult = BulkUpdateResult<
  Student,
  "auto_gen_password",
  {
    user: Result<User, "password">
  }
>
export type ResetStudentsPasswordArg = BulkUpdateArg<
  Student,
  never,
  never,
  {
    user: Arg<User, never, "password">
  }
>

export type DestroyStudentsResult = BulkDestroyResult
export type DestroyStudentsArg = BulkDestroyArg<Student>

const studentApi = api.injectEndpoints({
  endpoints: build => ({
    createStudents: build.mutation<CreateStudentsResult, CreateStudentsArg>({
      query: body => ({
        url: urls.student.list + "bulk/",
        method: "POST",
        body,
      }),
    }),
    releaseStudents: build.mutation<ReleaseStudentsResult, ReleaseStudentsArg>({
      query: body => ({
        url: urls.student.list + "release/",
        method: "PUT",
        body,
      }),
      invalidatesTags: tagData("User", { id: "user" }),
    }),
    transferStudents: build.mutation<
      TransferStudentsResult,
      TransferStudentsArg
    >({
      query: body => ({
        url: urls.student.list + "transfer/",
        method: "PUT",
        body,
      }),
      invalidatesTags: tagData("User", { id: "user" }),
    }),
    resetStudentsPassword: build.mutation<
      ResetStudentsPasswordResult,
      ResetStudentsPasswordArg
    >({
      query: body => ({
        url: urls.student.list + "reset-password/",
        method: "PUT",
        body,
      }),
    }),
    destroyStudents: build.mutation<DestroyStudentsResult, DestroyStudentsArg>({
      query: body => ({
        url: urls.student.list + "bulk/",
        method: "DELETE",
        body,
      }),
      invalidatesTags: tagData("User", { id: "user" }),
    }),
  }),
})

export default studentApi
export const {
  useCreateStudentsMutation,
  useReleaseStudentsMutation,
  useTransferStudentsMutation,
  useResetStudentsPasswordMutation,
  useDestroyStudentsMutation,
} = studentApi
