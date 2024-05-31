import type { Teacher, User } from "codeforlife/lib/esm/api/models"
import {
  buildUrl,
  tagData,
  type Arg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  type UpdateArg,
  type UpdateResult,
} from "codeforlife/lib/esm/helpers/rtkQuery"

import api from "."

const listUrl = "users/teachers/"
const detailUrl = listUrl + "<id>/"

const teacherApi = api.injectEndpoints({
  endpoints: build => ({
    createTeacher: build.mutation<
      CreateResult<Teacher>,
      {
        user: Arg<User, "first_name" | "last_name" | "password" | "email"> & {
          add_to_newsletter: boolean
        }
      }
    >({
      query: body => ({
        url: listUrl,
        method: "POST",
        body,
      }),
    }),
    removeTeacherFromSchool: build.mutation<
      UpdateResult<Teacher, "user">,
      Teacher["id"]
    >({
      query: id => ({
        url: buildUrl(detailUrl, { url: { id } }),
        method: "PUT",
      }),
      invalidatesTags: tagData("User", "user"),
    }),
    setTeacherAdminAccess: build.mutation<
      UpdateResult<Teacher, "user">,
      UpdateArg<Teacher, "is_admin">
    >({
      query: ([id, body]) => ({
        url: buildUrl(detailUrl, { url: { id } }),
        method: "PUT",
        body,
      }),
      invalidatesTags: tagData("User", "user"),
    }),
    destroyTeacher: build.mutation<DestroyResult, DestroyArg<Teacher>>({
      query: id => ({
        url: buildUrl(detailUrl, { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData("User", "user"),
    }),
  }),
})

export default teacherApi
export const {
  useCreateTeacherMutation,
  useRemoveTeacherFromSchoolMutation,
  useSetTeacherAdminAccessMutation,
  useDestroyTeacherMutation,
} = teacherApi
