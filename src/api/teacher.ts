import {
  type Arg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  type UpdateArg,
  type UpdateResult,
  buildUrl,
  tagData,
} from "codeforlife/utils/api"
import { type Teacher, type User, urls } from "codeforlife/api"

import api from "."

export const TEACHER_ID = "user.id"

export type CreateTeacherResult = CreateResult<Teacher>
export type CreateTeacherArg = {
  user: Arg<User, "first_name" | "last_name" | "password" | "email"> & {
    add_to_newsletter: boolean
  }
}

export type RemoveTeacherFromSchoolResult = UpdateResult<Teacher, "user">
export type RemoveTeacherFromSchoolArg = UpdateArg<Teacher>

export type SetTeacherAdminAccessResult = UpdateResult<Teacher, "user">
export type SetTeacherAdminAccessArg = UpdateArg<Teacher, "is_admin">

export type DestroyTeacherResult = DestroyResult
export type DestroyTeacherArg = DestroyArg<Teacher>

const teacherApi = api.injectEndpoints({
  endpoints: build => ({
    createTeacher: build.mutation<CreateTeacherResult, CreateTeacherArg>({
      query: body => ({
        url: urls.teacher.list,
        method: "POST",
        body,
      }),
      invalidatesTags: tagData("User", {
        id: TEACHER_ID,
        includeListTag: true,
      }),
    }),
    removeTeacherFromSchool: build.mutation<
      RemoveTeacherFromSchoolResult,
      RemoveTeacherFromSchoolArg
    >({
      query: id => ({
        url: buildUrl(urls.teacher.detail + "remove-from-school/", {
          url: { id },
        }),
        method: "PUT",
      }),
      invalidatesTags: tagData("User", {
        id: TEACHER_ID,
        includeListTag: true,
      }),
    }),
    setTeacherAdminAccess: build.mutation<
      SetTeacherAdminAccessResult,
      SetTeacherAdminAccessArg
    >({
      query: ({ id, ...body }) => ({
        url: buildUrl(urls.teacher.detail + "set-admin-access/", {
          url: { id },
        }),
        method: "PUT",
        body,
      }),
      invalidatesTags: tagData("User", {
        id: TEACHER_ID,
        includeListTag: true,
      }),
    }),
    destroyTeacher: build.mutation<DestroyTeacherResult, DestroyTeacherArg>({
      query: id => ({
        url: buildUrl(urls.teacher.detail, { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData("User", {
        id: TEACHER_ID,
        includeListTag: true,
      }),
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
