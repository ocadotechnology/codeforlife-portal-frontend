import {
  type Arg,
  type CreateArg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  type ListArg,
  type ListResult,
  type Model,
  type RetrieveArg,
  type RetrieveResult,
  type UpdateArg,
  type UpdateResult,
  buildUrl,
  tagData,
} from "codeforlife/utils/api"
import { type User } from "codeforlife/api"

import api from "."

export type SchoolTeacherInvitation = Model<
  number,
  {
    expires_at: Date
    invited_teacher_first_name: string
    invited_teacher_last_name: string
    invited_teacher_email: string
    invited_teacher_is_admin: boolean
  }
>

export type AcceptSchoolTeacherInvitationResult = null
export type AcceptSchoolTeacherInvitationArg = {
  id: SchoolTeacherInvitation["id"]
  user?: Arg<User, "first_name" | "last_name" | "password" | "email"> & {
    add_to_newsletter: boolean
  }
}

export type RejectSchoolTeacherInvitationResult = null
export type RejectSchoolTeacherInvitationArg = SchoolTeacherInvitation["id"]

export type RefreshSchoolTeacherInvitationResult = UpdateResult<
  SchoolTeacherInvitation,
  "expires_at"
>
export type RefreshSchoolTeacherInvitationArg =
  UpdateArg<SchoolTeacherInvitation>

export type CreateSchoolTeacherInvitationResult = CreateResult<
  SchoolTeacherInvitation,
  "expires_at"
>
export type CreateSchoolTeacherInvitationArg = CreateArg<
  SchoolTeacherInvitation,
  | "invited_teacher_email"
  | "invited_teacher_first_name"
  | "invited_teacher_last_name"
  | "invited_teacher_is_admin"
>

export type DestroySchoolTeacherInvitationResult = DestroyResult
export type DestroySchoolTeacherInvitationArg =
  DestroyArg<SchoolTeacherInvitation>

export type RetrieveSchoolTeacherInvitationResult = RetrieveResult<
  SchoolTeacherInvitation,
  | "expires_at"
  | "invited_teacher_email"
  | "invited_teacher_first_name"
  | "invited_teacher_last_name"
  | "invited_teacher_is_admin"
>
export type RetrieveSchoolTeacherInvitationArg =
  RetrieveArg<SchoolTeacherInvitation>

export type ListSchoolTeacherInvitationsResult = ListResult<
  SchoolTeacherInvitation,
  | "expires_at"
  | "invited_teacher_email"
  | "invited_teacher_first_name"
  | "invited_teacher_last_name"
  | "invited_teacher_is_admin"
>
export type ListSchoolTeacherInvitationsArg = ListArg

const listUrl = "schools/teacher-invitations/"
const detailUrl = listUrl + "<id>/"

const schoolTeacherInvitationApi = api.injectEndpoints({
  endpoints: build => ({
    acceptSchoolTeacherInvitation: build.mutation<
      AcceptSchoolTeacherInvitationResult,
      AcceptSchoolTeacherInvitationArg
    >({
      query: ({ id, ...body }) => ({
        url: buildUrl(detailUrl + "accept/", { url: { id } }),
        method: "DELETE",
        body,
      }),
      invalidatesTags: tagData("SchoolTeacherInvitation", {
        includeListTag: true,
      }),
    }),
    rejectSchoolTeacherInvitation: build.mutation<
      RejectSchoolTeacherInvitationResult,
      RejectSchoolTeacherInvitationArg
    >({
      query: id => ({
        url: buildUrl(detailUrl + "reject/", { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData("SchoolTeacherInvitation", {
        includeListTag: true,
      }),
    }),
    refreshSchoolTeacherInvitation: build.mutation<
      RefreshSchoolTeacherInvitationResult,
      RefreshSchoolTeacherInvitationArg
    >({
      query: id => ({
        url: buildUrl(detailUrl, { url: { id } }),
        method: "PUT",
      }),
      invalidatesTags: tagData("SchoolTeacherInvitation", {
        includeListTag: true,
      }),
    }),
    createSchoolTeacherInvitation: build.mutation<
      CreateSchoolTeacherInvitationResult,
      CreateSchoolTeacherInvitationArg
    >({
      query: body => ({
        url: listUrl,
        method: "POST",
        body,
      }),
      invalidatesTags: tagData("SchoolTeacherInvitation", {
        includeListTag: true,
      }),
    }),
    destroySchoolTeacherInvitation: build.mutation<
      DestroySchoolTeacherInvitationResult,
      DestroySchoolTeacherInvitationArg
    >({
      query: id => ({
        url: buildUrl(detailUrl, { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData("SchoolTeacherInvitation", {
        includeListTag: true,
      }),
    }),
    retrieveSchoolTeacherInvitation: build.query<
      RetrieveSchoolTeacherInvitationResult,
      RetrieveSchoolTeacherInvitationArg
    >({
      query: id => ({
        url: buildUrl(detailUrl, { url: { id } }),
        method: "GET",
      }),
      providesTags: tagData("SchoolTeacherInvitation"),
    }),
    listSchoolTeacherInvitations: build.query<
      ListSchoolTeacherInvitationsResult,
      ListSchoolTeacherInvitationsArg
    >({
      query: search => ({
        url: buildUrl(listUrl, { search }),
        method: "GET",
      }),
      providesTags: tagData("SchoolTeacherInvitation", {
        includeListTag: true,
      }),
    }),
  }),
})

export default schoolTeacherInvitationApi
export const {
  useAcceptSchoolTeacherInvitationMutation,
  useRejectSchoolTeacherInvitationMutation,
  useRefreshSchoolTeacherInvitationMutation,
  useCreateSchoolTeacherInvitationMutation,
  useDestroySchoolTeacherInvitationMutation,
  useRetrieveSchoolTeacherInvitationQuery,
  useLazyRetrieveSchoolTeacherInvitationQuery,
  useListSchoolTeacherInvitationsQuery,
  useLazyListSchoolTeacherInvitationsQuery,
} = schoolTeacherInvitationApi
