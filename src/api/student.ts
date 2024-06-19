import { urls, type Student, type User } from "codeforlife/api"
import {
  tagData,
  type Arg,
  type BulkCreateArg,
  type BulkCreateResult,
  type BulkDestroyArg,
  type BulkDestroyResult,
  type BulkUpdateArg,
  type BulkUpdateResult,
} from "codeforlife/utils/api"

import api from "."

const studentApi = api.injectEndpoints({
  endpoints: build => ({
    createStudents: build.mutation<
      BulkCreateResult<Student>,
      BulkCreateArg<
        Student,
        "klass",
        never,
        {
          user: Arg<User, "first_name">
        }
      >
    >({
      query: body => ({
        url: urls.student.list + "bulk/",
        method: "POST",
        body,
      }),
    }),
    releaseStudents: build.mutation<
      BulkUpdateResult<Student>,
      BulkUpdateArg<
        Student,
        never,
        never,
        {
          user: Arg<User, "email", "first_name">
        }
      >
    >({
      query: body => ({
        url: urls.student.list + "release/",
        method: "PUT",
        body,
      }),
      invalidatesTags: tagData("User", "user"),
    }),
    transferStudents: build.mutation<
      BulkUpdateResult<Student>,
      BulkUpdateArg<
        Student,
        "klass",
        never,
        {
          user: Arg<User, never, "first_name">
        }
      >
    >({
      query: body => ({
        url: urls.student.list + "transfer/",
        method: "PUT",
        body,
      }),
      invalidatesTags: tagData("User", "user"),
    }),
    resetStudentsPassword: build.mutation<
      BulkUpdateResult<Student>,
      BulkUpdateArg<
        Student,
        never,
        never,
        {
          user: Arg<User, never, "password">
        }
      >
    >({
      query: body => ({
        url: urls.student.list + "reset-password/",
        method: "PUT",
        body,
      }),
    }),
    destroyStudents: build.mutation<BulkDestroyResult, BulkDestroyArg<Student>>(
      {
        query: body => ({
          url: urls.student.list + "bulk/",
          method: "DELETE",
          body,
        }),
        invalidatesTags: tagData("User", "user"),
      },
    ),
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
